interface StatBarProps {
  label: string;
  value: number;
  max?: number;
}

export function StatBar({ label, value, max = 255 }: StatBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Color code based on stat value
  let color = "bg-red-500";
  if (value >= 150) color = "bg-cyan-500";
  else if (value >= 110) color = "bg-green-500";
  else if (value >= 90) color = "bg-lime-500";
  else if (value >= 60) color = "bg-yellow-500";
  else if (value >= 30) color = "bg-orange-500";

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-16 font-semibold text-slate-500 dark:text-slate-400 capitalize">
        {label}
      </span>
      <span className="w-8 font-mono text-right">{value}</span>
      <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
