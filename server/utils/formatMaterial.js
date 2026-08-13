// Used for GET /api/materials (the list). Deliberately excludes
// extractedText — it can be large and the list view never needs it.
export function toPublicMaterial(material) {
  return {
    id: material._id,
    originalName: material.originalName,
    fileType: material.fileType,
    fileSize: material.fileSize,
    status: material.status,
    uploadedAt: material.uploadedAt,
    processedAt: material.processedAt || null,
  };
}

// Used for GET /api/materials/:id — the one place the full extracted
// text is returned, and only ever to the owning user.
export function toMaterialDetail(material) {
  return {
    ...toPublicMaterial(material),
    extractedText: material.extractedText || null,
    processingError: material.processingError || null,
  };
}
