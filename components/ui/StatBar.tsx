interface StatBarProps {
  label: string;
  value: number;
  max?: number;
}

export function StatBar({ label, value, max = 255 }: StatBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Color code based on exact stat name
  const statColors: Record<string, string> = {
    hp: "bg-[#FF5959]",
    attack: "bg-[#F5AC78]",
    defense: "bg-[#FAE078]",
    "sp. attack": "bg-[#9DB7F5]",
    "sp. defense": "bg-[#A7DB8D]",
    speed: "bg-[#FA92B2]",
  };

  const color = statColors[label.toLowerCase()] || "bg-slate-500";

  return (
    <div className="flex items-center gap-4 text-sm w-full">
      <span className="w-20 font-bold text-slate-500 dark:text-slate-400 capitalize text-[11px] tracking-widest">
        {label}
      </span>
      <span className="w-8 font-black text-right text-slate-700 dark:text-slate-200">{value}</span>
      <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
