import type { Metadata } from "next";
import { RetailerPage } from "@/components/retailers/RetailerPage";
import { getRetailerPage } from "@/lib/retailers";

// Keeps the old site's /best-buy URL so search results and Best Buy portal
// links still land here.
const content = getRetailerPage("best-buy")!;

export const metadata: Metadata = content.meta;

export default function BestBuyPage() {
  return <RetailerPage content={content} />;
}
