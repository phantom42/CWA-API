import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contentTypeSchema = new Schema({
	content_type: {
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
	}
});

export const ContentTypeModel = mongoose.model('ContentType', contentTypeSchema);