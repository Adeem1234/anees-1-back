const jwt = require('jsonwebtoken');
const User = require('../model/User');

module.exports = {
	ensureAuthenticated: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash('error_msg', 'Please log in to view that resource');
		res.redirect('/welcome');
	},
	forwardAuthenticated: (req, res, next) => {
		if (!req.isAuthenticated()) {
			return next();
		}
		res.redirect('/admin/dashboard');
	},
	ClientAuthentication: async (req, res, next) => {
		const token = req.headers.token;
		const user = jwt.verify(token, process.env.TOKEN_SECRET);
		try {
			const getuser = await User.findById(user._id);
			if (getuser) {
				return next();
			}
		} catch (err) {
			res.status(403).send(err);
			return null;
		}
	},
};
