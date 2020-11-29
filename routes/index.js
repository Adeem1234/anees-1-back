const Router = require('express-promise-router')();
const { ensureAuthenticated } = require('../config/auth');
const Admin = require('../controller/admin');

Router.route('/welcome').get(Admin.welcome);
Router.route('/').get(ensureAuthenticated, Admin.welcome);

module.exports = Router;
