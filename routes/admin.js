// const express = require('express');
// const router = express.Router();
const Router = require('express-promise-router')();
const { forwardAuthenticated , ensureAuthenticated} = require('../config/auth');
const Admin = require('./admin');


const dashboard = require('../controller/dashboard');
const User = require('../controller/userslist');
const Survey = require('../controller/Survey');
const SurveyQuestion = require('../controller/SurveyQuestion');
const Subscription = require('../controller/Subscription');
const Category = require('../controller/Category');
const Form = require('../controller/form');
const Plan = require('../controller/plan');
const SubPlan = require('../controller/subPlan');
const Provider = require('../controller/provider');
const Template = require('../controller/Templates');

//Login Page Route
Router.route('/login').get(forwardAuthenticated, Admin.getLogin).post(Admin.postLogin);
//register Handle
Router.route('/register').get(forwardAuthenticated, Admin.getRegister).post(forwardAuthenticated, Admin.postRegister);
// Logout
Router.route('/logout').get(Admin.Logout);

// Home Page Dashboard Page
Router.route('/').get(ensureAuthenticated, dashboard.index);
// Dashboard
Router.route('/dashboard').get(ensureAuthenticated, dashboard.index);
// Users List who have performed Specific Surveys
Router.route('/dashboard/user_surveys/:id').get(ensureAuthenticated, dashboard.users);
//Show the Results of Selected User
Router.route('/dashboard/survey_results/:id/:pid').get(ensureAuthenticated, dashboard.surveys);

// List of users (clients) registered
Router.route('/users/').get(ensureAuthenticated, User.users);
// Update user from admin to user and vise versa
Router.route('/role/update/:id').get(ensureAuthenticated, User.updateUserRole);

// Show Category Survey Categories
Router.route('/category').get(ensureAuthenticated, Category.showCategory);
// Add Category Survey Categories
Router.route('/category-add').get(ensureAuthenticated, Category.category).post(ensureAuthenticated, Category.addCategory);
// Edit The Category
Router.route('/category-edit/:id').get(ensureAuthenticated, Category.edit).post(ensureAuthenticated, Category.update);
// Delete a Category
Router.route('/category-delete/:id').get(ensureAuthenticated, Category.delete);

// Show Business Plan
Router.route('/plan').get(ensureAuthenticated, Plan.get);
// Add Business Plan
Router.route('/plan-add').get(ensureAuthenticated, Plan.show).post(ensureAuthenticated, Plan.add);
// Edit Business Plan
Router.route('/plan-edit/:id').get(ensureAuthenticated, Plan.edit).post(ensureAuthenticated, Plan.update);
// Delete Business Plan
Router.route('/plan-delete/:id').get(ensureAuthenticated, Plan.delete);

// Show SubPlan
Router.route('/subplan').get(ensureAuthenticated, SubPlan.get);
// Add SubPlan
Router.route('/subplan-add').get(ensureAuthenticated, SubPlan.show).post(ensureAuthenticated, SubPlan.add);
// Edit The SubPlan
Router.route('/subplan-edit/:id').get(ensureAuthenticated, SubPlan.edit).post(ensureAuthenticated, SubPlan.update);
// Delete a SubPlan
Router.route('/subplan-delete/:id').get(ensureAuthenticated, SubPlan.delete);

// Show Provider
Router.route('/provider').get(ensureAuthenticated, Provider.get);
// Add Provider
Router.route('/provider-add').get(ensureAuthenticated, Provider.show).post(ensureAuthenticated, Provider.add);
// Edit The Provider
Router.route('/provider-edit/:id').get(ensureAuthenticated, Provider.edit).post(ensureAuthenticated, Provider.update);
// Delete a Provider
Router.route('/provider-delete/:id').get(ensureAuthenticated, Provider.delete);

// Show Template
Router.route('/template').get(ensureAuthenticated, Template.get);
// Add Template
Router.route('/template-add').get(ensureAuthenticated, Template.show).post(ensureAuthenticated, Template.add);
// Edit The Template
Router.route('/template-edit/:id').get(ensureAuthenticated, Template.edit).post(ensureAuthenticated, Template.update);
// Delete a Template
Router.route('/template-delete/:id').get(ensureAuthenticated, Template.delete);

// Show Form
Router.route('/form').get(ensureAuthenticated, Form.get);
// Show Form Details
Router.route('/form/details/:id').get(ensureAuthenticated, Form.details);
// Add Form
Router.route('/form-add').get(ensureAuthenticated, Form.show).post(ensureAuthenticated, Form.add);
// Get the Subplans of the plans Selected
Router.route('/form/get-subplan').post(ensureAuthenticated, Form.subPlan);
// Get the Details of Subplan selected
Router.route('/form/get-subplan-details').post(ensureAuthenticated, Form.subPlanDetail);
// Delete a Form
Router.route('/form-delete/:id').get(ensureAuthenticated, Form.delete);

Router.route('/assign-form/:cat_id').get(ensureAuthenticated, Form.assignForm);
Router.route('/assign-form/delete/:id').get(ensureAuthenticated, Form.deleteAssigned);
Router.route('/assign-form').get(ensureAuthenticated, Form.assignedForm).post(ensureAuthenticated, Form.userAssign);

// Show and Add Surveys
Router.route('/survey').get(ensureAuthenticated, Survey.showSurvey);
Router.route('/survey-add').get(ensureAuthenticated, Survey.survey).post(ensureAuthenticated, Survey.addSurvey);
// Edit, Update an Survey using the Survey id
Router.route('/survey/:id').get(ensureAuthenticated, Survey.editSurvey).post(ensureAuthenticated, Survey.updateSurvey);
// Delete an Survey
Router.route('/survey/delete/:id').get(ensureAuthenticated, Survey.deleteSurvey);

// Diaplay and Add Question of Asslessmeny
Router.route('/survey/add/questions/:id').get(ensureAuthenticated, SurveyQuestion.question).post(ensureAuthenticated, SurveyQuestion.addQuestion);
// Delet
Router.route('/survey/delete/question/:id').get(ensureAuthenticated, SurveyQuestion.deleteQuestion);

Router.route('/subscription-plans').get(ensureAuthenticated, Subscription.getSubscriptionPlan);

Router.route('/subscription-plans-add').get(ensureAuthenticated, Subscription.subscriptionPlan).post(ensureAuthenticated, Subscription.addSubscriptionPlan);

Router.route('/subscription-plans-update/:id').get(ensureAuthenticated, Subscription.editSubscriptionPlan)
    .post(ensureAuthenticated, Subscription.updateSubscriptionPlan);

Router.route('/subscription-plans-delete/:id').get(ensureAuthenticated, Subscription.deleteSubscriptionPlan);
module.exports = Router;
