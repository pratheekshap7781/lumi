import fs from "fs";
import path from "path";
import crypto from "crypto";
import multer from "multer";

// __dirname isn't available in ES modules, so build the uploads path
// from this file's own location instead.
const UPLOAD_DIR = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "uploads");

// Make sure the folder exists before multer tries to write into it —
// matters on a fresh clone where only uploads/.gitkeep is checked in.
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  // Never trust the uploaded filename as a path — generate a random
  // name instead. This also prevents path traversal and filename
  // collisions between users.
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString("hex");
    cb(null, `${randomName}.pdf`);
  },
});

function fileFilter(req, file, cb) {
  const isPdfMimeType = file.mimetype === "application/pdf";
  const isPdfExtension = path.extname(file.originalname).toLowerCase() === ".pdf";

  if (!isPdfMimeType || !isPdfExtension) {
    // Caught in routes/materials.js and turned into a friendly message —
    // never trust the client to have already validated this.
    return cb(new Error("INVALID_FILE_TYPE"));
  }

  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
});

export { UPLOAD_DIR, MAX_FILE_SIZE_BYTES };
