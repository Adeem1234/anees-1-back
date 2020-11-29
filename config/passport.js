const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');
// Load User Model
const Admin = require('../model/User');
const passport = require('passport');
const admin = require('../controller/admin');
// Start a Session and asign aa session id

module.exports = (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			// Match User
			Admin.findOne({ email: email, role: true }).then((admin) => {
				if (!admin) {
					return done(null, false, { message: 'That email is not Registered' });
				}
				// Match password
				bcrypt.compare(password, admin.password, (err, isMatch) => {
					if (err) {
						throw err;
					}
					if (isMatch) {
						return done(null, admin);
					} else {
						return done(null, false, { message: 'Password is incorrect' });
					}
				});
			});
		})
	);
	// Start a Session and asign aa session id
	passport.serializeUser((admin, done) => {
		done(null, admin.id);
	});
	// End the session
	passport.deserializeUser((id, done) => {
		Admin.findById(id, (err, user) => {
			done(err, admin);
		});
	});
};
