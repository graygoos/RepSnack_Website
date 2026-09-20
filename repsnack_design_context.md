# RepSnack — Full Design & Product Context
### *The authoritative reference for everything decided so far*

---

## 1. App Name Decision

> [!IMPORTANT]
> **Snackt.com is taken by a snacks delivery company (est. 2021, unclear if active). The name "Snackt" is unregistered with USPTO but carries domain and brand conflict risk.**

### Name Recommendation: **RepSnack**

**Why RepSnack wins over the others:**

| Name | Verdict | Reason |
|---|---|---|
| **RepSnack** ✅ | **Recommended** | Directly encodes the core differentiator — *verified rep counting* + *exercise snacks*. Memorable. Descriptive. Feels native to the App Store. repsnack.com available. USPTO clear. |
| Flexnack | Good | Distinctive, no collisions — but "Flex" implies flexibility/stretching, not rep-counting. Could confuse the mechanic. |
| Snackrobics | Playful but long | Fun, but harder to say fast, reads as "aerobics" which implies cardio sessions not desk-friendly snacks. |
| Nibblefit | Too soft | Tone drifts toward diet/nutrition. Wrong category signal. |
| Snaxit | Catchy | Short, punchy — but "exit" connotation may imply quitting or breaks, not reps. |

**RepSnack** is the name to proceed with unless you feel strongly otherwise. Every reference below uses RepSnack.

---

## 2. Decisions Locked In (from Q&A)

### 2.1 Calendar-Aware Pausing
- **Default**: auto-pause silently during calendar events with attendees or video-call links
- **Escape valve**: one quiet check-in if 2+ hours pass without a snack during work hours — *"Been in meetings a while — want to sneak in a quick one now?"*
- **Settings toggle**: users who prefer to be asked every time can opt in

### 2.2 Custom Exercises (v1.1, not v1)
- User-named movements (wall push-ups, neck rolls, etc.)
- Manual count only — app is transparent that AirPods detection isn't available for arbitrary movements
- Named, duration/rep-targeted, no auto-detection claim

### 2.3 Onboarding Form-Check (Recommendation)
**Include it, but position it as optional and aspirational — not gating.**

