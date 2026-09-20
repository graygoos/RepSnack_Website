---
name: Liquid Vitality
colors:
  surface: '#f8faf8'
  surface-dim: '#d8dbd9'
  surface-bright: '#f8faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f2'
  surface-container: '#eceeec'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#3f4946'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#6f7976'
  outline-variant: '#bec9c5'
  surface-tint: '#22695f'
  primary: '#00433b'
  on-primary: '#ffffff'
  primary-container: '#0e5c52'
  on-primary-container: '#8ed2c5'
  inverse-primary: '#8fd3c6'
  secondary: '#914a37'
  on-secondary: '#ffffff'
  secondary-container: '#ffa48d'
  on-secondary-container: '#793826'
  tertiary: '#5f2c1b'
  on-tertiary: '#ffffff'
  tertiary-container: '#7b4230'
  on-tertiary-container: '#ffb29b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#abf0e2'
  primary-fixed-dim: '#8fd3c6'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005047'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb4a1'
  on-secondary-fixed: '#3b0901'
  on-secondary-fixed-variant: '#743422'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59e'
  on-tertiary-fixed: '#370e02'
  on-tertiary-fixed-variant: '#6e3826'
  background: '#f8faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
typography:
  display-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  card-gap: 12px
---

## Brand & Style
The design system focuses on "micro-interventions" for wellness, prioritizing a calm, non-intrusive presence for desk-bound professionals. The aesthetic combines the precision of high-end editorial layouts with the tactile softness of "Liquid Glass"—a refined implementation of glassmorphism that feels organic rather than synthetic.

The style is characterized by generous white space, light-weight line work, and a sense of physical depth created through translucent layers. It avoids the aggressive "hustle" culture of traditional fitness apps, opting instead for a restorative, quiet companion feel that mirrors the focus required for deep work.

## Colors
The palette is rooted in nature and high-contrast legibility. 
- **Primary Accent (#0E5C52):** Used for primary buttons, active states, and "Hero Numbers" (large hourly counts). In dark mode, this should be adjusted to a slightly more luminous teal (#17A392) to maintain AA contrast ratios.
- **Secondary Accent (#E8917A):** Strictly reserved for "Spike" lines in activity charts to denote movement intensity or goal completion.
- **Backgrounds:** A soft, paper-like off-white provides a low-strain reading experience in light mode. Dark mode uses a charcoal depth to allow frosted cards to pop.
- **Neutrals:** Mid-tone grays are used for labels and secondary descriptions to maintain a clear visual hierarchy without cluttering the interface.

## Typography
The typography strategy creates a contrast between the "Human" and the "System." 
- **Plus Jakarta Sans** is used for headings and large data points. Its soft, rounded terminals provide an approachable, friendly energy to numbers and titles.
- **Inter** handles all functional and body text, providing a neutral, highly legible "system" feel that ensures the app feels like a native extension of the OS.

Use `display-xl` for the main hourly countdown or step count. All typography should follow a tight vertical rhythm, with labels always positioned in a lighter weight or neutral color to keep the focus on the content.

## Layout & Spacing
This design system utilizes a fluid grid with a 24px safe margin on mobile and tablet. The layout philosophy is "Centric Stacked," where core information is housed in vertically stacked cards.

Spacing is generous to promote a "calm" user experience. Elements should never feel cramped; use 12px or 16px gaps between cards to allow the background blur effects to be visible in the gutters. For desktop views, content should be constrained to a 640px centered column to maintain the editorial feel and prevent line lengths from becoming unreadable.

## Elevation & Depth
Depth is the primary communicator of hierarchy in this design system. Instead of traditional drop shadows, we use **Liquid Glass** surfaces:
- **Surface Layer:** 40% - 60% opacity white (or 10% white in dark mode) with a 20px - 32px backdrop blur.
- **Borders:** A 0.5px subtle inner-stroke (white at 20% opacity) to catch the "light" and define the card edges.
- **Shadows:** Only used sparingly on the primary CTA button, using a very diffused (30px blur), low-opacity tint of the primary teal color.

## Shapes
Shapes are consistently rounded to mirror the friendly nature of the display typography. 
- Standard cards use `rounded-lg` (16px).
- Interaction elements like buttons and input fields use `rounded-xl` (24px) or full pills.
- Circular progress rings should use a 12px stroke width with rounded caps to feel soft and continuous.

## Components
- **Frosted Glass Cards:** The container for all movement prompts. Must include a `backdrop-filter: blur(20px)`.
- **Circular Progress Rings:** Used for the hourly "Movement Goal." The background of the ring should be a subtle 10% opacity of the primary teal; the active progress should be the solid Primary Accent.
- **Primary Buttons:** High-contrast, solid teal backgrounds with white text. Rounded-pill shape.
- **Activity Charts:** Ultra-minimalist. No axes or grids—only a light baseline and the "Spike" line in Coral (#E8917A).

### Icons (Line-art Human Silhouettes)
Icons must be drawn with a consistent 1.5pt stroke, utilizing rounded terminals and no fill.
1. **Air Squats:** Profile view, torso upright, knees at 90-degree bend, arms extended horizontally for balance.
2. **Calf Raises:** Profile view, figure standing tall, heel line disconnected from the floor line to indicate height.
3. **Incline Push-Ups:** Figure at a 45-degree angle, hands touching a minimalist horizontal line (desk/table), body in a straight plank.
4. **Standing Marches:** Figure with one leg straight and the opposite knee raised to hip height (90-degree angle).