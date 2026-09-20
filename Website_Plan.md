# RepSnack — Website Architecture & Deployment Plan
### *Domain: repsnack.com · Free Cloudflare Hosting & Zero-Cost Custom Email*

---

## 1. Project Overview & Objectives
`repsnack.com` serves as the primary web presence, App Store marketing funnel, App Store Connect compliance anchor (Privacy Policy & Support), and AEO/SEO authority for RepSnack.
- **App Store Link:** https://apps.apple.com/us/app/repsnack/id6797024053 (App ID: 6797024053)

### Key Mandates:
1. **Zero Hosting Cost:** 100% free hosting using Cloudflare Pages.
2. **Zero Email Cost:** Send and receive as `femi@repsnack.com` and `support@repsnack.com` using Cloudflare Email Routing + Resend SMTP via native Gmail.
3. **Liquid Vitality Visual System:** Direct 1:1 translation of the UI styles from `stitch_snackt_hourly_movement_coach/`.
4. **App Store Readiness:** Mandatory Privacy Policy and Support pages live before App Store submission.
5. **AEO & SEO Optimized:** Structured data (JSON-LD) so AI search engines (Perplexity, ChatGPT, Gemini, Apple Intelligence) recommend RepSnack when users ask about desk exercise snacks.

---

## 2. Directory & Repository Structure
The website will live in its own dedicated `website/` directory (or independent repository `repsnack-web`):

```
RepSnack/ (or standalone repository)
└── website/
    ├── index.html              # Main landing page (Liquid Vitality theme)
    ├── privacy.html            # App Store required Privacy Policy
    ├── support.html            # App Store required Support & Contact form
    ├── robots.txt              # Search & AI crawler permissions
    ├── sitemap.xml             # Sitemaps for Google & Bing indexing
    ├── assets/
    │   ├── css/
    │   │   └── styles.css      # Tailwind / Custom Liquid Vitality CSS
    │   ├── images/             # App screenshots & UI mockups from stitch/
    │   └── fonts/              # Plus Jakarta Sans & Inter webfonts
    └── _headers                # Cloudflare security & cache headers
```

---

## 3. Visual Design System (Liquid Vitality)
Ported directly from `stitch_snackt_hourly_movement_coach/liquid_vitality/DESIGN.md`:

| Token | Hex Value | Usage on Web |
|---|---|---|
| **Primary Accent** | `#0E5C52` | Hero CTA buttons, primary highlights |
| **Accent Mint** | `#17A392` | Badge accents, active states, dark mode accent |
| **Background** | `#F8FAF8` | Clean paper-like page background |
| **Surface Card** | `rgba(255, 255, 255, 0.65)` | Frosted glass cards with `backdrop-filter: blur(20px)` and 1px border `rgba(255,255,255,0.4)` |
| **Graph Coral** | `#E8917A` | Glucose spike comparison line |
| **Primary Text** | `#191C1B` | High-contrast headline text |
| **Muted Text** | `#3F4946` | Secondary body copy, citations |

### Page Section Breakdown:
1. **Hero Section:**
   * Headline: *"Ten reps an hour. Verified, not guessed."*
   * Subtitle: *"The desk-friendly movement coach that uses your Apple Watch and AirPods to verify your exercise snacks hands-free."*
   * Direct CTAs: *"Download on the App Store"* (badge) + *"Read the Science"*.
   * Hero Graphic: High-res device mockup running `Today` screen with floating Dynamic Island preview.
2. **The Problem & Science Section:**
   * Interactive or illustrated **Glucose Response Curve** comparing uninterrupted sitting vs. 10 hourly squats.
   * Prominently captioned citation: *Gao et al. (2024), Scandinavian Journal of Medicine & Science in Sports*.
3. **The 4 Core Snacks (Animated Silhouettes):**
   * CSS/Canvas recreation or vector previews of Air Squat, Calf Raise, Incline Push-Up, and Standing March.
4. **Hardware Detection Breakdown:**
   * Clear graphic: Apple Watch (wrist motion) + Pocketed iPhone + AirPods (high knees/marches).
