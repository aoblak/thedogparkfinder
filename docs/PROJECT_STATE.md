# Project state

Project: aoblak/thedogparkfinder

Stable repository ID: github:1096360692

Goal: Keep the lightweight/static NERA benchmark aligned with the shared OOS web page contract without duplicating the WordPress editorial runtime.

Application lifecycle: BUILDING.

Review status: VERIFIED for the scoped CSS/navigation/accessibility patch and GitHub Pages served content; NEEDS-REVIEW for custom-domain runtime, native Safari and real-world place evidence.

Integrated product revision: `d64a0da1a9f121f13451ae2cddf48305965f56cd` (PR #7).

PR #7 merged on 2026-10-13 at 11:32:09 UTC. GitHub Pages deployment and served product content are VERIFIED at https://aoblak.github.io/thedogparkfinder/.

Current evidence:
- This repository is the lightweight static NERA benchmark, not the canonical WordPress NERA application.
- OOS Editorial Engine 1.1.0 and the shared NERA/ArcaNina page contract are merged in `aoblak/oblak-operating-system@9cc6fbe0b840e02dddea92bd37b018b3dc4c716e`.
- Static park records remain benchmark fixtures unless an item has a separate evidence record. The static UI does not render a VITA Verified badge.
- The contribution form has no persistence/backend; session entries are browser-session UI only.
- GitHub Actions Jekyll CI run `36061472086` passed for the integrated revision.
- GitHub Pages build/deployment run `36061471317` passed for the integrated revision; this does not by itself verify the custom domain `thedogparkfinder.com`.

Context availability: present. Product deployment remains independently verified provider/runtime state.

Canonical shorthand: the accepted glossary defines MJ, PJ, XJ, UM, FMU, GS and SOT. GS means Git State.

Frontend review evidence (2026-10-13):
- CSS root typo and pricing link target repaired by merged PR #7; legacy pricing.htm remains a redirect.
- Existing dark palette and the current benchmark/evidence boundaries retained.
- Browser checks passed across 4 pages × 7 widths, keyboard skip navigation, local links, city search and session-only reports; 16 context tests passed.
- Canonical/og:url, favicon and share-image references await verified origin/assets. Text social metadata is present on the advertiser page.
- Native iOS/Safari and custom-domain runtime remain UNKNOWN. GitHub Pages served content is verified against the exact tested bytes.

Deployment verification (2026-10-13):
- PR #7 merged; main tree equals the tested review tree.
- Jekyll CI run 38390895021 and Pages deployment run 38390893207 passed for the integrated product revision.
- All five HTML routes and three CSS files served HTTP 200 and matched the tested source bytes exactly.

Next action: verify native Safari/iPhone, the intended custom-domain runtime and contact mailboxes. Connect canonical/Field Notes URLs only after their endpoints are verified; favicon/social images need actual assets.
