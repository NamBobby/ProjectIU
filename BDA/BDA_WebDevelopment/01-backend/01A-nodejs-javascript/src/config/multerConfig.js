const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath = "";  
    if (file.fieldname === "avatar") {
      folderPath = "./src/uploads/avatars/";
    } else {
      return cb(new Error("Unknown fieldname"), false);
    }

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath); 
  
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

  // Check if it's a valid image file
  if (["avatar", "thumbnail", "albumThumbnail", "playlistThumbnail"].includes(file.fieldname) && !allowedImageTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect image file type");
    error.status = 400;
    return cb(error, false);
  }

  cb(null, true);
};

// Middleware for handling file upload with file size restrictions
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 6 * 1024 * 1024, // 6MB max for music file
  },
}).fields([
  { name: "avatar", maxCount: 1 },
]);

// Custom middleware for additional size checking for specific files 
const checkThumbnailSize = (req, res, next) => {
  if (req.files) {
    if (req.files.avatar && req.files.avatar[0].size > 5 * 1024 * 1024) {
      return next(new Error("Avatar file size exceeds 5MB limit"));
    }
  }
  next();
};

module.exports = { upload, checkThumbnailSize };
