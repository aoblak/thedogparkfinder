# Project state

Project: aoblak/thedogparkfinder

Stable repository ID: github:1096360692

Goal: Keep the lightweight/static NERA benchmark aligned with the shared OOS web page contract without duplicating the WordPress editorial runtime.

Application lifecycle: BUILDING.

Review status: NEEDS-REVIEW for live deployment and real-world place evidence. Static benchmark behavior and public-safe architecture are under active review.

Reviewed main baseline: `edd1e7098ff138f3b9c03edc2ea7e804795e0113`.

Pending proposal: draft PR #7 (`fix/site-v2.05`), refreshed against that baseline. This branch is not deployed.

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
- CSS root typo and pricing link target repaired in draft PR #7; legacy pricing.htm remains a redirect.
- Existing dark palette and the current benchmark/evidence boundaries retained.
- Browser checks passed across 4 pages × 7 widths, keyboard skip navigation, local links, city search and session-only reports; 16 context tests passed.
- Canonical/og:url, favicon and share-image references await verified origin/assets. Text social metadata is present on the advertiser page.
- Actual iOS/Safari and production runtime remain UNKNOWN. This is local Chromium verification, not a deployment claim.

Next action: verify remote PR #7 head and CI after pushing the reviewed branch, then obtain merge review. Verify the actual custom-domain runtime and connect canonical/Field Notes URLs only after their endpoints are verified.
