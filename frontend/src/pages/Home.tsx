import { useEffect, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("Vérification...");

  useEffect(() => {
    fetch("/api/health")
      .then((r) => (r.ok ? "API OK ✅" : "API KO ❌"))
      .then(setStatus)
      .catch(() => setStatus("API KO ❌"));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>OfferRoute</h1>
      <p>Statut backend : <strong>{status}</strong></p>
      <p style={{ opacity: 0.85 }}>
        Objectif : recherche automatique + suivi candidatures + relances.
      </p>
    </div>
  );
}