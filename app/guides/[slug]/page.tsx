import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideById, getAllGuides } from '@/lib/guides';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideById(slug);
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: 'article',
    }
  };
}

export function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.id,
  }));
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideById(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href="/guides" 
        className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white dark:bg-slate-900 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 text-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Guides
      </Link>

      <article className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className={cn(
          "h-4 w-full",
          guide.category === "Beginner" ? "bg-green-500" :
          guide.category === "Competitive" ? "bg-red-500" :
          guide.category === "Lore" ? "bg-purple-500" : "bg-blue-500"
        )} />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 mb-6">
              <span className={cn(
                "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full",
                guide.category === "Beginner" ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" :
                guide.category === "Competitive" ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" :
                guide.category === "Lore" ? "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400" : 
                "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
              )}>
                {guide.category}
              </span>
              <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {guide.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-[var(--foreground)] tracking-tight mb-6">
              {guide.title}
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-serif italic" style={{ fontFamily: "var(--font-lora), serif" }}>
              {guide.excerpt}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800
            prose-p:leading-relaxed prose-p:mb-6
            prose-li:my-2
            prose-strong:text-primary prose-strong:font-bold"
          >
            <ReactMarkdown>{guide.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Footer CTA */}
      <div className="mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center">
        <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" /> Keep Learning
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
          Explore our complete Pokédex to put your new knowledge into practice!
        </p>
        <Link 
          href="/pokemon" 
          className="inline-block px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
        >
          Browse Pokédex
        </Link>
      </div>
    </div>
  );
}
