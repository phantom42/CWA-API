import "dotenv/config.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import rootRouter from "./routes/root.js";
import contentTypesRouter from "./routes/api/contentTypes.js";
import connectDB from './config/dbConn.js'

const app = express();
app.use(express.json());

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

// Routes
app.use("/", rootRouter);
app.use("/contentTypes", contentTypesRouter);

app.listen(PORT, () => {
  console.log(`running api app on port ${PORT}`);
});
connectDB();