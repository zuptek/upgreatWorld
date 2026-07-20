# Design System Strategy: The Architectural Horizon

## 1. Overview & Creative North Star: "The Urban Perspective"
This design system moves beyond the generic "SaaS template" to mirror the very industry it represents: Outdoor Advertising. The Creative North Star is **"The Urban Perspective"**—a layout philosophy that treats the digital screen as a high-end architectural canvas. 

We reject the "boxed-in" look of standard web grids. Instead, we utilize **intentional asymmetry, expansive white space, and tonal layering** to create a sense of scale and authority. By overlapping elements and using extreme shifts in typography scale, we simulate the impact of a billboard in a clean, minimalist environment. The goal is "High Trust" through "High Precision."

---

## 2. Colors: Tonal Depth vs. Structural Lines
Our palette is rooted in professional teals and deep obsidian tones, but the secret to this system lies in how we apply them to surfaces.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using `1px` solid borders (`outline`) to define sections. A section’s boundary must be defined solely by a background color shift. 
*   *Example:* A `surface-container-low` section sitting directly on a `surface` background. This creates a "soft edge" that feels integrated and premium.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface tiers to create depth without clutter:
*   **Base:** `surface` (#f7f9fb)
*   **Secondary Content Areas:** `surface-container-low` (#f2f4f6)
*   **Elevated Cards/Modules:** `surface-container-lowest` (#ffffff)
*   **Overlays/Navigation:** `surface-container-highest` (#e0e3e5) with 80% opacity and `blur-xl`.

### Signature Textures
Avoid flat UI. Use **The Gradient Anchor**:
*   **Primary CTAs:** A subtle linear gradient from `primary` (#000000) to `primary_container` (#001d31) at 135 degrees. This adds "visual soul" and weight to the brand's primary actions.

---

## 3. Typography: The Editorial Edge
We use a dual-font system to balance technical precision with high-impact communication.

*   **Display & Headlines (Manrope):** This is our "Billboard" font. Use `display-lg` (3.5rem) with tight letter-spacing (`-0.02em`) for hero statements. It conveys the authority of an agency that owns the skyline.
*   **Body & Labels (Inter):** This is our "Technical" font. Inter provides the legibility of a high-end SaaS product. Use `body-md` (0.875rem) for most interface text to keep the layout feeling light and spacious.
*   **The Contrast Rule:** Pair a `display-sm` headline in `on_surface` with a `label-md` uppercase sub-headline in `on_tertiary_container`. The massive difference in scale and weight creates an editorial feel found in premium architecture magazines.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are often a sign of lazy design. In this system, we use light and opacity to define height.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-low` background. The subtle 2% shift in hex value creates a "soft lift" that feels more sophisticated than a shadow.
*   **Ambient Shadows:** If a card must "float" (e.g., a testimonial or a pinned campaign), use an extra-diffused shadow: `shadow-[0px_20px_40px_rgba(25,28,30,0.04)]`. The shadow is a tinted version of `on_surface` at very low opacity.
*   **The Ghost Border:** If accessibility requires a border, use `outline_variant` at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** For navigation bars and floating tooltips, use `surface_container_lowest` at 70% opacity with a `backdrop-blur-md`. This allows the "outdoor" imagery or city-grids to bleed through the UI, softening the layout.

---

## 5. Components: Precision Primitives

### Buttons (The Impact Points)
*   **Primary:** Gradient of `primary` to `primary_container`, `rounded-md` (0.375rem). Text is `on_primary`. No border.
*   **Secondary:** Background of `secondary_container`, text `on_secondary_container`. Transitions to a slightly darker tint on hover.
*   **Tertiary:** Transparent background, `on_surface` text, with a `ghost-border` that only appears on hover.

### Elegant Cards (Campaign & Service Grids)
*   **Rule:** Forbid divider lines.
*   **Style:** Use `surface-container-lowest` backgrounds. Use `spacing-8` (2rem) of internal padding. Images within cards should have a `rounded-sm` (0.125rem) corner to feel like framed posters.

### Accordions (FAQ)
*   Use a `surface-container-low` background for the header. When expanded, the content area shifts to `surface` to create a "recessed" look. Use a plus/minus icon instead of a chevron for a more modern, architectural feel.

### City & Service Grids
*   Instead of a standard 3-column grid, use an **Asymmetric Masonry** layout. This breaks the "template" feel and allows larger, high-performing cities or services to take up more visual real estate.

---

## 6. Do’s and Don’ts

### Do:
*   **Use White Space as a Feature:** Use `spacing-24` (6rem) between major sections. Let the content breathe like a minimalist gallery.
*   **Color as Signpost:** Use `tertiary` (#000000) or `on_tertiary_container` (Teal/Obsidian tones) exclusively for high-trust callouts or "Verified" badges.
*   **Intentional Overlaps:** Let a campaign image bleed slightly over the boundary of its container to create a 3D sense of space.

### Don’t:
*   **Don't use 100% Black:** Even though `primary` is #000000, use it sparingly for text. Prefer `on_surface` (#191c1e) for long-form reading to reduce eye strain.
*   **Don't use heavy shadows:** If a shadow looks like a shadow, it’s too dark. It should look like a natural occlusion of light.
*   **Don't use standard icons:** Avoid generic, thin-line icons. Use "Duotone" icons where the secondary color is a 20% opacity version of the primary color to match our layering philosophy.