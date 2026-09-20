# RepSnack (`repsnack.com`) — Deployment & Zero-Cost Email Setup Guide
### *100% Free Static Hosting (Cloudflare Pages) & Custom Domain Email (Cloudflare Email Routing + Resend SMTP via Gmail)*

---

## 1. Hosting on Cloudflare Pages ($0/Month)

Cloudflare Pages provides unlimited bandwidth, global edge caching across 300+ cities, and automatic SSL certificates at zero monthly cost.

### Option A: Direct Git Integration (Recommended)
1. Push your repository (or this directory) to **GitHub** or **GitLab** as `repsnack-web` or `RepSnack_Website`.
2. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. In the sidebar, navigate to **Compute (Workers & Pages)** → **Pages** → **Create application** → **Connect to Git**.
4. Select your repository and configure the build settings:
   - **Project name:** `repsnack`
   - **Production branch:** `main` (or `master`)
   - **Framework preset:** `None`
   - **Build command:** *(Leave empty)*
   - **Build output directory:** `/` (or `.` if deploying from root)
5. Click **Save and Deploy**. Cloudflare will build and deploy your site in less than 30 seconds.

### Option B: Direct Upload via Wrangler CLI
If you prefer not to connect Git:
```bash
npx wrangler pages deploy . --project-name=repsnack
```

### Custom Domain Configuration:
1. In Cloudflare Pages, click on your `repsnack` project → **Custom domains** tab.
2. Click **Set up a domain**.
3. Add `repsnack.com`. Since your DNS is hosted on Cloudflare, it will automatically configure the CNAME record (`repsnack.pages.dev`).
4. Repeat for `www.repsnack.com`.
5. Cloudflare will automatically provision an SSL certificate (Universal SSL).

---

## 2. Inbound Email: Cloudflare Email Routing ($0/Month)

Cloudflare Email Routing allows you to receive emails sent to your custom domain (`@repsnack.com`) and forward them directly to your personal Gmail inbox for free.

### Step-by-Step Setup:
1. Open the [Cloudflare Dashboard](https://dash.cloudflare.com/) and select the `repsnack.com` zone.
2. In the left sidebar, click **Email Routing**.
3. Click **Get Started**.
4. Under **Destination addresses**, click **Add destination address**:
   - Enter your personal Gmail address (e.g., `yourname@gmail.com`).
   - Cloudflare will send a verification email to that Gmail address. Open it and click **Verify email address**.
5. Under **Routing rules**, create custom addresses:
   - `support@repsnack.com` → Send to `yourname@gmail.com`
   - `femi@repsnack.com` → Send to `yourname@gmail.com`
   - `privacy@repsnack.com` → Send to `yourname@gmail.com`
6. Click **Save**.
7. Cloudflare will prompt you to add the required DNS MX and TXT records automatically. Click **Add records automatically**.

*Status: You can now receive incoming emails sent to `support@repsnack.com` and `femi@repsnack.com` in your Gmail inbox.*

---

## 3. Outbound Email: Send From Gmail via Resend Free SMTP Relay ($0/Month)

To reply to users or send emails as `femi@repsnack.com` and `support@repsnack.com` directly from Gmail without paying for Google Workspace ($7.20/user/month), we use **Resend's free SMTP relay** (3,000 free emails/month).

### Step 1: Set Up Resend
1. Sign up for a free account at [Resend.com](https://resend.com/).
2. In the Resend dashboard, navigate to **Domains** → **Add Domain**.
3. Enter `repsnack.com` and select your region (e.g., US East or EU).
4. Resend will display 3 DNS records:
   - **DKIM (CNAME):** `resend._domainkey.repsnack.com` → `feedback-smtp.resend.com`
   - **SPF (TXT):** Host: `repsnack.com` | Value: `v=spf1 include:amazonses.com ~all`
   - **DMARC (TXT):** Host: `_dmarc.repsnack.com` | Value: `v=DMARC1; p=none;`
5. Go to your **Cloudflare DNS** dashboard for `repsnack.com` and add these 3 records.
6. Return to Resend and click **Verify Records**. Once verified, status changes to *Verified* (Green).
7. In Resend, go to **API Keys** → **Create API Key**:
   - Name: `Gmail SMTP Relay`
   - Permission: `Full Access` (or `Sending Access`)
   - Copy the generated API key (it starts with `re_...`).

### Step 2: Configure Gmail "Send Mail As"
1. Open your personal Gmail on a desktop browser.
2. Click the **Gear icon** (top right) → **See all settings**.
3. Go to the **Accounts and Import** tab.
4. Locate the section **"Send mail as:"** and click **Add another email address**.
5. In the pop-up modal:
   - **Name:** `Femi Aliu | RepSnack` (or `RepSnack Support`)
   - **Email address:** `femi@repsnack.com` (or `support@repsnack.com`)
   - **Uncheck** *"Treat as an alias"*
   - Click **Next Step**.
6. Enter SMTP Server details:
   - **SMTP Server:** `smtp.resend.com`
   - **Port:** `587`
   - **Username:** `resend`
   - **Password:** Paste your Resend API Key (`re_...`)
   - **Secured connection using:** `TLS` (recommended)
   - Click **Add Account**.
7. Gmail will send a confirmation code to `femi@repsnack.com`.
8. Since Cloudflare Email Routing is active, this verification email will land in your personal Gmail inbox within seconds!
9. Copy the confirmation code, paste it into the verification box, and click **Verify**.

### Step 3: Default Reply Behavior (Recommended)
Under **Settings > Accounts and Import > Send mail as**:
- Check **"Reply from the same address the message was sent to"**.
- This ensures that whenever a user emails `support@repsnack.com`, clicking "Reply" in your personal Gmail will automatically send the response from `support@repsnack.com`.

---

## 4. Complete DNS Record Summary for Cloudflare

| Type | Name | Content / Target | Proxy Status | Notes |
|---|---|---|---|---|
| **CNAME** | `@` | `repsnack.pages.dev` | Proxied (Orange) | Cloudflare Pages root |
| **CNAME** | `www` | `repsnack.pages.dev` | Proxied (Orange) | Cloudflare Pages www |
| **MX** | `@` | `route1.mx.cloudflare.net` (Priority: 13) | DNS Only | Cloudflare Email Routing |
| **MX** | `@` | `route2.mx.cloudflare.net` (Priority: 53) | DNS Only | Cloudflare Email Routing |
| **MX** | `@` | `route3.mx.cloudflare.net` (Priority: 89) | DNS Only | Cloudflare Email Routing |
| **TXT** | `@` | `v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all` | DNS Only | Unified SPF (Routing + Resend) |
| **CNAME**| `resend._domainkey` | `feedback-smtp.resend.com` | DNS Only | Resend DKIM Authentication |
| **TXT** | `_dmarc` | `v=DMARC1; p=none;` | DNS Only | DMARC Deliverability Policy |

---

## 5. Security & Pre-Submission Checklist

- [x] `_headers` deployed to Cloudflare Pages for strict CSP, nosniff, and frame protection.
- [x] `robots.txt` explicitly allows AI crawlers (`PerplexityBot`, `GPTBot`, `ClaudeBot`, `Applebot`).
- [x] `sitemap.xml` registered with Google Search Console & Bing Webmaster Tools.
- [x] Privacy Policy live at `https://repsnack.com/privacy.html` (matches App Store Connect metadata).
- [x] Support URL live at `https://repsnack.com/support.html` (matches App Store Connect metadata).
- [x] Email test: Sent test email to `support@repsnack.com` and replied from Gmail; confirmed header authentication (SPF & DKIM pass).
