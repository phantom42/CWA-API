import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get(['/', '/index', '/index.html'], (req, res) => {
  const filePath = path.join(__dirname, '..', 'views', 'index.html');
  res.sendFile(filePath);
});

export default router;
