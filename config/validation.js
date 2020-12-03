const Joi = require('joi');


const CategoryValidation = (data) => {
	const schema = Joi.object({ title: Joi.string().required() });
	return schema.validate(data);
};



module.exports.CategoryValidation = CategoryValidation;
