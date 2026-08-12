import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // The filename the student uploaded — safe to show them, but never
    // used as a real filesystem path (see storedName).
    originalName: {
      type: String,
      required: true,
    },
    // The randomly-generated name the file is actually saved under on
    // disk. Never sent to the frontend — see utils/formatMaterial.js.
    storedName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    // "uploaded" is the only status this stage produces. The rest exist
    // now so later stages (text extraction, AI processing) have
    // somewhere to go without a schema change.
    status: {
      type: String,
      enum: ["uploaded", "processing", "ready", "failed"],
      default: "uploaded",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

export default StudyMaterial;
