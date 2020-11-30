// const express = require('express');
// const router = express.Router();
const Router = require('express-promise-router')();
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');
const Admin = require('../controller/admin');
const User = require('../controller/userslist')


const dashboard = require('../controller/dashboard');
const Category = require('../controller/Category');
const SubCategory = require('../controller/subCategory');



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



// Show SubCategory
Router.route('/sub-category').get(ensureAuthenticated, SubCategory.get);
// Add SubCategory
Router.route('/sub-category-add').get(ensureAuthenticated, SubCategory.show).post(ensureAuthenticated, SubCategory.add);
// Edit The SubCategory
Router.route('/sub-category-edit/:id').get(ensureAuthenticated, SubCategory.edit).post(ensureAuthenticated, SubCategory.update);
// Delete a SubCategory
Router.route('/sub-category-delete/:id').get(ensureAuthenticated, SubCategory.delete);


module.exports = Router;
