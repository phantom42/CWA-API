const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: false
	},
	signup_date: {
		type: Date,
		required: true
	},

});

userSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('ContentType', userSchema);