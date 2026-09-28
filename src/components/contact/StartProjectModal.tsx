"use client";

import { useEffect } from "react";
import { StartProjectForm } from "./StartProjectForm";

export function StartProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#121e23]/80 p-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[912px] overflow-y-auto rounded-lg border border-light-grey bg-[#fafafa] p-8 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="header-3 text-black">start your project today</h2>
        <div className="mt-8">
          <StartProjectForm />
        </div>
      </div>
    </div>
  );
}
