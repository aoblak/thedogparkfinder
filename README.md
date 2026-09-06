# The Dog Park Finder

**NERA lightweight discovery surface · OOS integration test-bed**

The Dog Park Finder is the deliberately lean, static implementation inside the **NERA — The First Dog OS** ecosystem. It provides a clean HTML/CSS/JavaScript baseline for dog-park discovery and gives NERA a controlled environment for measuring whether additional platform complexity produces measurable value.

> Status: **v2.04 · OOS read-only pilot preparation**

## Product role

The project is not a replacement for NERA and is not scheduled for consolidation into the main NERA implementation.

- **NERA / neardogpark.com** — primary product platform.
- **TheDogParkFinder / thedogparkfinder.com** — lightweight NERA surface, benchmark and integration test-bed.
- **OOS** — optional policy-controlled service layer. The browser remains unprivileged.

Keeping the lightweight implementation separate gives us a useful baseline for performance, UX, SEO, search quality, operational complexity and conversion experiments.

## Architecture

```text
User
  |
  v
Static HTML / CSS / JS
  |
  +---- local parks.json baseline
  |
  +---- OOS Adapter (optional)
             |
             v
        OOS Gateway
             |
        Policy Engine
             |
      allow-listed capabilities
             |
      sanitized response
```

The frontend must never contain privileged OOS credentials, GitHub tokens, filesystem access, deployment credentials or unrestricted execution capabilities.

## OOS pilot scope

The first integration is intentionally **read-only**:

`READ → SEARCH → RANK → OBSERVE → AUDIT`

Explicitly out of scope for the browser pilot:

`WRITE · DELETE · EXEC · DEPLOY · ADMIN`

See [docs/OOS_PILOT.md](docs/OOS_PILOT.md) and [docs/TESTING.md](docs/TESTING.md).

## Current structure

```text
index.html
pricing.html
advertisers.html
partners.html
css/
js/
data/
docs/
```

The current baseline uses `parks.json` and local distance search. Google Maps / Places and OOS-backed capabilities can be evaluated independently without destroying the static baseline.

## Test strategy

We compare three surfaces where applicable:

1. static HTML baseline,
2. static HTML + OOS,
3. primary NERA platform + OOS.

The objective is evidence, not architectural novelty. OOS functionality is retained only when it improves a measurable outcome without unacceptable security, latency or maintenance cost.

## Security baseline

- no secrets in browser-delivered code;
- no direct browser access to privileged OOS capabilities;
- gateway allow-list and input validation;
- least privilege by default;
- auditable requests and decisions;
- graceful fallback to the static experience when OOS is unavailable.

## Deployment

The site remains suitable for static hosting such as GitHub Pages, Cloudflare Pages or Vercel. OOS is attached as an external service and is **not required** for the baseline site to render.

## Governance

Changes to the OOS integration should be small, reversible and benchmarked. Capability expansion requires explicit review after the read-only pilot passes its acceptance criteria.

## License

MIT — subject to final project-wide license review.
