import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { IntroAnimation } from '@/components/ui/IntroAnimation';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://keta-comp.pages.dev'
  ),
  title: 'KETA.COMP — Engineering Digital Ecosystems',
  description:
    'KETA.COMP crafts digital infrastructure that scales. From web platforms to AI systems — we engineer solutions that define entire industries.',
  keywords: ['KETA.COMP', 'software engineering', 'Central Asia', 'web development', 'AI'],
  icons: {
    icon: [{ url: '/logo/logo-mark.svg', type: 'image/svg+xml' }],
    apple: '/logo/logo-mark.svg',
    shortcut: '/logo/logo-mark.svg',
  },
  openGraph: {
    title: 'KETA.COMP — Engineering Digital Ecosystems',
    description: 'Engineering Digital Ecosystems for the Next Generation',
    type: 'website',
    siteName: 'KETA.COMP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KETA.COMP — Engineering Digital Ecosystems',
    description: 'Engineering Digital Ecosystems for the Next Generation',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className="dark"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#05060a] text-slate-100 antialiased overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <IntroAnimation />
            <CustomCursor />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
