const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	role: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	subscriptionId: {
		type: String,
		default: '',
	},
	forms: [{
		type: Schema.Types.ObjectId,
		ref: 'form'
	}],
});
module.exports = mongoose.model('user', userSchema);
