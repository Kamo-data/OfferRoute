import { useMemo, useState } from "react";
import jobsData from "../data/jobs.json";
import { addTrackedJob } from "../lib/trackerStorage";
import type { Job } from "../lib/trackerStorage";

export default function Search() {
  const jobs = jobsData as Job[];

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [contractType, setContractType] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keywordMatch =
        keyword.trim() === "" ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(keyword.toLowerCase());

      const locationMatch =
        location.trim() === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const contractMatch =
        contractType === "" || job.contractType === contractType;

      return keywordMatch && locationMatch && contractMatch;
    });
  }, [jobs, keyword, location, contractType]);

  function handleAddToTracker(job: Job) {
    const result = addTrackedJob(job);
    setFeedback(result.message);

    window.setTimeout(() => {
      setFeedback("");
    }, 2500);
  }

  return (
    <div>
      <h1>Recherche</h1>
      <p>Filtre les offres de démonstration ci-dessous.</p>

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
          display: "grid",
          gap: "12px",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          marginTop: "20px",
          marginBottom: "24px",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Mot-clé</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Ex: data engineer, SQL, BI..."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #475569",
              background: "#0f172a",
              color: "white",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Localisation</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Angers, Paris..."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #475569",
              background: "#0f172a",
              color: "white",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6 }}>Type de contrat</label>
          <select
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #475569",
              background: "#0f172a",
              color: "white",
            }}
          >
            <option value="">Tous</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Freelance">Freelance</option>
            <option value="Intérim">Intérim</option>
          </select>
        </div>
      </div>

      <p style={{ marginBottom: "20px" }}>
        <strong>{filteredJobs.length}</strong> offre(s) trouvée(s)
      </p>

      <div style={{ display: "grid", gap: "16px" }}>
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "16px",
              background: "#111827",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "1.25rem" }}>
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
              <strong>Mode :</strong> {job.remoteType}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Date :</strong> {job.publishedAt}
            </p>

            <p style={{ marginTop: "12px", opacity: 0.9 }}>{job.description}</p>

            <button
              onClick={() => handleAddToTracker(job)}
              style={{
                marginTop: "14px",
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                background: "#2563eb",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Ajouter au suivi
            </button>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div
            style={{
              border: "1px dashed #475569",
              borderRadius: "12px",
              padding: "16px",
              opacity: 0.85,
            }}
          >
            Aucune offre ne correspond aux filtres.
          </div>
        )}
      </div>
    </div>
  );
}