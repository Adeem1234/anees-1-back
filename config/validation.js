const Joi = require('joi');

// Checks the Survey title and description is valid and can be add
const SurveyValidation = (data) => {
	const schema = Joi.object({
		title: Joi.string().min(2).required(),
		description: Joi.string().min(2).required(),
		category: Joi.string().required(),
	});
	return schema.validate(data);
};

// check Survey Questions Validation
const QuestionValidation = (data) => {
	const schema = Joi.object({
		questionStatement: Joi.string().required(),
		option: Joi.array().items(Joi.string().required()),
	});
	return schema.validate(data);
};

const CategoryValidation = (data) => {
	const schema = Joi.object({ title: Joi.string().required() });
	return schema.validate(data);
};

const PlanValidation = (data) => {
	const schema = Joi.object({ title: Joi.string().required() });
	return schema.validate(data);
};

const SubPlanValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		plan: Joi.required(),
		description: Joi.string().required(),
	});
	return schema.validate(data);
};

const ProviderValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		contact: Joi.string().required(),
		intro: Joi.string().required(),
		subPlan: Joi.string().required(),
	});
	return schema.validate(data);
};

const TemplateValidaton = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		subPlan: Joi.string().required(),
	});
	return schema.validate(data);
};

const FormValidation = (data) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		category: Joi.string().required(),
		plan: Joi.required(),
		subPlan: Joi.required(),
		provider: Joi.required(),
		template: Joi.required(),
	});
	return schema.validate(data);
};

module.exports.CategoryValidation = CategoryValidation;
module.exports.PlanValidation = PlanValidation;
module.exports.ProviderValidation = ProviderValidation;
module.exports.QuestionValidation = QuestionValidation;
module.exports.SubPlanValidation = SubPlanValidation;
module.exports.SurveyValidation = SurveyValidation;
module.exports.TemplateValidaton = TemplateValidaton;
module.exports.FormValidation = FormValidation;
