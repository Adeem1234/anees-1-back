const Category = require('../model/categories');
const { CategoryValidation } = require('../config/validation');

module.exports = {
	showCategory: async (req, res, next) => {
		let category = await Category.find({});
		res.render('category', { category });
	},
	category: async (req, res, next) => {
		res.render('categoryAdd');
	},
	addCategory: async (req, res, next) => {
		const { title } = req.body;
		const { error } = CategoryValidation({ title });
		if (error) {
			const errorResult = error.details;
			return res.status(422).json(errorResult);
		}
		const categoryexits = await Category.findOne({ title: title });
		if (categoryexits) return res.status(421).send('Category already Exists');
		const saveCategory = new Category({
			title: title,
		});
		try {
			await saveCategory.save();
			let category = await Category.find({});
			res.render('category', { category });
		} catch (err) {
			res.status(421).json('err' + err);
		}
	},
	edit: async (req, res, next) => {
		const CatEdit = await Category.findById(req.params.id);
		res.render('categoryEdit', { CatEdit });
	},
	delete: async (req, res, next) => {
		try {
			await Category.findByIdAndRemove(req.params.id, async (err) => {
				if (err) return handleError(err);
				res.redirect('/admin/category');
			});
		} catch (error) {
			return res.status(422).json('Category not Deleted or invalid Category Id');
		}
	},
	update: async (req, res, next) => {
		const { id } = req.params;
		const { title } = req.body;
		const { error } = CategoryValidation({ title });
		if (error) {
			const errorResult = error.details;
			return res.status(422).json(errorResult);
		}
		const updateCategory = await Category.findByIdAndUpdate(id, { title: title });
		await updateCategory.save();
		res.redirect('/admin/category');
	},
};
