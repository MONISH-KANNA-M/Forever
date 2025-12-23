import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadsDir = "uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error("Only image files (jpeg, jpg, png, webp) are allowed!"),
      false
    );
  }
};

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 4, // Maximum 4 files
  },
});

// Clean up uploaded files after processing
const cleanupUploads = (files) => {
  if (!files) return;

  const fileArray = Array.isArray(files) ? files : Object.values(files).flat();

  fileArray.forEach((file) => {
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
      console.log(`🗑️ Cleaned up: ${file.path}`);
    }
  });
};

export { upload, cleanupUploads };
