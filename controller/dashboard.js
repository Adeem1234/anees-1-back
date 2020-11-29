const User = require('../model/User');
const Survey = require('../model/Survey');
const PerformedSurvey = require('../model/performedSurvey');

module.exports = {
	index: async (req, res, next) => {
		const users = await User.find({});
		const userCount = await User.countDocuments({});
		const performedSurvey = await PerformedSurvey.find({}).populate('surveyId');
		const performedSurveyCount = await PerformedSurvey.countDocuments({});
		const surveys = await Survey.countDocuments({});
		res.render('dashboard', { users, userCount, performedSurvey, performedSurveyCount, surveys });
	},
	users: async (req, res, next) => {
		const { id } = req.params;
		const performedSurvey = await PerformedSurvey.findById(id).populate({
			path: 'performed',
			populate: { path: 'user' },
		});
		const performed = performedSurvey.performed;
		res.render('userSurveys', { performed, id });
	},
	surveys: async (req, res, next) => {
		const { id, pid } = req.params;
		const performedSurvey = await PerformedSurvey.findById(id).populate({
			path: 'performed',
			populate: {
				path: 'questions',
				populate: { path: 'surveyQuestion', model: 'surveyQuestion' },
			},
		});
		const performed = performedSurvey.performed.id(pid);
		const questions = performed.questions;
		res.render('surveyResult', { questions, performed });
	},
};
