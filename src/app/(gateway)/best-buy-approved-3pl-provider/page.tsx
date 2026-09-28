import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

// TODO(content): final page title, description and body
export const metadata: Metadata = {
  title: "Best Buy Approved 3PL Provider",
  description: "Channel Partners is an approved 3PL provider for Best Buy U.S. and Canada.",
};

export default function BestBuyCredentialPage() {
  return (
    <StubPage
      title="Best Buy Approved 3PL Provider"
      description="Retail credential page — placeholder for this pass."
    />
  );
}
