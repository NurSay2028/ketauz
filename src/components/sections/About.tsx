'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Gem } from 'lucide-react';

export function About() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    { icon: Brain, title: t('value1Title'), desc: t('value1Desc') },
    { icon: Code2, title: t('value2Title'), desc: t('value2Desc') },
    { icon: Gem, title: t('value3Title'), desc: t('value3Desc') },
  ];

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="absolute inset-0 bg-glow-blue pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={item} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full glass border border-blue-500/30 text-cyan-400 text-sm font-mono mb-4">
              {t('badge')}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-white">{t('heading')} </span>
              <span className="gradient-text">{t('headingAccent')}</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Text */}
            <motion.div variants={item} className="space-y-6">
              <p className="text-slate-400 text-lg leading-relaxed">{t('description1')}</p>
              <p className="text-slate-400 text-lg leading-relaxed">{t('description2')}</p>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">{t('description3')}</p>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold gradient-text font-mono">{s.value}</div>
                    <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Values grid */}
            <motion.div variants={item} className="space-y-4">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  className="glass glass-hover rounded-xl p-6 flex gap-4 cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <v.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{v.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
