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