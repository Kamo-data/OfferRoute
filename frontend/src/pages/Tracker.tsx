import { useEffect, useRef, useState } from "react";
import {
  clearTrackedJobs,
  exportTrackedJobsToJson,
  getTrackedJobs,
  importTrackedJobsFromJson,
  removeTrackedJob,
  TRACKER_STATUSES,
  updateTrackedJobStatus,
} from "../lib/trackerStorage";
import type { TrackedJob } from "../lib/trackerStorage";

export default function Tracker() {
  const [trackedJobs, setTrackedJobs] = useState<TrackedJob[]>([]);
  const [feedback, setFeedback] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function refreshTrackedJobs() {
    setTrackedJobs(getTrackedJobs());
  }

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => {
      setFeedback("");
    }, 2500);
  }

  useEffect(() => {
    refreshTrackedJobs();
  }, []);

  function handleStatusChange(jobId: number, status: string) {
    updateTrackedJobStatus(jobId, status);
    refreshTrackedJobs();
    showFeedback("Statut mis à jour.");
  }

  function handleRemove(jobId: number) {
    removeTrackedJob(jobId);
    refreshTrackedJobs();
    showFeedback("Offre supprimée du suivi.");
  }

  function handleClearAll() {
    const confirmed = window.confirm(
      "Veux-tu vraiment vider tout le suivi ?"
    );

    if (!confirmed) return;

    clearTrackedJobs();
    refreshTrackedJobs();
    showFeedback("Suivi vidé.");
  }

  function handleExport() {
    exportTrackedJobsToJson();
    showFeedback("Export JSON lancé.");
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  async function handleImportFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const content = await file.text();
    const result = importTrackedJobsFromJson(content);

    refreshTrackedJobs();
    showFeedback(result.message);

    event.target.value = "";
  }

  return (
    <div>
      <h1>Suivi</h1>
      <p>Retrouve ici les offres que tu as ajoutées à ton suivi.</p>

      {feedback && (
        <div
          style={{
            marginTop: "16px",
            marginBottom: "16px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: "#1e293b",
            border: "1px solid #334155",
          }}
        >
          {feedback}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "18px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={handleExport}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Exporter le suivi
        </button>

        <button
          onClick={handleImportClick}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            background: "#0f766e",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Importer un JSON
        </button>

        <button
          onClick={handleClearAll}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            background: "#b91c1c",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Vider le suivi
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImportFile}
          style={{ display: "none" }}
        />
      </div>

      {trackedJobs.length === 0 ? (
        <div
          style={{
            marginTop: "20px",
            border: "1px dashed #475569",
            borderRadius: "12px",
            padding: "16px",
            opacity: 0.85,
          }}
        >
          Aucune offre suivie pour le moment.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
          {trackedJobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: "1px solid #334155",
                borderRadius: "12px",
                padding: "16px",
                background: "#111827",
              }}
            >
              <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "1.2rem" }}>
                {job.title}
              </h2>

              <p style={{ margin: "4px 0" }}>
                <strong>Entreprise :</strong> {job.company}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Lieu :</strong> {job.location}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Contrat :</strong> {job.contractType}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>Ajoutée le :</strong>{" "}
                {new Date(job.trackedAt).toLocaleDateString("fr-FR")}
              </p>

              <div style={{ marginTop: "14px", marginBottom: "14px" }}>
                <label style={{ display: "block", marginBottom: 6 }}>Statut</label>
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #475569",
                    background: "#0f172a",
                    color: "white",
                  }}
                >
                  {TRACKER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleRemove(job.id)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#b91c1c",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Supprimer du suivi
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}