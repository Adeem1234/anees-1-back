const User = require('../model/User');

module.exports = {
	users: (req, res, next) => {
		User.find({}).exec(function (err, users) {
			if (err) return next(err);
			res.render('UserList', { users: users });
		});
	},

	updateUserRole: async (req, res, next) => {
		let user = await User.findById(req.params.id);
		if (!user) {
			return next();
		} else {
			await User.updateOne({ _id: req.params.id }, { role: !user.role });
			res.redirect('/admin/users');
		}
	},
};
