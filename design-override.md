# Plan: Design Override & Content Preservation

We will override the old pages of the UpGreat World website with the new premium layout and design pattern located in `latest_code/`. To keep the content of the old pages intact, we will integrate them into our static page builder script `build.py`.

## Overview
- **Project Type**: WEB
- **Goal**: Apply the latest theme/design (styles, header, footer, animations, fonts) to all old pages, replacing their Tailwind/old CSS with the new custom minimalist serif/sans layout from `latest_code` while preserving all SEO content, FAQs, copy, and layout structure.

## Success Criteria
- Resolve the current Git merge conflicts cleanly in favor of `latest_code` (Done).
- Identify and map all 16 old HTML pages (`outdoor-advertising.html`, `transit-advertising.html`, etc.).
- Update `build.py` to include templates and page generation calls for all these pages.
- Ensure all pages are dynamically built with the new header and footer (extracted from `index.html`) and the new styling (`style.css`).
- Verify page links and mobile responsiveness.

## Tech Stack
- **Languages**: HTML5, CSS3 (Vanilla), JavaScript, Python (for the build script).
- **Design Tokens**: Obsidian & Ivory, custom serif headlines (`Fraunces`), clean sans body (`Inter`), custom code (`JetBrains Mono`).

## File Structure
- `index.html` — The main homepage (source for header/footer templates).
- `style.css` — The new global stylesheet.
- `script.js` — The new global interactive script.
- `build.py` — The static builder script containing content definitions and page compiler logic.

## Task Breakdown

### Task 1: Map Old Page Content and SEO Data
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`, `clean-code`
- **Action**: Extract the main page title, meta description, meta keywords, primary header, body sections, card info, FAQs, and FAQ Schema from each of the 16 old HTML files.
- **Verification**: Ensure all text content is documented and ready to be loaded by `build.py`.

### Task 2: Refactor `build.py` to Include All Pages
- **Agent**: `backend-specialist`
- **Skills**: `python-patterns`, `clean-code`
- **Action**: Update `build.py` to:
  1. Automate the parsing and content extraction of the old files, OR
  2. Embed their content as structured dictionaries/templates in `build.py` (preferring structured data for easy maintenance).
  3. Compile all 16 pages to their original filenames so links remain active and correct.
- **Verification**: Run `python build.py` and verify that all 16 files are successfully generated.

### Task 3: Ensure Consistent Header/Footer Links
- **Agent**: `frontend-specialist`
- **Skills**: `frontend-design`
- **Action**: Update navigation dropdowns and menus in `index.html` to reference the correct page links (e.g., pointing to `outdoor-advertising.html` instead of `service-ooh.html` if we preserve the original filenames, or vice-versa).
- **Verification**: Check all links in header/footer inside the compiled pages.

---

## Phase X: Verification Checklist
- [ ] Run `python build.py` to generate all pages.
- [ ] No purple/violet hex codes (`#000000`, `#2B29EE` are the brand colors).
- [ ] Verify pages load correctly and responsive styles are active.
- [ ] Commit all changes to Git.
