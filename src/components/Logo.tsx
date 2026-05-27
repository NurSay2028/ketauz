'use client';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'auto' | 'mono';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, variant = 'auto', size = 'md' }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentLocale = (routing.locales.find((l) =>
    pathname.startsWith(`/${l}`)
  ) || routing.defaultLocale) as Locale;

  const homeHref =
    currentLocale === routing.defaultLocale ? '/' : `/${currentLocale}`;

  const sizeClass = { sm: 'h-7', md: 'h-9', lg: 'h-12' }[size];

  const logoSrc =
    variant === 'mono'
      ? '/logo/logo-mono.svg'
      : mounted && resolvedTheme === 'light'
        ? '/logo/logo-light.svg'
        : '/logo/logo-full.svg';

  return (
    <a href={homeHref} className={cn('inline-flex items-center', className)}>
      <img
        src={logoSrc}
        alt="KETA.COMP"
        className={cn(sizeClass, 'w-auto')}
      />
    </a>
  );
}
