# KETA.COMP — Official Website

Engineering Digital Ecosystems for the Next Generation.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14 (App Router) | Framework |
| TypeScript | 5.x | Language |
| Tailwind CSS | 3.x | Styling |
| Framer Motion | 11.x | Animations |
| next-intl | 3.x | i18n (EN / RU / UZ / AR-rtl / ZH) |
| Nodemailer | 6.x | Email via Gmail SMTP |
| next-themes | 0.3 | Dark / Light mode |
| @opennextjs/cloudflare | 0.6.x | Cloudflare Pages adapter |

## Sections

| Section | Description |
|---------|-------------|
| Navbar | Language switcher (5 langs), dark/light toggle, mobile menu |
| Hero | Full-viewport, particle bg, custom cursor, animated headings |
| About | Values grid, glassmorphism cards |
| Services | 6 services — Web, Mobile, AI, Startup, Automation, Cloud |
| Portfolio | 6 projects — TextileOps, Bozor-Bozor, KRGo, OpenLearn, Mahalla-Rabosi, AI Trading |
| Tech Stack | Double marquee ticker row |
| Stats | Animated count-up counters |
| Timeline | 2024→2025→2026→Future alternating timeline |
| Team | Founder & CEO + Engineering + Design |
| Investor | Market opportunity, Seed round CTA |
| Contact | Form → keta.comp.dev@gmail.com via Nodemailer |
| Footer | Links grid, socials |

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
EMAIL_USER=keta.comp.dev@gmail.com
EMAIL_PASS=your_gmail_app_password_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Get Gmail App Password

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. **Security** → **2-Step Verification** (enable if not active)
3. **App passwords** → Create → Select **Mail** → Copy the 16-character password
4. Paste it as `EMAIL_PASS` in `.env.local`

### 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Languages

| Code | Language | URL |
|------|----------|-----|
| `en` | English | `/` (default, no prefix) |
| `ru` | Russian | `/ru/` |
| `uz` | Uzbek | `/uz/` |
| `ar` | Arabic (RTL) | `/ar/` |
| `zh` | Chinese | `/zh/` |

---

## Build

```bash
npm run build   # Next.js production build
npm run start   # Start production server locally
```

---

## Cloudflare Pages Deployment

This project uses [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) to deploy Next.js on Cloudflare Pages.

### Required config files (already created)

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Cloudflare Workers config (name, compatibility flags) |
| `open-next.config.ts` | OpenNext adapter config |

### Step 1 — Authenticate with Cloudflare

```bash
npx wrangler login
```

This opens a browser window. Log in to your Cloudflare account.

### Step 2 — Set environment variables in Cloudflare Dashboard

Go to **Cloudflare Dashboard → Workers & Pages → keta-comp → Settings → Environment variables**

Add these variables (both **Production** and **Preview**):

| Variable | Value |
|----------|-------|
| `EMAIL_USER` | `keta.comp.dev@gmail.com` |
| `EMAIL_PASS` | your Gmail App Password |
| `NEXT_PUBLIC_SITE_URL` | `https://keta-comp.pages.dev` |

### Step 3 — Enable `nodejs_compat` flag

> ⚠️ This is **critical** — without it, the app won't run on Cloudflare.

The `wrangler.jsonc` already includes `"nodejs_compat"` in `compatibility_flags`.
Additionally, verify it in the Cloudflare Dashboard:

**Workers & Pages → keta-comp → Settings → Compatibility flags**
→ Add `nodejs_compat` for both Production and Preview

### Step 4 — Deploy

```bash
npm run deploy
```

This runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy` internally.

### Step 5 — Preview locally (before deploying)

```bash
npm run preview
```

This builds with the Cloudflare adapter and starts `wrangler dev` locally.

---

## ⚠️ Contact Form on Cloudflare — SMTP Limitation

**Nodemailer uses SMTP (TCP connections) which are NOT available on Cloudflare Workers.**

This means the `/api/contact` endpoint will fail when deployed to Cloudflare.

### Solution: Switch to Resend (HTTP-based email)

1. Create a free account at [resend.com](https://resend.com) (100 emails/day free)
2. Install the package:
   ```bash
   npm install resend
   ```
3. Get your API key from Resend Dashboard
4. Add to Cloudflare env vars: `RESEND_API_KEY=re_xxxxxxxxxxxx`
5. Replace the contents of `src/app/api/contact/route.ts` with:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'KETA.COMP <onboarding@resend.dev>',   // use your verified domain in prod
      to: 'keta.comp.dev@gmail.com',
      replyTo: email,
      subject: `[KETA.COMP] ${subject}`,
      html: `<p><b>From:</b> ${name} (${email})</p><p><b>Subject:</b> ${subject}</p><p>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
```

> The current Nodemailer implementation continues to work for **local development** and **Vercel** deployments.

---

## Vercel Deployment (alternative — zero-config)

Vercel fully supports Node.js, so Nodemailer works out of the box:

```bash
npm i -g vercel
vercel
```

Add env vars in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

*Engineered with precision in Uzbekistan by Miyras Xalmuratov*
