import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

// TODO(content): final page title, description and body
export const metadata: Metadata = {
  title: "Target Preferred Merchandising Partner",
  description: "Channel Partners is a preferred merchandising partner for Target.",
};

export default function TargetCredentialPage() {
  return (
    <StubPage
      title="Target Preferred Merchandising Partner"
      description="Retail credential page — placeholder for this pass."
    />
  );
}
