export default function TechBadge({ tech }: { tech: string }) {
  return (
    <span className="px-2.5 py-1 text-xs font-body rounded-full border border-(--border) text-(--text-sub)">
      {tech}
    </span>
  );
}
