import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const bgColor = `bg-type-${type.toLowerCase()}`;
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider",
        // Fallback color if the custom property is missing
        "bg-slate-500", 
        // We use inline style for background to reliably map to our CSS variables
        className
      )}
      style={{ backgroundColor: `var(--type-${type.toLowerCase()})` }}
    >
      {type}
    </span>
  );
}
