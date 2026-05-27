'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, Twitter, Crown, Users, Palette } from 'lucide-react';

const memberIcons = [Crown, Users, Palette];

export function Team() {
  const t = useTranslations('team');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const members = t.raw('members') as Array<{
    name: string;
    role: string;
    bio: string;
    isFounder: boolean;
    socials: { github?: string; linkedin?: string; twitter?: string };
  }>;

  return (
    <section id="team" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-glow-blue pointer-events-none opacity-20" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass border border-blue-500/30 text-cyan-400 text-sm font-mono mb-4">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">{t('heading')} </span>
            <span className="gradient-text">{t('headingAccent')}</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">{t('description')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {members.map((member, i) => {
            const Icon = memberIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`glass glass-hover rounded-2xl p-8 text-center cursor-default relative overflow-hidden ${
                  member.isFounder ? 'border border-blue-500/30' : ''
                }`}
              >
                {member.isFounder && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
                )}

                {/* Avatar */}
                <div className={`relative mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                  member.isFounder
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 glow-blue'
                    : 'glass border border-white/10'
                }`}>
                  <Icon className={`w-8 h-8 ${member.isFounder ? 'text-white' : 'text-slate-400'}`} />
                </div>

                {member.isFounder && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
                    <Crown className="w-3 h-3" />
                    Founder
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-cyan-400 text-sm font-medium mb-4">{member.role}</div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{member.bio}</p>

                {Object.keys(member.socials).length > 0 && (
                  <div className="flex items-center justify-center gap-3">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:border-blue-500/40 hover:text-blue-400 text-slate-500 transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.linkedin && member.socials.linkedin !== '#' && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:border-blue-500/40 hover:text-blue-400 text-slate-500 transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.twitter && member.socials.twitter !== '#' && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:border-blue-500/40 hover:text-blue-400 text-slate-500 transition-all"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
