# Project state

Project: aoblak/thedogparkfinder

Stable repository ID: github:1096360692

Goal: Keep the lightweight/static NERA benchmark aligned with the shared OOS web page contract without duplicating the WordPress editorial runtime.

Application lifecycle: BUILDING.

Review status: NEEDS-REVIEW for live deployment and real-world place evidence. Static benchmark behavior and public-safe architecture are under active review.

Inspected base revision: `5cd660849ec26ada2dc2d780521b155608c05279`.

Current evidence:
- This repository is the lightweight static NERA benchmark, not the canonical WordPress NERA application.
- OOS Editorial Engine 1.1.0 and the shared NERA/ArcaNina page contract are merged in `aoblak/oblak-operating-system@9cc6fbe0b840e02dddea92bd37b018b3dc4c716e`.
- Static park records remain benchmark fixtures unless an item has a separate evidence record. The static UI does not render a VITA Verified badge.
- The contribution form has no persistence/backend; session entries are browser-session UI only.

Context availability: present. Product deployment remains independently verified provider/runtime state.

Canonical shorthand: the accepted glossary defines MJ, PJ, XJ, UM, FMU, GS and SOT. GS means Git State.

Next action: review and merge the shared-web-contract branch, then connect a canonical public Field Notes URL only after the WordPress editorial endpoint is deployed and verified.
