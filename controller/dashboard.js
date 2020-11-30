const User = require('../model/User');

module.exports = {
	index: async (req, res, next) => {
		res.render('dashboard',
		);
	},
	users: async (req, res, next) => {
		const { id } = req.params;
		res.render('userSurveys');
	},
	surveys: async (req, res, next) => {
		const { id, pid } = req.params;
		res.render('surveyResult',
		);
	},
};
