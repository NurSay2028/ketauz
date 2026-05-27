'use client';

import { useTranslations } from 'next-intl';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  const links = {
    company: [
      { label: t('links.about'), href: '#about' },
      { label: t('links.services'), href: '#services' },
      { label: t('links.portfolio'), href: '#portfolio' },
      { label: t('links.team'), href: '#team' },
      { label: t('links.contact'), href: '#contact' },
    ],
    legal: [
      { label: t('links.privacy'), href: '#' },
      { label: t('links.terms'), href: '#' },
    ],
  };

  const socials = [
    { icon: Github, href: 'https://github.com/MiyrasKh', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <img src="/logo/logo-mono.svg" alt="KETA.COMP" className="h-12 w-auto" />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">{t('description')}</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass hover:border-blue-500/40 hover:text-blue-400 text-slate-600 transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-slate-600 text-xs mt-3">{t('founded')}</p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('links.company')}</h4>
            <ul className="space-y-2">
              {links.company.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('links.legal')}</h4>
            <ul className="space-y-2">
              {links.legal.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('links.social')}</h4>
            <a
              href="mailto:keta.comp.dev@gmail.com"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              keta.comp.dev@gmail.com
            </a>
            <p className="text-slate-500 text-sm mt-2">Tashkent, Uzbekistan</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">{t('copyright')}</p>
          <p className="text-slate-600 text-sm font-mono">{t('madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
