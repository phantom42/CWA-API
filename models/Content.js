const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const contentSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	active: {
		type: Boolean,
		required: false
	},
	release_year: {
		type: Number,
		required: false
	},
	content_type: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		required: false
	},
	submitter: {
		type: String,
		required: false
	},
	submit_date: {
		type: Date,
		required: false
	}
});

contentSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('Content', contentSchema);