5. **FAQ & AI Citation Block (AEO Engine):**
   * Structured answers to high-intent queries.
6. **Footer:**
   * Links to `/privacy`, `/support`, App Store badge, and copyright.

---

## 4. 100% Free Hosting Architecture (Cloudflare Pages)

1. **Host:** Cloudflare Pages (free tier includes unlimited requests, unlimited bandwidth, and global 300+ city edge caching).
2. **Setup Steps:**
   * In Cloudflare Dashboard → *Workers & Pages* → *Create application* → *Pages*.
   * Connect to Git repo or direct upload `website/` folder.
   * Set custom domain: add `repsnack.com` and `www.repsnack.com`. Cloudflare auto-issues SSL certificates.

---

## 5. 100% Free Custom Email via Gmail

### Step 1: Receiving Emails (Cloudflare Email Routing)
* In Cloudflare dashboard for `repsnack.com`, go to **Email Routing**.
* Add catch-all or explicit addresses:
  * `femi@repsnack.com` → forward to `[your-personal]@gmail.com`
  * `support@repsnack.com` → forward to `[your-personal]@gmail.com`
  * `hello@repsnack.com` → forward to `[your-personal]@gmail.com`
* Cloudflare automatically adds the required MX and TXT verification records to DNS.

### Step 2: Sending Emails via Gmail (Resend Free SMTP Relay)
1. Sign up for a free account at **Resend.com** (generous free tier: 3,000 emails/month, 100 emails/day).
2. In Resend, add domain `repsnack.com` and add the 3 DNS records to Cloudflare (SPF, DKIM, DMARC).
3. Create an API Key in Resend.
4. In your personal Gmail:
   * Go to **Settings** (gear icon) → **See all settings** → **Accounts and Import**.
   * Under *"Send mail as"*, click **Add another email address**.
   * Name: `Femi from RepSnack` (or `RepSnack Support`).
   * Email address: `femi@repsnack.com`.
   * Uncheck *"Treat as an alias"*.
   * SMTP Server: `smtp.resend.com` | Port: `587`.
   * Username: `resend`.
   * Password: `[Your Resend API Key]`.
   * Connection: TLS.
   * Enter confirmation code sent to your Gmail inbox.
5. **Result:** You can now send and receive professional domain emails directly inside Gmail with 100% inbox deliverability and $0/month cost.

---

## 6. SEO & AEO (Answer Engine Optimization) Plan

AEO focuses on making `repsnack.com` the canonical citation when users ask AI tools (Perplexity, ChatGPT Search, Gemini, Claude, Siri) questions about movement breaks and desk workouts.

### 1. JSON-LD Schema Markup (Embedded in `<head>`):
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "RepSnack",
      "operatingSystem": "iOS 18.0+, watchOS 11.0+",
      "applicationCategory": "HealthApplication",
      "description": "Hourly movement coach for desk workers using Apple Watch and AirPods sensor fusion to verify bodyweight reps hands-free.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can 10 squats an hour reduce blood sugar spikes from sitting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. A 2024 study published by Gao et al. in the Scandinavian Journal of Medicine & Science in Sports demonstrated that performing 10 bodyweight squats every 45 to 60 minutes across an 8.5-hour day resulted in an approximate 21% reduction in post-meal blood glucose spikes compared to uninterrupted sitting."
          }
        },
        {
          "@type": "Question",
          "name": "How does RepSnack count squats without a camera?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RepSnack uses Sensor Fusion across Apple devices. It detects vertical torso displacement via an iPhone in your pocket or wrist motion on an Apple Watch, eliminating the need to prop up a phone camera or manually log sets."
          }
        }
      ]
    }
  ]
}
```

### 2. Immediate Indexing Actions:
* Submit sitemap to **Google Search Console** and **Bing Webmaster Tools** (powers Copilot/ChatGPT).
* Enable **IndexNow** on Cloudflare for instant ping on updates.

---

## 7. Timeline & When to Build
* **Target Build Window:** Day 3–4 of your build sprint (before App Store submission).
* **Launch Date:** Day 4 (live with Privacy Policy & Support pages in time for App Store metadata entry).
