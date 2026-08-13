import path from "path";
import { UPLOAD_DIR } from "../middleware/upload.js";
import { extractTextFromPdf, hasMeaningfulText } from "../utils/extractPdfText.js";

const NO_TEXT_ERROR = "Could not extract readable text from this PDF.";
const GENERIC_ERROR = "Something went wrong while processing this file.";

// Runs text extraction for one material and saves the outcome.
//
// Called synchronously right after upload for now — acceptable at
// college-project scale with the 20MB file cap. Takes just a material
// id and does its own DB reads/writes, so moving this behind a queue
// later (e.g. a worker that calls processMaterial(materialId)) won't
// require changing its signature or the route that calls it.
export async function processMaterial(material) {
  material.status = "processing";
  await material.save();

  try {
    const filePath = path.join(UPLOAD_DIR, material.storedName);
    const text = await extractTextFromPdf(filePath);

    if (!hasMeaningfulText(text)) {
      material.status = "failed";
      material.processingError = NO_TEXT_ERROR;
      material.extractedText = undefined;
      material.processedAt = undefined;
      await material.save();
      return material;
    }

    material.extractedText = text;
    material.processedAt = new Date();
    material.processingError = undefined;
    material.status = "ready";
    await material.save();
    return material;
  } catch (error) {
    console.error("PDF processing error:", error.message);
    material.status = "failed";
    material.processingError = GENERIC_ERROR;
    material.extractedText = undefined;
    material.processedAt = undefined;
    await material.save();
    return material;
  }
}
