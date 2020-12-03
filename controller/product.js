const Product = require('../model/products');

const path = require('path');

module.exports = {
    get: async (req, res, next) => {
        const products = await Product.find({}).populate('subPlan');
        res.render('product', { products });
    },
    show: async (req, res, next) => {
        let products = await Product.find({}).populate('subPlan');
        res.render('templateAdd', { products });
    },
    add: async (req, res, next) => {
        const { name, subPlan } = req.body;
        const file = req.files.file;
        const fileName = 'file-' + Date.now() + path.extname(file.name).toLowerCase();
        const { error } = TemplateValidaton({
            name,
            subPlan,
        });
        if (error) {
            const errorResult = error.details;
            return res.status(422).json(errorResult);
        }
        const templateExits = await Product.findOne({
            name: name,
            subPlan: subPlan,
        });
        if (templateExits !== null) return res.status(421).send('Product already Exists');
        const newFile = {
            name: fileName,
            path: `${process.env.SERVER_ADDRESS}/templateFiles/${fileName}`,
        };
        const saveTemplate = new Product({
            name: name,
            subPlan: subPlan,
            file: newFile,
        });
        try {
            await saveTemplate.save();
            const checkTemplate = await Product.findOne({
                name: name,
                subPlan: subPlan,

            });
            const id = checkTemplate._id;
            const updateSubPlan = await SubPlan.findByIdAndUpdate(subPlan, { $push: { product: id } });
            await updateSubPlan.save();
            file.mv(`${__dirname}../../public/templateImages/${fileName}`, (err) => {
                if (err) console.error(err);
            });
            res.redirect('/admin/products')
        } catch (error) {
            res.status(421).json('err' + err);
        }
    },
    edit: async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        res.render('TemplateEdit', { product });
    },
    update: async (req, res, next) => {
        const { id } = req.params;
        const { name, subPlan } = req.body;
        const { error } = TemplateValidaton({ name, subPlan });
        if (error) {
            const errorResult = error.details;
            return res.status(422).json(errorResult);
        }
        const updateTemplete = await Product.findByIdAndUpdate(id, { name: name, subPlan: subPlan });
        await updateTemplete.save();
        res.redirect('/admin/products');
    },
    delete: async (req, res, next) => {
        try {
            await Product.findByIdAndRemove(req.params.id, async (err) => {
                if (err) return handleError(err);
                res.redirect('/admin/products');
            });
        } catch (error) {
            return res.status(422).json('Product not Deleted or invalid Product Id');
        }
    },
};
