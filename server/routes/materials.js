import { Router } from "express";
import fs from "fs";
import path from "path";
import { requireAuth } from "../middleware/auth.js";
import { upload, UPLOAD_DIR } from "../middleware/upload.js";
import StudyMaterial from "../models/StudyMaterial.js";
import { toPublicMaterial, toMaterialDetail } from "../utils/formatMaterial.js";
import { processMaterial } from "../services/materialProcessing.js";

const router = Router();

// Wraps multer so its errors (wrong file type, file too large) become
// the same friendly JSON shape as the rest of the API, instead of
// multer's default error page.
function handleUpload(req, res, next) {
  upload.single("file")(req, res, (err) => {
    if (!err) return next();

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "Your file is too large. Please upload a PDF smaller than 20 MB." });
    }
    if (err.message === "INVALID_FILE_TYPE") {
      return res.status(400).json({ error: "Please upload a PDF file." });
    }

    console.error("Upload error:", err.message);
    return res.status(400).json({ error: "Something went wrong. Please try again." });
  });
}

// POST /api/materials
router.post("/", requireAuth, handleUpload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please choose a PDF file to upload." });
    }

    const material = await StudyMaterial.create({
      userId: req.user._id,
      originalName: req.file.originalname,
      storedName: req.file.filename,
      fileType: "pdf",
      fileSize: req.file.size,
      status: "uploaded",
    });

    // Processing runs synchronously here — fine at this scale (PDFs
    // capped at 20MB). processMaterial() takes the material and does
    // its own save()s, so swapping this for a background job later
    // just means calling it from a worker instead of inline.
    await processMaterial(material);

    return res.status(201).json({ material: toPublicMaterial(material) });
  } catch (error) {
    console.error("Create material error:", error.message);
    // Clean up the file we just saved to disk if the database write failed,
    // so we don't end up with an orphaned file with no matching record.
    if (req.file) {
      fs.unlink(path.join(UPLOAD_DIR, req.file.filename), () => {});
    }
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/materials — only the current user's own materials
router.get("/", requireAuth, async (req, res) => {
  try {
    const materials = await StudyMaterial.find({ userId: req.user._id }).sort({ uploadedAt: -1 });
    return res.status(200).json({ materials: materials.map(toPublicMaterial) });
  } catch (error) {
    console.error("List materials error:", error.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/materials/:id — full detail (including extracted text) for the owner only
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material || material.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: "Study material not found." });
    }

    return res.status(200).json({ material: toMaterialDetail(material) });
  } catch (error) {
    console.error("Get material error:", error.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// DELETE /api/materials/:id — only the owner can delete their own material
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);

    if (!material || material.userId.toString() !== req.user._id.toString()) {
      // Same response whether the material doesn't exist or belongs to
      // someone else — don't reveal which.
      return res.status(404).json({ error: "Study material not found." });
    }

    // Removes the whole document in one go — extractedText,
    // processedAt, and processingError all go with it, so there's no
    // separate cleanup step needed to avoid orphaned processed data.
    await material.deleteOne();

    // If the file is already missing on disk, that's fine — the DB
    // record is still gone, which is what matters to the user.
    fs.unlink(path.join(UPLOAD_DIR, material.storedName), (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("File delete error:", err.message);
      }
    });

    return res.status(200).json({ message: "Study material deleted." });
  } catch (error) {
    console.error("Delete material error:", error.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
