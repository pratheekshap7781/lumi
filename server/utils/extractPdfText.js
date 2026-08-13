import fs from "fs/promises";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

// A PDF this short is almost certainly a scanned image with no real
// text layer, or extraction genuinely failed to find anything useful.
const MIN_MEANINGFUL_CHARACTERS = 20;

function normalizeExtractedText(rawText) {
  return rawText
    .replace(/[ \t]+/g, " ") // collapse runs of spaces/tabs
    .replace(/\n{3,}/g, "\n\n") // cap blank lines at one, to mark paragraph breaks
    .trim();
}

export function hasMeaningfulText(text) {
  const stripped = text.replace(/---\s*Page\s*\d+\s*---/g, "").replace(/\s+/g, "");
  return stripped.length >= MIN_MEANINGFUL_CHARACTERS;
}

// Reads a PDF from disk and returns its normalized, page-marked text.
// Throws if the file can't be read or parsed at all — the caller is
// responsible for turning that into a safe "processing failed" state.
export async function extractTextFromPdf(filePath) {
  const buffer = await fs.readFile(filePath);
  const loadingTask = getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: true,
    isEvalSupported: false,
  });

  const doc = await loadingTask.promise;
  const pageTexts = [];

  try {
    for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
      const page = await doc.getPage(pageNumber);
      const textContent = await page.getTextContent();

      // Group text items into lines by Y-position — items sharing a
      // transform Y coordinate are on the same line.
      let lastY;
      let pageText = "";
      for (const item of textContent.items) {
        if (!("str" in item)) continue; // skip marked-content markers
        if (lastY === item.transform[5] || lastY === undefined) {
          pageText += item.str;
        } else {
          pageText += "\n" + item.str;
        }
        lastY = item.transform[5];
      }

      pageTexts.push(`--- Page ${pageNumber} ---\n${pageText}`);
      page.cleanup();
    }
  } finally {
    await loadingTask.destroy();
  }

  return normalizeExtractedText(pageTexts.join("\n\n"));
}
