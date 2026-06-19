import { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Guides & Articles',
  description: 'Original guides, tips, and articles about Pokémon mechanics, battles, and lore.',
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 flex items-center gap-4 text-[var(--foreground)]">
          <BookOpen className="w-10 h-10 text-primary" />
          Trainer Guides
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Master the art of Pokémon battling, learn about game mechanics, and discover the best strategies with our original, in-depth articles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <Link href={`/guides/${guide.id}`} key={guide.id} className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Category Banner */}
            <div className={cn(
              "h-3 w-full",
              guide.category === "Beginner" ? "bg-green-500" :
              guide.category === "Competitive" ? "bg-red-500" :
              guide.category === "Lore" ? "bg-purple-500" : "bg-blue-500"
            )} />
            
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className={cn(
                  "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full",
                  guide.category === "Beginner" ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" :
                  guide.category === "Competitive" ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" :
                  guide.category === "Lore" ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400" : 
                  "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                )}>
                  {guide.category}
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {guide.readTime}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-[var(--foreground)] group-hover:text-primary transition-colors line-clamp-2">
                {guide.title}
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1 line-clamp-3">
                {guide.excerpt}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center font-bold text-primary group-hover:gap-2 transition-all">
                Read Article <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
