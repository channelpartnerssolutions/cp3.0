import type { Metadata } from "next";
import { RetailerPage } from "@/components/retailers/RetailerPage";
import { getRetailerPage } from "@/lib/retailers";

const content = getRetailerPage("target")!;

export const metadata: Metadata = content.meta;

export default function TargetPage() {
  return <RetailerPage content={content} />;
}