The one-time camera-based Vision framework squat assessment is a genuine product moment:
- It answers "does the app actually know what a good rep looks like?" — yes, and it *shows* you
- It's the only place camera appears in the entire product, which makes it special
- Position it as *"Optional: Let's calibrate your squat for better detection"* — not required, skippable
- If skipped, AirPods detection falls back to a generalized model with a small accuracy caveat surfaced in the UI
- Gate it behind AirPods detection being enabled (not available to manual-tap users — no reason to run camera calibration if you're just tapping)

### 2.4 Live Activities / Dynamic Island — **V1**
- Countdown to next snack visible without opening the app during work window
- Dynamic Island: compact mode shows `⏱ 24m` (time to next snack)
- Lock Screen Live Activity: `RepSnack · Next snack in 24 min · 6/8 today`
- Stops when work window ends or all snacks are complete

### 2.5 Notification Style
**Combination — with a smart default**:

| Hardware | Default notification |
|---|---|
| Watch + iPhone | Wrist haptic (primary, quietest) + optional AirPods audio cue |
| iPhone + AirPods (no Watch) | AirPods audio cue ("Snack time") + silent banner |
| iPhone only | Prominent banner + haptic |

Settings section "Notifications" lets user choose:
- `Haptic only` / `Haptic + sound` / `Silent banner only`
- AirPods audio cue toggle (on/off, only visible if AirPods detected)
- Watch haptic toggle (on/off, only visible if Watch paired)

### 2.6 Exercise Rotation
- User can choose between:
  - **Auto-rotate** (app suggests different muscle groups across the day's snacks)
  - **Session-by-session** (user picks each time, or keeps their default)
- Default: **Session-by-session** (lower friction, most flexible)
- Auto-rotate available as a preference in Settings > Exercise Preferences

### 2.7 Navigation Bars
- **No profile picture on nav bar trailing side** — removed from all screens
- **No inline navigation bars on core screens** — use large/prominent titles throughout
- Profile/account accessed via Settings only

### 2.8 HealthKit Integration — **Minimal V1, Richer V2**

**V1 (include):**
- Write **Mindful Minutes** / **Exercise Minutes** to Health after each completed snack — low friction, high perceived value, "works with Apple Health" is a trust signal
- No reads from HealthKit in v1 — avoids the complex permissions conversation on first launch

**V2:**
- Read step count + standing hours as context for the "active sedentary" framing
- AirPods Pro 3 passive heart-rate context (when available)
- Write **HKWorkout** records for completed snack sessions

> [!NOTE]
> HealthKit entitlement must be added in Xcode Signing & Capabilities. Usage description strings required in Info.plist. Always check `HKHealthStore.isHealthDataAvailable()` — not available on iPad.

### 2.9 Fonts & Icons

**Yes, download and bundle the fonts in the project — do not rely on system fonts.**

| Font | Use | Source | License |
|---|---|---|---|
| **Plus Jakarta Sans** | Display numbers, headlines | [Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | SIL OFL 1.1 — free commercial use ✅ |
| **Inter** | Body text, labels, captions | [rsms.me/inter](https://rsms.me/inter) | SIL OFL 1.1 — free commercial use ✅ |

**Why bundle vs. system fonts:**
- Consistent rendering across iOS versions
- Works identically when Android app is developed (no SF Pro dependency)
- Registering fonts in the app's `Info.plist` with `UIAppFonts` key (one-time setup)

**Icons:**
- Use [SF Symbols](https://developer.apple.com/sf-symbols/) for all UI chrome (calendar, clock, settings gear, chevrons) — SF Symbols is the right call for native feel
- The 4 exercise silhouettes (Squats, Calf Raises, Push-Ups, Marches) are custom vector assets — export as SVG from Figma/Stitch, add to Assets.xcassets as vector PDFs (preserves crisp rendering at all sizes, works cross-platform)

### 2.10 Pomodoro/Work Timer — **Considered, Not V1**
The Pomodoro mechanic is genuinely complementary (work in focused blocks, break with a snack) but adds significant scope:
- Requires its own timer engine, state management, and UI surface
- Risks making RepSnack feel like a productivity app rather than a movement coach
- **Recommendation**: add as a v2 "Focus Mode" feature — user can optionally link snack reminders to Pomodoro intervals instead of the clock. Keep v1 clock-based.

---

## 3. What This App Is Built On (Tech Stack)

Per **SwiftAgents-main/AGENTS.md** — these rules are non-negotiable:

| Constraint | Rule |
|---|---|
| Target | iOS 26.0+ |
| Language | Swift 6.2+, modern Swift concurrency (async/await, actors) |
| UI | SwiftUI only — no UIKit unless unavoidable |
| State | `@Observable` classes marked `@MainActor` — never `ObservableObject` |
| Persistence | SwiftData + CloudKit |
| Navigation | `NavigationStack` + `navigationDestination(for:)` |
| Tabs | `Tab` API (not `tabItem()`) |
| Fonts | `foregroundStyle()` not `foregroundColor()`; `clipShape(.rect(cornerRadius:))` not `cornerRadius()` |
| Concurrency | Never `DispatchQueue.main.async` — always `Task` / `await` |
| Third-party | Ask before introducing any |

**Project Structure — Feature-Modular:**

```
RepSnack/
├── Features/
│   ├── Onboarding/       # All 20+ onboarding screens
│   ├── Today/            # Home screen + countdown
│   ├── ActiveSnack/      # Rep-counting screen
│   ├── Completion/       # Celebration screen
│   ├── Exercises/        # Exercise picker + custom exercises (v1.1)
│   ├── Insights/         # Weekly view
│   └── Settings/         # Full settings tree
├── Core/
│   ├── Models/           # SwiftData models
│   ├── Managers/         # HealthKit, Notifications, Motion, EventKit
│   ├── Extensions/       # Swift/SwiftUI extensions
│   └── Utilities/
├── DesignSystem/
│   ├── Colors.swift
│   ├── Typography.swift
│   ├── Components/       # Reusable views (GlassCard, RingProgress, etc.)
│   └── Tokens.swift
├── Resources/
│   ├── Fonts/            # Plus Jakarta Sans + Inter .ttf files
│   └── Assets.xcassets
├── Watch/                # WatchKit extension target
└── Widget/               # WidgetKit + ActivityKit (Live Activities) target
```

> [!IMPORTANT]
> Every type in its own file. No multiple structs/classes in a single Swift file. View logic in view models. Unit tests for core logic. No force-unwraps. No hardcoded padding values.

---

## 4. Design System — Liquid Vitality (Locked)

### Colors

| Token | Light | Dark | Usage |
|---|---|---|---|
| Primary accent | `#0E5C52` | `#17A392` | Hero numbers, active states, primary buttons |
| Secondary accent | `#E8917A` | `#E8917A` | Spike line in charts **only** — never a UI action color |
| Background | `#F8FAF8` | `#121412` | App background |
| Surface card | 40–60% white opacity + 20–32px blur | 10% white opacity + 20px blur | Frosted glass cards |
| On-surface | `#191C1B` | `#EFF1EF` | Primary text |
| On-surface variant | `#3F4946` | `#BEC9C5` | Secondary text, labels |
| Outline | `#6F7976` | — | Borders, inactive |

### Typography

| Role | Font | Size | Weight | Use |
|---|---|---|---|---|
| Display XL | Plus Jakarta Sans | 48px / 36px mobile | 700 | Countdown timer, rep count |
| Headline LG | Plus Jakarta Sans | 24px | 600 | Screen titles |
| Body MD | Inter | 16px | 400 | Body text, descriptions |
| Label SM | Inter | 13px | 500 | Badges, captions, secondary labels |

### Elevation / Glass Surfaces
- **Frosted Glass Card**: `backdrop-filter: blur(20px)`, white at 40–60% opacity (light) / 10% (dark), 0.5px inner stroke at white 20%
- **Primary button**: solid teal, pill-rounded, subtle teal-tinted shadow (30px blur, low opacity)
- **Progress rings**: 12px stroke, rounded caps, teal fill on transparent teal background

### Icon Grammar (Non-Negotiable)
All exercise icons: 1.5pt stroke, rounded terminals, no fill, same figure style. Reused identically everywhere.

| Exercise | Description |
|---|---|
| Air Squats | Profile, torso upright, knees 90°, arms extended forward |
| Calf Raises | Profile, standing, heel lifted off floor line |
| Incline Push-Ups | 45° lean, hands on minimal horizontal line, straight plank |
| Standing Marches | One leg straight, opposite knee raised to hip height (90°) |

---

## 5. Critical Framing Rules

The glucose-response curve is **always captioned**: *"Illustrative — based on published research, not a personal reading."*

Never state as measured personal fact:
- ❌ "Post-lunch stability window active"
- ❌ "+12% better than yesterday"
- ❌ "Your metabolism is..."
- ❌ "Readiness: Moderate activity suggested"

Safe language: "interrupt sitting time", "exercise-snack research shows", "based on published studies".

---

## 6. Full Screen Inventory (20+ Onboarding + Core Screens)

### Onboarding Flow (~20–25 screens)

Modeled on successful multi-step onboarding (Calm, Gentler Streak, Oura): each screen introduces one concept, builds anticipation, earns permission progressively.

| # | Screen | Purpose |
|---|---|---|
| 1 | **Splash / Brand intro** | Logo, name, tagline — "Ten reps an hour. Verified, not guessed." |
| 2 | **The Science Hook** | The Diary of a CEO moment — "10 squats > 30-min walk" — illustrated wave motif |
| 3 | **The Problem** | "Active sedentary" — you exercise but sit 10h. Stats. |
| 4 | **The Solution** | Exercise snacks, briefly explained, wave/curve motif |
| 5 | **How RepSnack Works** | 3-step visual: nudge → reps → done. 40 seconds. |
| 6 | **The Differentiator** | "Verified, not guessed" — AirPods count your reps hands-free |
| 7 | **Hardware intro** | Tiered visual: iPhone / iPhone+AirPods / +Watch. You're fine with what you have. |
| 8 | **Meet the exercises** | 4 exercise cards with silhouette icons + detection badges |
| 9 | **Choose your default** | Pick one exercise to start (can change anytime) |
| 10 | **Optional: Form calibration** | "Let's check your squat — optional, makes detection smarter." Camera permission here. |
| 11 | **Form calibration active** | Camera view, Vision framework, live feedback — or Skip |
| 12 | **Schedule setup** | Work days + hours (manual, required). Subhead: "RepSnack only nudges during your work window." |
| 13 | **Work Focus toggle** | "Auto-detect using Work Focus" — optional, explained in 1 line |
| 14 | **Calendar permission** | "Pause during meetings" — optional, EventKit permission request with pre-permission explanation |
| 15 | **Notification preview** | Show what a nudge looks like (haptic + banner mockup). Notification permission request. |
| 16 | **Dynamic Island / Live Activity** | "Your countdown, always visible" — preview of Live Activity. Permission if needed. |
| 17 | **Apple Watch** | "Already wearing one? RepSnack works with it." — Watch detection, no required. |
| 18 | **AirPods detection** | "Plug in your AirPods to count reps hands-free" — enable/skip |
| 19 | **Apple Health** | "Add your snacks to Apple Health" — HealthKit write permission (Mindful Minutes) |
| 20 | **Paywall / Premium intro** | Soft paywall — what free gets you vs. premium. RevenueCat powered. |
| 21 | **All set** | Summary of what's set up, what's active. "Let's go." CTA. |

> Screens 10–11 (form calibration) and 13–19 (permissions) are skippable — user can set up later in Settings. Never gate the core loop behind a permission.

### Core App Screens

| Screen | Key Rule |
|---|---|
| **Today / Home** | Exactly 4 elements: countdown, progress, Response Flattening card (with caption), Next Up card |
| **Active Snack** | Ring + rep counter + "Detecting via AirPods" + small "+1 Manual". No camera, no gym imagery, no multi-set framing |
| **Completion** | One rich animation moment. Curve flattens. Warm message. Streak. Running total. |
| **Exercise Picker** | 4 cards with silhouette icons + confidence badges |
| **Weekly Insights** | Bar/line chart (snacks done vs. missed), streak calendar, one encouraging line |
| **Settings** | Schedule (manual + Focus + Calendar), Exercise Prefs (default + rotation mode + which enabled), Notifications, Privacy, Account |
| **Watch Today** | Complication: countdown + count. App: live rep ring during active snack |
| **Widgets (S + M)** | Countdown + count. Same color/type system |

---

## 7. Monetization (RevenueCat Powered)

> [!IMPORTANT]
> **RevenueCat Shipathon 2026 runs August 1 – September 30, 2026.** The app must be brand-new, natively integrate RevenueCat SDK, and be published on the App Store. Submission requires a 2-minute demo video, icon, screenshots, and judge access to premium features.

### Design Philosophy: Gate the Ceiling, Not the Floor

Free feels complete for a casual user. Premium is what an *engaged* user naturally wants once the habit starts working. Every premium feature is something a motivated user hits a wall on and thinks *"I wish I could do that"* — not a feature they notice is missing on day one.

### Free Tier — The Habit Loop, Complete

| Feature | Notes |
|---|---|
| Unlimited hourly reminders | Core value proposition, ungated |
| AirPods / manual rep counting | The differentiator — always free |
| 4 core exercises | Full exercise set, no artificial limits |
| Fixed 10-rep target | Correct default; upgrade moment arrives naturally as fitness improves |
| Single schedule window | One work block — covers 95% of users |
| 30-day history | Enough to see progress; the wall arrives at ~Week 5 |
| Live Activities / Dynamic Island | Countdown visible without opening app |
| Basic weekly view | Snacks done vs. missed, streak calendar |

### Premium — "You've Built the Habit. Now Make It Yours."

| Feature | Why It Converts | Implementation Effort |
|---|---|---|
| **Custom rep targets (5–30)** | Natural ceiling: fitness improves, 10 reps gets easy. Upgrade prompt: *"You've been hitting 10 reps easily. Ready to step it up?"* | Low — one SwiftData field, one settings control |
| **Multiple schedule windows (AM/PM)** | Lots of desk workers have a morning block + post-lunch block with a gap between. One window doesn't fit. | Medium — extends schedule engine |
| **Audio rep counting** | AirPods speak the count in your ear — *"one… two… three…"* — so eyes never leave the screen. Impossible to un-use once tried. Uses `AVSpeechSynthesizer`. | Very low — trivial to implement |
| **Streak protection (1 grace day/week)** | Duolingo proven. People pay real money not to lose streaks. Costs nothing to implement. Badge framing: *"Premium members get 1 grace day — because life happens."* | Trivial — one boolean check |
| **Unlimited history** | Not punitive on day 1. At Week 5 a motivated user *will* want to look back further. | Very low — SwiftData predicate filter |
| **Shareable weekly summary card** | Beautiful generated image: reps completed, streak, best day — formatted for social sharing. Premium feature + free organic marketing every time someone posts it. Uses `ImageRenderer`. | Medium — one SwiftUI view rendered to image |
| **Apple Watch app** | Watch complications, wrist haptics, Watch-based rep counting as secondary signal | Already built — gating is a config flag |
| **Custom exercises (v1.1)** | User-named movements, manual count | v1.1 — in roadmap |

### Full Tier Comparison

| Feature | Free | Premium |
|---|---|---|
| Hourly reminders | ✅ | ✅ |
| AirPods rep counting | ✅ | ✅ |
| 4 core exercises | ✅ | ✅ |
| Live Activities / Dynamic Island | ✅ | ✅ |
| Fixed 10-rep target | ✅ | — |
| **Custom rep targets (5–30)** | ❌ | ✅ |
| Single schedule window | ✅ | ✅ |
| **Multiple windows (AM/PM)** | ❌ | ✅ |
| **Audio rep counting (AirPods)** | ❌ | ✅ |
| **Streak protection (1 grace day)** | ❌ | ✅ |
| 30-day history | ✅ | ✅ |
| **Unlimited history** | ❌ | ✅ |
| **Shareable weekly card** | ❌ | ✅ |
| Apple Watch app | ❌ | ✅ |
| Custom exercises | ❌ | ✅ (v1.1) |
| Basic weekly view | ✅ | ✅ |

### Pricing

| Plan | Price | Rationale |
|---|---|---|
| **Monthly** | **$3.99/mo** | Lower barrier than $4.99; higher trial conversion. Still a clear revenue signal. |
| **Annual** | **$29.99/yr** (~$2.50/mo) | 25% discount — your real conversion target. Anchors the monthly as expensive by comparison. |
| **Lifetime** | **$59.99** one-time | Launch-window urgency. Converts curious early adopters who reject subscriptions. Strong trust signal for Shipathon judges. Remove or raise price 3–6 months post-launch. |

### Paywall Copy

> **"You've built the habit. Now make it yours."**
>
> Set your own rep targets. Schedule morning and afternoon windows separately. Hear your reps counted as you do them. And protect your streak when life gets in the way.

### B2B / Employer (v2, 12–24 month horizon)
- Per-seat licensing ($2–4/employee/month)
- Team-level anonymized compliance dashboard
- Wellness stipend platform integration (Peloton Corporate, Headspace for Work buyer profile)

---

## 8. Full Product Roadmap

### Phase 0 — Pre-build (Days 1–2)
- [ ] Finalize app name (RepSnack recommended)
- [ ] Register domain, App Store Connect listing
- [ ] Set up Xcode project with SwiftAgents AGENTS.md guidelines
- [ ] Add SwiftAgents-main AGENTS.md to project root
- [ ] Integrate RevenueCat SDK, configure products
- [ ] Add Plus Jakarta Sans + Inter fonts to project
- [ ] Create Assets.xcassets with design tokens, exercise SVG icons
- [ ] Set up SwiftData model schema + CloudKit container

### Phase 1 — V1 MVP (Days 3–22 / Shipathon window)

**Feature modules to build in order:**

1. **Design System** — Colors, Typography, GlassCard, RingProgress, exercise icons
2. **Onboarding** — All 20+ screens, permission flows, RevenueCat paywall
3. **Core Data Models** — SnackSession, Exercise, Schedule, UserProfile (SwiftData)
4. **Schedule Engine** — Work window calculation, Focus mode detection, EventKit calendar parsing
5. **Notification Engine** — UNUserNotificationCenter scheduling within work window, calendar-aware pausing, check-in after 2h silence
6. **Live Activities** — ActivityKit widget (countdown), Dynamic Island compact/expanded
7. **Motion Detection** — CMHeadphoneMotionManager (AirPods), fallback to CMMotionManager (Watch/phone)
8. **Today Screen** — Home, countdown, Response Flattening card, Next Up card
9. **Active Snack Screen** — Rep ring, motion integration, swap exercise
10. **Completion Screen** — Celebration animation, streak update
11. **Exercise Picker** — 4 cards with badges
12. **Weekly Insights** — Charts (Swift Charts), streak calendar
13. **Settings** — Full settings tree matching onboarding options
14. **HealthKit** — Write Mindful Minutes on snack completion
15. **Apple Watch Target** — Today complication, active snack screen
16. **Widget Target** — Small + medium home screen widgets
17. **App Icon** — (see section 9)
18. **App Store** — Screenshots, metadata, preview video

### Phase 2 — V1.1 (Weeks 5–8 post-launch)
- Custom exercises (manual count, named)
- Form calibration history
- Exercise rotation auto-mode
- Deeper insights (monthly view, patterns)
- Pomodoro/Focus timer integration

### Phase 3 — V2 (Months 3–6)
- HealthKit reads (steps, standing hours)
- Team/family streaks
- B2B employer dashboard (anonymized compliance)
- AirPods Pro 3 heart-rate context
- Android app (Flutter, using same fonts/icons)

---

## 9. App Icon

**Concept direction**: The icon should be instantly readable at 60pt and feel like a calm, premium health app — not a gym app.

**Recommendation**: 
- A stylized, simplified squat-silhouette figure (same design language as in-app icons) with a subtle circular arc/ring behind it suggesting motion and completion
- On the deep teal `#0E5C52` background
- White figure, no gradients on the figure itself — clean and bold
- Optionally: a very subtle wave element in the lower third echoing the glucose-curve motif
- No text in the icon

**Avoid**: Dumbbells, lightning bolts, generic circles, neon gradients, excessive detail that disappears at small sizes.

> [!TIP]
> Generate the icon at 1024×1024 (App Store Connect requirement). Xcode will automatically resize for all other slots from the single 1024px asset.

---

## 10. RevenueCat Shipathon — Content & Build Strategy

### Build Schedule: 15–22 Days

| Day | Build Focus | Daily Post Theme |
|---|---|---|
| 1 | Project setup, design system foundations | "I'm building a new app in 22 days. Here's why desk workers need this." |
| 2 | Fonts, colors, glass card component, exercise icons | "The design system behind [AppName]: why I chose these exact colors." |
| 3 | SwiftData models, CloudKit schema | "How I modeled the data for a habit app — 5 SwiftData decisions." |
| 4 | Schedule engine, Work Focus integration | "The iOS API most developers don't know about — and how I used it." |
| 5 | Notification engine, calendar-aware pausing | "Smart notifications that know when you're in a meeting. Here's how." |
| 6 | Live Activities + Dynamic Island | "Building the Dynamic Island countdown. First look." |
| 7 | AirPods motion detection (`CMHeadphoneMotionManager`) | "Your AirPods are a motion sensor. I'm using them to count reps." |
| 8 | Today/Home screen | "Day 8: the home screen is done. Here's every design decision I made." |
| 9 | Active snack screen + ring animation | "The rep ring. This is the whole product in one animation." |
| 10 | Completion animation | "The most important screen in the app — the celebration moment." |
| 11 | Onboarding pt.1 (screens 1–10) | "20+ onboarding screens. Here's why that's not too many." |
| 12 | Onboarding pt.2 (permissions flow) | "The right way to ask for permissions: earn them, don't beg for them." |
| 13 | Exercise picker + insights screen | "Charts in SwiftUI with Swift Charts — no libraries needed." |
| 14 | Settings screen | "Settings is where trust lives. How I designed the settings screen." |
| 15 | HealthKit integration | "Writing to Apple Health — the 20 lines of code that make users trust you." |
| 16 | Apple Watch target | "Day 16: the Watch app is running. Here's the complication." |
| 17 | WidgetKit + RevenueCat paywall | "Monetizing without being annoying — my RevenueCat setup." |
| 18 | App icon | "Designing an app icon that works at 60pt. My process." |
| 19 | App Store screenshots + metadata | "App Store screenshots are marketing. Here's my process." |
| 20 | TestFlight beta + bug fixes | "It's in TestFlight. Here's what broke first." |
| 21 | App Store submission | "Submitted. Now we wait. Here's the full stack I shipped." |
| 22 | Launch day | "It's live. [Link]. Here's everything I learned in 22 days." |

### Post Format (Faceless, Short-Form)

**YouTube Shorts / Instagram Reels / TikTok:**
- Screen recordings of Xcode + Simulator (no face needed)
- Voiceover (or text overlay) explaining *one decision* per video
- 30–60 seconds max
- Hook in first 2 seconds: show the output before the explanation
- Format: `[RESULT] → [HOW I BUILT IT] → [WHY THIS DECISION]`

**LinkedIn (primary growth channel post-launch):**
- Longer-form text posts (1,000–1,500 characters)
- Format: Problem → Insight → Solution → CTA
- Start with a stat or counterintuitive claim: *"Exercising 30 minutes a day doesn't protect you from sitting for 10 hours. Here's what does."*
- Post 3x/week during build, daily on launch week
- Target: product managers, engineers, consultants, lawyers — desk workers who also follow tech content
- After launch: user story posts ("X completed 47 snacks this week — that's 470 reps they wouldn't have done"), science posts (citing the research papers), feature reveal posts

**Should the app have its own YouTube channel?**
Yes — but keep it lightweight. Use it as the archive for your Shorts (YouTube auto-serves Shorts to subscribers). Don't create long-form content until after launch. One channel, cross-posted everywhere. Channel name: same as app name.

### Shipathon Submission Checklist
- [ ] App Store listing live
- [ ] RevenueCat SDK integrated with ≥1 in-app purchase working end-to-end
- [ ] 2-minute demo video (screen recording, faceless is fine)
- [ ] App icon (1024×1024)
- [ ] App Store screenshots (all required device sizes)
- [ ] Judge access credentials for premium features
- [ ] Devpost registration submitted

---

## 11. LinkedIn Growth Strategy (Post-Launch)

**Positioning**: "The app for the active sedentary professional."

**Target audience**: knowledge workers with desk jobs who already care about productivity — product managers, engineers, consultants, finance, law. They're on LinkedIn, they follow health+productivity content, they're already aware of the sitting problem.

**Content pillars** (rotate weekly):

1. **Science posts** — one research finding explained simply. *"10 squats outperformed a 30-minute walk. Here's the study."*
2. **Productivity angle** — movement breaks as productivity tools, not just health habits. *"Why I do 10 squats every hour before deep work sessions."*
3. **User stories** — anonymized streak data, user quotes (with permission)
4. **Behind-the-build** — engineering decisions, design choices, lessons learned
5. **The problem** — "active sedentary" posts with relatable framing for desk workers

**Format guidance:**
- Start with a short, bold statement (no "I'm excited to share" openings)
- Use line breaks generously — LinkedIn rewards scannable text
- End with a question to drive comments, or a link to the app
- 3–5 posts/week for first 3 months post-launch

---

## 12. Research Citations (For App Store / In-App Copy)

| Paper | Key Finding | Use |
|---|---|---|
| Gao et al. (2024), *Scand. J. Med. Sci. Sports* | 10 squats every 45 min across 8.5-hr day = ~21% lower blood sugar spikes vs. uninterrupted sitting | Primary hook — cite in App Store description |
| Islam, Gibala & Little (2022), *Exerc. Sport Sci. Rev.* | Coined "exercise snacks" — isolated bouts of vigorous exercise, ≤1 min, periodic throughout day | Definitional authority |
| Dunstan et al. (2012), *Diabetes Care* | Breaking sitting (independently of exercise type) improves glucose response | Foundational — "it's not just squats, it's interrupting sitting" |
| Wan et al. (2025), *Scand. J. Med. Sci. Sports* | 2025 meta-analysis pooling exercise-snacks literature | "Not one study — a research area" |

> **Accuracy note**: Both the frequent-squats and frequent-walking groups saw ~21% reduction in blood sugar spikes. Squats aren't uniquely superior — they're more practical at a desk. App copy should be precise about this.
