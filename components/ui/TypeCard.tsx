"use client";

import { TYPE_COLORS, TypeBadge } from "@/components/ui/TypeBadge";
import Link from "next/link";

interface TypeCardProps {
  type: string;
  delay?: number;
}

export function TypeCard({ type }: TypeCardProps) {
  const typeKey = type.toLowerCase();
  const color = TYPE_COLORS[typeKey] || "#71717a";

  return (
    <Link href={`/types/${typeKey}`} className="block">
      <div
        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col items-center justify-center p-4 gap-3 aspect-[3/2]"
      >
        <div 
          className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-200 opacity-80 group-hover:opacity-100"
          style={{ backgroundColor: color }}
        />
        <TypeBadge type={type} className="shadow-sm transition-transform duration-200 group-hover:scale-105" />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 capitalize">
          {type} Type
        </span>
      </div>
    </Link>
  );
}
