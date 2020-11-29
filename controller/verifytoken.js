const jwt = require('jsonwebtoken');

module.exports = {
	auth: (req, res, next) => {
		const token = req.header('auth-token');
		if (!token) {
			res.status(401).json('Access Denied Login Required');
		}
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	},
};
