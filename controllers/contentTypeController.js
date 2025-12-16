import { ContentTypeModel } from "../models/ContentType.js";
import mongoose from "mongoose";

export async function contentTypeExists(contentType) {
	try {
		const existingTypes = await ContentTypeModel.find({
			content_type: contentType
		})
		if (!existingTypes || existingTypes.length===0) {
			return false;
		} else {
			return true;
		}
	} catch (err) {
		return res.status(500).json({message: err.message});
	}
}

export async function getAllContentTypes(req, res) {
	try {
		const allTypes = await ContentTypeModel.find({});
		if (!allTypes || allTypes.length ===0) {
			return res.status(204).json({message: 'no data returned'})
		} 
		res.status(200).json(allTypes);
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({message: err.message});
	}
	//res.json([]); // <-- example response
  }

export async function addContentType(req, res) {
	try {
		
		const providedKey = req.headers['x-api-key'] || req.query.apiKey
		if (providedKey !== process.env.CWA_API_KEY) {
			return res.status(401).json({message: 'unauthorized'});
		}
		if (!req?.query?.content_type) {
			return res.status(401).json({message: 'content type required'});
		}
		if (!req?.query?.description) {
			return res.status(401).json({message: 'description required'});
		}
		let isActive;
		if (req.query?.isActive !== undefined) {
			isActive = req.query.isActive === 'true';
		} else {
			isActive = true ;
		}
		const dupeCheck = await contentTypeExists(req.query.content_type);
		if (dupeCheck) {
			return res.status(409).json({message: 'content type already exists'});
		}
		const newContentType = await ContentTypeModel.create({
			content_type: req.query.content_type,
			description: req.query.description,
			active: isActive
		});
		return res.status(201).json({message: 'create success'});
	} catch (err){
		res.status(500).json({message: err.message});
	}
}

export async function updateContentType(req, res) {
	if (!req?.query?.id) {
		return res.status(409).json({message: 'missing id'});
	}
	const id = req.query.id;
	if (!mongoose.Types.ObjectId.isValid(id)){
		return res.status(409).json({message: 'invalid id'})
	}
	const existingRecord = await ContentTypeModel.findById(id);
	if (!existingRecord) {
		return res.status(409).json({message: 'id not found'});
	}
	const update = {};
	if (req?.query?.content_type?.length){
		update.content_type = req.query.content_type;
	}
	if (req?.query?.description?.length){
		update.description = req.query.description;
	}
	if (req?.query?.active?.length){
		update.active = req.query.active;
	}
	const updated = await ContentTypeModel.findByIdAndUpdate(id, update);
	
	return res.status(updated?200:409).json(updated?updated:false);
}

export async function setActive(id, isActive) {
	const update = {active: isActive}
	const updated = await ContentTypeModel.findByIdAndUpdate(id, update);
	return res.status(updated?200:409).json(updated?updated:false);
}