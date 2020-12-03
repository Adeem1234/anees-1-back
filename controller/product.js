const Template = require('../model/Templates');
const SubPlan = require('../model/subPlan');
const Plan = require('../model/Plan');

const path = require('path');

module.exports = {
    get: async (req, res, next) => {
        const templates = await Template.find({}).populate('subPlan');
        res.render('template', { templates });
    },
    show: async (req, res, next) => {
        let plans = await Plan.find({}).populate('subPlan');
        res.render('templateAdd', { plans });
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
        const templateExits = await Template.findOne({
            name: name,
            subPlan: subPlan,
        });
        if (templateExits !== null) return res.status(421).send('Template already Exists');
        const newFile = {
            name: fileName,
            path: `${process.env.SERVER_ADDRESS}/templateFiles/${fileName}`,
        };
        const saveTemplate = new Template({
            name: name,
            subPlan: subPlan,
            file: newFile,
        });
        try {
            await saveTemplate.save();
            const checkTemplate = await Template.findOne({
                name: name,
                subPlan: subPlan,

            });
            const id = checkTemplate._id;
            const updateSubPlan = await SubPlan.findByIdAndUpdate(subPlan, { $push: { template: id } });
            await updateSubPlan.save();
            file.mv(`${__dirname}../../public/templateImages/${fileName}`, (err) => {
                if (err) console.error(err);
            });
            res.redirect('/admin/template');
        } catch (err) {
            res.status(421).json('err' + err);
        }
    },
    edit: async (req, res, next) => {
        const template = await Template.findById(req.params.id);
        res.render('TemplateEdit', { template });
    },
    update: async (req, res, next) => {
        const { id } = req.params;
        const { name, subPlan } = req.body;
        const { error } = TemplateValidaton({ name, subPlan });
        if (error) {
            const errorResult = error.details;
            return res.status(422).json(errorResult);
        }
        const updateTemplete = await Template.findByIdAndUpdate(id, { name: name, subPlan: subPlan });
        await updateTemplete.save();
        res.redirect('/admin/template');
    },
    delete: async (req, res, next) => {
        try {
            await Template.findByIdAndRemove(req.params.id, async (err) => {
                if (err) return handleError(err);
                res.redirect('/admin/template');
            });
        } catch (error) {
            return res.status(422).json('Template not Deleted or invalid Template Id');
        }
    },
};
