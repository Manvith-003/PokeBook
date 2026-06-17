import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: string;
  className?: string;
  suffix?: string;
}

const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705848",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export function TypeBadge({ type, className, suffix }: TypeBadgeProps) {
  const bgColor = TYPE_COLORS[type.toLowerCase()] || "#71717a";
  
  return (
    <span
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm inline-flex items-center gap-1",
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {type}
      {suffix && <span className="opacity-80 bg-black/20 px-1.5 py-0.5 rounded-md text-[10px] leading-none">{suffix}</span>}
    </span>
  );
}
