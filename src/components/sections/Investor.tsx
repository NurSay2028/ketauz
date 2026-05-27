'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Eye, Globe, ArrowRight } from 'lucide-react';

const pointIcons = [Globe, TrendingUp, Users, Eye];

export function Investor() {
  const t = useTranslations('investor');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const points = [
    { key: 'market', title: t('market'), desc: t('marketDesc') },
    { key: 'traction', title: t('traction'), desc: t('tractionDesc') },
    { key: 'team', title: t('team2'), desc: t('teamDesc') },
    { key: 'vision', title: t('vision'), desc: t('visionDesc') },
  ];

  const stats = t.raw('stats') as Array<{ value: string; label: string }>;

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-blue-500/30 text-cyan-400 text-sm font-mono mb-4">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-white">{t('heading')} </span>
            <span className="gradient-text">{t('headingAccent')}</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text font-mono">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Points grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {points.map((point, i) => {
            const Icon = pointIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="glass glass-hover rounded-xl p-6 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{point.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-slate-400 mb-6">{t('ctaDesc')}</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200"
          >
            {t('cta')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
