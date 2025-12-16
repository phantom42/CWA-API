import express from "express";
import { getAllContentTypes, addContentType, updateContentType } from "../../controllers/contentTypeController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllContentTypes)
  .post(addContentType)
  .put(updateContentType);

export default router;
