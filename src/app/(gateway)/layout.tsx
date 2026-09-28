import { GatewayHeader } from "@/components/layout/GatewayHeader";

export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GatewayHeader />
      {children}
    </>
  );
}
