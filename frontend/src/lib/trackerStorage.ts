export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  contractType: string;
  remoteType: string;
  publishedAt: string;
  description: string;
};

export type TrackedJob = Job & {
  trackedAt: string;
  status: string;
};

const STORAGE_KEY = "offerroute-tracker";

export const TRACKER_STATUSES = [
  "Repéré",
  "Candidature envoyée",
  "Contact 1",
  "Réponse positive",
  "Réponse négative",
  "Relance",
];

export function getTrackedJobs(): TrackedJob[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as TrackedJob[];
  } catch {
    return [];
  }
}

export function saveTrackedJobs(jobs: TrackedJob[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function addTrackedJob(job: Job): { success: boolean; message: string } {
  const current = getTrackedJobs();

  const alreadyExists = current.some((item) => item.id === job.id);
  if (alreadyExists) {
    return { success: false, message: "Cette offre est déjà dans le suivi." };
  }

  const newTrackedJob: TrackedJob = {
    ...job,
    trackedAt: new Date().toISOString(),
    status: "Repéré",
  };

  saveTrackedJobs([newTrackedJob, ...current]);

  return { success: true, message: "Offre ajoutée au suivi." };
}

export function updateTrackedJobStatus(jobId: number, status: string) {
  const current = getTrackedJobs();

  const updated = current.map((item) =>
    item.id === jobId ? { ...item, status } : item
  );

  saveTrackedJobs(updated);
}

export function removeTrackedJob(jobId: number) {
  const current = getTrackedJobs();
  const updated = current.filter((item) => item.id !== jobId);
  saveTrackedJobs(updated);
}

export function clearTrackedJobs() {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportTrackedJobsToJson() {
  const jobs = getTrackedJobs();
  const blob = new Blob([JSON.stringify(jobs, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "offerroute-tracker.json";
  link.click();
  URL.revokeObjectURL(url);
}

export function importTrackedJobsFromJson(content: string): {
  success: boolean;
  message: string;
} {
  try {
    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed)) {
      return {
        success: false,
        message: "Le fichier importé n'a pas un format valide.",
      };
    }

    saveTrackedJobs(parsed as TrackedJob[]);

    return {
      success: true,
      message: "Suivi importé avec succès.",
    };
  } catch {
    return {
      success: false,
      message: "Impossible de lire ce fichier JSON.",
    };
  }
}