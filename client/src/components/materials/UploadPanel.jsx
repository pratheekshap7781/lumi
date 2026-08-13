import { useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { materialsApi } from "../../utils/api";
import { formatFileSize } from "../../utils/formatFileSize";
import LumiOrb from "../LumiOrb";

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB — must match the backend limit

function validateFile(file) {
  const isPdfType = file.type === "application/pdf";
  const isPdfExtension = file.name.toLowerCase().endsWith(".pdf");
  if (!isPdfType || !isPdfExtension) {
    return "Please upload a PDF file.";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "Your file is too large. Please upload a PDF smaller than 20 MB.";
  }
  return null;
}

// `onUploaded` is called with the new material after a successful
// upload, so the parent page can refresh its list without a full
// page reload.
export default function UploadPanel({ onUploaded }) {
  const [status, setStatus] = useState("idle"); // idle | selected | uploading | success | error
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedMaterial, setUploadedMaterial] = useState(null);
  const inputRef = useRef(null);

  function handleFileChosen(chosenFile) {
    if (!chosenFile) return;
    const validationError = validateFile(chosenFile);
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }
    setFile(chosenFile);
    setStatus("selected");
  }

  function handleInputChange(e) {
    handleFileChosen(e.target.files[0]);
    e.target.value = ""; // allow re-selecting the same file later
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    handleFileChosen(e.dataTransfer.files[0]);
  }

  function resetToIdle() {
    setFile(null);
    setErrorMessage("");
    setUploadedMaterial(null);
    setStatus("idle");
  }

  async function handleUpload() {
    setStatus("uploading");
    try {
      const { material } = await materialsApi.upload(file);
      setUploadedMaterial(material);
      setStatus("success");
      onUploaded?.(material);
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  }

  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleInputChange}
      />

      {status === "idle" && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className="rounded-xl border border-dashed p-10 flex flex-col items-center text-center gap-3 cursor-pointer transition-colors duration-150"
          style={{
            borderColor: isDragging ? "var(--color-accent)" : "var(--color-border)",
            backgroundColor: isDragging ? "var(--color-accent-soft)" : "transparent",
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <UploadCloud size={22} style={{ color: "var(--color-accent-strong)" }} />
          </div>
          <p className="font-medium">Upload Study Material</p>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Click to choose a file, or drag and drop
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            PDF only, up to 20 MB
          </p>
        </div>
      )}

      {(status === "selected" || status === "uploading") && file && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#E5484D1a" }}
            >
              <FileText size={20} style={{ color: "#E5484D" }} />
            </div>
            <div className="min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          {status === "uploading" ? (
            <div className="flex items-center gap-3">
              <LumiOrb size={32} sparkles={false} />
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                <Loader2 size={14} className="animate-spin" />
                Uploading your material — hang tight...
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={resetToIdle}
                className="rounded-lg px-4 py-2 text-sm font-medium border"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
              >
                Change file
              </button>
              <button
                onClick={handleUpload}
                className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center text-center gap-3 py-4">
          {uploadedMaterial?.status === "failed" ? (
            <>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#E5484D22" }}
              >
                <AlertCircle size={24} style={{ color: "#E5484D" }} />
              </div>
              <p className="font-medium">We couldn't process this material.</p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                The file uploaded, but Lumi couldn't read it. Please try a different PDF.
              </p>
            </>
          ) : (
            <>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4CAF7D22" }}
              >
                <CheckCircle2 size={24} style={{ color: "#4CAF7D" }} />
              </div>
              <p className="font-medium">Your material has been uploaded.</p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                {uploadedMaterial?.status === "ready"
                  ? "Your material is ready for Lumi."
                  : "Ready for Lumi to process."}
              </p>
            </>
          )}
          <button
            onClick={resetToIdle}
            className="mt-1 rounded-lg px-4 py-2 text-sm font-medium border"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            Upload another file
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#E5484D22" }}
          >
            <AlertCircle size={24} style={{ color: "#E5484D" }} />
          </div>
          <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
          <button
            onClick={resetToIdle}
            className="mt-1 rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
