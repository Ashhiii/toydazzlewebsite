import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.static("public")); // serve static files

// Ensure the upload folder exists
const uploadDir = "public/images/new-products";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  const imagePath = `/images/new-products/${req.file.filename}`;
  res.json({ imageURL: imagePath });
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
