import { NextResponse } from "next/server";
import { getJobs } from "@/lib/jobs-feed";

// The careers page loads jobs on the server itself; this endpoint serves the
// same data as JSON for anything else that needs it.
export const revalidate = 1800; // matches JOBS_REVALIDATE_SECONDS

export async function GET() {
  return NextResponse.json(await getJobs());
}
