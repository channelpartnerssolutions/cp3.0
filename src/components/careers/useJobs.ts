"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/lib/jobs";

// One shared request per page load, so the stats strip and the job map don't
// each hit /api/jobs. A failed request is cleared so the next caller retries.
let jobsPromise: Promise<Job[]> | null = null;

function loadJobs(): Promise<Job[]> {
  jobsPromise ??= fetch("/api/jobs")
    .then((res) => res.json())
    .then((data) => (data.jobs ?? []) as Job[])
    .catch(() => {
      jobsPromise = null;
      return [];
    });
  return jobsPromise;
}

// Returns null until the feed has loaded.
export function useJobs(): Job[] | null {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    let active = true;
    loadJobs().then((loaded) => {
      if (active) setJobs(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  return jobs;
}
