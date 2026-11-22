import { SiteHeader } from "@/components/layout/SiteHeader";

export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
