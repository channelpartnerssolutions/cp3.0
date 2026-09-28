"use client";

import { useId } from "react";
import { CloseButton } from "@/components/ui/CloseButton";
import { useDialog } from "@/components/ui/useDialog";
import { StartProjectForm } from "./StartProjectForm";

export function StartProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useDialog<HTMLDivElement>(open, onClose);
  const headingId = useId();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121e23]/80 p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className="relative max-h-[90vh] w-full max-w-[912px] overflow-y-auto rounded-lg border border-light-grey bg-[#fafafa] p-8 outline-none md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} className="absolute right-3 top-3" />
        <h2 id={headingId} className="header-3 pr-10 text-black">
          start your project today
        </h2>
        <div className="mt-8">
          <StartProjectForm />
        </div>
      </div>
    </div>
  );
}
