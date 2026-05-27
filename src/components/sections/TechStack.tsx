'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const techRow1 = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Python', 'FastAPI',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Cloudflare',
];
const techRow2 = [
  'Flutter', 'Dart', 'OpenAI', 'LangChain', 'TensorFlow', 'n8n',
  'Kafka', 'MongoDB', 'Stripe', 'Firebase', 'Vercel', 'GraphQL',
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-6 py-3 glass border border-white/10 rounded-xl text-sm font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-default whitespace-nowrap"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  const t = useTranslations('techStack');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-blue-500/30 text-cyan-400 text-sm font-mono mb-4">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">{t('heading')} </span>
            <span className="gradient-text">{t('headingAccent')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <MarqueeRow items={techRow1} />
          <MarqueeRow items={techRow2} reverse />
        </motion.div>
      </div>
    </section>
  );
}
