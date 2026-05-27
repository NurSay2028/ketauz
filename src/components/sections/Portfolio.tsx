'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  Live: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Beta: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Pilot: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Private Beta': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

export function Portfolio() {
  const t = useTranslations('portfolio');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = t.raw('items') as Array<{
    name: string;
    category: string;
    description: string;
    impact: string;
    tech: string[];
    status: string;
  }>;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="absolute inset-0 bg-glow-cyan pointer-events-none opacity-20" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-cyan-500/30 text-cyan-400 text-sm font-mono mb-4">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-white">{t('heading')} </span>
            <span className="gradient-text">{t('headingAccent')}</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg">{t('description')}</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((project, i) => (
            <motion.div
              key={i}
              variants={card}
              className="glass glass-hover rounded-2xl p-6 group relative overflow-hidden cursor-default"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs text-slate-500 font-mono">{project.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{project.name}</h3>
                </div>
                <span className={cn('text-xs px-2.5 py-1 rounded-full border font-medium', statusColors[project.status] || statusColors.Live)}>
                  {project.status}
                </span>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

              <div className="flex items-center gap-2 mb-4 text-emerald-400 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{project.impact}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex items-center gap-1 text-sm text-cyan-400">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t('viewProject')}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
