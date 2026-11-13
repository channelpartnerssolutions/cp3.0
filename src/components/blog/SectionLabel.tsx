/** "Latest post" / "All Posts" label with the full-width rule under it. */
export function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="border-b border-black pb-2.5 pl-1 text-2xl font-bold leading-[30px] text-black">
      {children}
    </h2>
  );
}
