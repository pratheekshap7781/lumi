import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import UploadPanel from "../components/materials/UploadPanel";
import MaterialsList from "../components/materials/MaterialsList";
import { materialsApi } from "../utils/api";

export default function StudyMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    materialsApi
      .list()
      .then((data) => setMaterials(data.materials))
      .catch(() => setMaterials([]))
      .finally(() => setLoading(false));
  }, []);

  function handleUploaded(newMaterial) {
    setMaterials((prev) => [newMaterial, ...prev]);
  }

  async function handleDelete(material) {
    const confirmed = window.confirm(`Delete "${material.originalName}"? This can't be undone.`);
    if (!confirmed) return;

    try {
      await materialsApi.remove(material.id);
      setMaterials((prev) => prev.filter((m) => m.id !== material.id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-semibold">Study Materials</h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            Upload a PDF and Lumi will use it to build your learning journey.
          </p>
        </div>

        <UploadPanel onUploaded={handleUploaded} />

        <section>
          <h2 className="font-semibold mb-3">Your Study Materials</h2>
          {loading ? (
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Loading...
            </p>
          ) : (
            <MaterialsList materials={materials} onDelete={handleDelete} />
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
