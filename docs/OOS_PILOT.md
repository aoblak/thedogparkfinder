# OOS Read-Only Pilot

## Objective

Use The Dog Park Finder as NERA's lowest-complexity integration surface to validate the OOS gateway, policy and audit model before granting broader capabilities to production surfaces.

## Design constraints

1. Preserve the static site as a working control implementation.
2. OOS failure must not prevent core park discovery from loading.
3. The browser is an untrusted client.
4. No privileged token or administrative capability may be shipped to the client.
5. Every OOS capability exposed to this surface is explicitly allow-listed.
6. Pilot changes must be reversible.

## Phase 0 — baseline

Capture before/OOS measurements:

- page weight and request count;
- Core Web Vitals / Lighthouse where available;
- search latency;
- search-result relevance test set;
- error rate;
- accessibility checks;
- SEO/indexability checks;
- operational steps required to deploy and maintain the site.

## Phase 1 — adapter

Introduce a small client adapter with:

- configurable gateway URL;
- timeout;
- normalized response envelope;
- explicit error handling;
- static/local fallback;
- no embedded secrets.

No production endpoint is assumed until an OOS gateway contract is approved.

## Phase 2 — read-only capabilities

Candidate capabilities:

- `parks.search`
- `parks.rank`
- `parks.read`
- `telemetry.observe`

Audit is performed server-side by the gateway/policy layer rather than trusted to browser code.

## Phase 3 — controlled comparison

Run the same scenarios against:

- HTML baseline;
- HTML + OOS;
- NERA primary platform + OOS, when available.

Measure whether OOS improves search quality, content/data freshness, observability or maintainability and quantify the latency/complexity cost.

## Acceptance gates

The pilot passes only if:

- baseline operation still works with OOS disabled or unreachable;
- no privileged credentials are present in client assets;
- only allow-listed read operations are reachable;
- malformed/oversized inputs are rejected;
- responses are schema-validated;
- audit records contain no unnecessary personal data;
- latency and availability remain within an agreed budget;
- documented rollback is tested.

## Capability escalation

`WRITE`, `DELETE`, `EXEC`, `DEPLOY` and administrative operations are prohibited during this pilot.

Any future write capability requires a separate threat model, authorization design, sandbox boundary, review gate and rollback procedure.

## Open dependencies

The following are intentionally not invented in this repository:

- canonical OOS gateway URL;
- authentication mechanism;
- final API schema;
- rate limits;
- retention policy for audit/telemetry;
- production SLO/latency budget.

These must come from the canonical OOS implementation/governance before production wiring.
