const Category = require('../model/categories');
const SubCategory = require('../model/subCategories');

module.exports = {
	get: async (req, res, next) => {
		const subCategory = await SubCategory.find({}).populate('category');
		res.render('subCategory', { subCategory });
	},
	show: async (req, res, next) => {
		let category = await Category.find({});
		res.render('subCategoryAdd', { category });
	},
	add: async (req, res, next) => {
		const { name, category } = req.body;
		// Check Validation
		const { error } = SubCategoryValidation({ name, category });
		if (error) {
			const errorResult = error.details;
			return res.status(422).json(errorResult);
		}
		// Category Exits
		const subCategoryexits = await SubCategory.findOne({ name: name, category: category });
		if (subCategoryexits) return res.status(421).send('Category already Exists');
		// save Category
		const saveSubCategory = new SubCategory({
			name: name,
			category: category,
		});
		//Save Data
		try {
			await saveSubCategory.save();
			const savedSubCategory = await SubCategory.findOne({ name: name, category: category});
			const subCategoryId = savedSubCategory._id;
			const updateCategory = await Category.findByIdAndUpdate(category, { $push: { subCategory: subCategoryId } });
			await updateCategory.save();
			res.redirect('/admin/sub-category');
		} catch (err) {
			res.status(421).json('err' + err);
		}
	},
	edit: async (req, res, next) => {
		const { id } = req.params;
		const subCategory = await SubCategory.findById(id).populate('category');
		let category = await Category.find({});
		res.render('subCategoryEdit', { subCategory, category });
	},
	update: async (req, res, next) => {
		const { id } = req.params;
		const { name, category } = req.body;
		// Check Validation
		const { error } = SubCategoryValidation({ name, category });
		if (error) {
			const errorResult = error.details;
			return res.status(422).json(error);
		}
		const categoryId = await Category.findOne({ name: category });
		// save Category
		const updateSubCategory = new SubCategory.findOneAndUpdate(id, { name: name, category: categoryId._id });
		//Save Data
		try {
			await updateSubCategory.save();
			res.redirect('/admin/sub-category');
		} catch (err) {
			res.status(421).json('err' + err);
		}
	},
	delete: async (req, res, next) => {
		const { id } = req.params;
		const subCategory = await SubCategory.findById(id);
		const categoryId = subCategory.category;
		try {
			await Category.findByIdAndUpdate(categoryId, { $pull: { subCategory: id } });
			await SubCategory.findByIdAndRemove(id);
			res.redirect('/admin/sub-category');
		} catch (err) {
			res.status(421).json('err' + err);
		}
	},
};
