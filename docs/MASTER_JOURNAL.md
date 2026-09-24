# Local context journal

Role: Controlled repository-local handoff journal for OOS Context Protocol v0.1. The canonical portfolio MJ and authoritative project journals remain separately located in `docs/INDEX.json`.

This reusable template contains no reconstructed historical events. Append verified observations and changes using the event format in [Governance](GOVERNANCE.md); preserve recording time separately from event time. Recovering a reference to an artifact is not recovering its payload.

<!-- oos:event {"id": "CTX-20260908-001", "recorded_at": "2026-09-08T15:48:11+00:00", "occurred_at": "2026-09-08T15:48:11+00:00", "actor": "Codex", "topics": ["context", "bootstrap", "governance"], "status": "VERIFIED", "visibility": "PUBLIC"} -->
## CTX-20260908-001 — OOS context package integrity verified
Summary: Added or integrated standardized context documents, a machine-readable index and validation. This event verifies the local context change; it makes no application/deployment or full-history recovery claim.
Sources: aoblak/thedogparkfinder@d3beada6d09456a5a4765ff94b6f2c053dd8fd0a; accepted OOS governance glossary@a165ad489a34c8def8f8bd819d4fa35d3bec0d88; scripts/oos_context.py; tests/test_oos_context.py.
Integrity: PASS — required files and journal locators checked by scripts/oos_context.py; hashes regenerated and read back.
Independent: PASS — accepted governance read at the recorded source revision; target file paths checked against its Git tree.
Adverse: PASS — 16 regression checks cover lost files, stale hashes, private/public labels, ambiguous events, symlinks and conflicting writer locks.
Rollback: Revert this context change as a Git commit; preserve unrelated commits and earlier journal history.
Next: Verify repository branch/merge state before reporting adoption; application and deployment status remain independently verified facts.
<!-- /oos:event -->

<!-- oos:event {"id":"WEB-20260924-001","recorded_at":"2026-09-24T23:13:00+02:00","occurred_at":null,"actor":"ChatGPT","topics":["architecture","editorial","evidence","security"],"status":"VERIFIED","visibility":"PUBLIC"} -->
## WEB-20260924-001 — Shared web architecture applied to static NERA benchmark
Summary: Aligned the static NERA benchmark with the shared OOS page contract and made its evidence boundary explicit.
Sources: aoblak/thedogparkfinder@5cd660849ec26ada2dc2d780521b155608c05279; aoblak/oblak-operating-system@9cc6fbe0b840e02dddea92bd37b018b3dc4c716e; GitHub Issue #8.
Integrity: PASS — product files and context documents were generated as one bounded Git change; context hashes and journal locators were regenerated deterministically.
Independent: PASS — the resulting static-site responsibilities were compared with the merged shared OOS contract and the existing client-side search/review implementation.
Adverse: PASS — unsupported public ratings/review examples were removed from presentation, fixture status is explicit, VITA/Field Notes deployment is not fabricated, and user-entered review text is inserted with textContent rather than innerHTML.
Rollback: Revert the feature branch/PR commit; no production deployment or external data mutation is performed by this change.
Next: Review and merge the branch; connect the canonical Field Notes endpoint only after verified WordPress deployment evidence exists.
<!-- /oos:event -->
