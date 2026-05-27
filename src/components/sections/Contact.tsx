'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Contact() {
  const t = useTranslations('contact');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = cn(
    'w-full px-4 py-3 rounded-xl glass border border-white/10 bg-transparent text-white placeholder:text-slate-600',
    'focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200',
    'text-sm'
  );

  const contactInfo = [
    { icon: Mail, label: t('info.emailLabel'), value: t('info.email') },
    { icon: MapPin, label: t('info.locationLabel'), value: t('info.location') },
    { icon: Clock, label: t('info.responseLabel'), value: t('info.response') },
  ];

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="absolute inset-0 bg-glow-cyan pointer-events-none opacity-20" />
      <div className="max-w-7xl mx-auto">
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
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">{t('description')}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form — wider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">{t('form.name')}</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={t('form.namePlaceholder')}
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">{t('form.email')}</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={t('form.emailPlaceholder')}
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">{t('form.subject')}</label>
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder={t('form.subjectPlaceholder')}
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">{t('form.message')}</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder={t('form.messagePlaceholder')}
                    value={form.message}
                    onChange={handleChange}
                    className={cn(inputClass, 'resize-none')}
                  />
                </div>

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    {t('form.success')}
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {t('form.error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? t('form.sending') : t('form.submit')}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info, i) => (
              <div key={i} className="glass glass-hover rounded-xl p-5 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                  <info.icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-slate-500 text-xs mb-0.5">{info.label}</div>
                  <div className="text-white font-medium text-sm">{info.value}</div>
                </div>
              </div>
            ))}

            {/* Decoration */}
            <div className="glass rounded-2xl p-6 mt-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-500/10" />
              <div className="relative z-10">
                <div className="text-2xl font-bold gradient-text font-mono mb-2">Let&apos;s Build</div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ready to transform your vision into reality? Our team is just one message away.
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400">Available for new projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
