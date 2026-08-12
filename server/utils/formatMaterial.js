export function toPublicMaterial(material) {
  return {
    id: material._id,
    originalName: material.originalName,
    fileType: material.fileType,
    fileSize: material.fileSize,
    status: material.status,
    uploadedAt: material.uploadedAt,
  };
}
