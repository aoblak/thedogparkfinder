# Test Matrix

This repository is both a NERA surface and a controlled benchmark. Tests should answer whether a feature improves the product, not merely whether it can be implemented.

| Dimension | Static HTML | HTML + OOS | NERA primary + OOS |
|---|---|---|---|
| Initial load / page weight | Baseline | Measure delta | Measure |
| Park search latency | Baseline | Measure delta | Measure |
| Search relevance | Baseline | Compare | Compare |
| Map/search quality | Baseline | Compare | Compare |
| SEO/indexability | Baseline | Verify no regression | Compare |
| Accessibility | Baseline | Verify no regression | Compare |
| Offline/degraded behavior | Baseline | Must fall back | Define/test |
| Observability | Minimal | OOS audit/telemetry | OOS audit/telemetry |
| Maintenance complexity | Baseline | Measure delta | Measure |
| Security exposure | Baseline | Threat-model gateway | Threat-model |
| Conversion/business KPI | Baseline | A/B when traffic permits | Compare |

## Required security tests

- inspect built/static assets for secrets and privileged tokens;
- reject capabilities outside the allow-list;
- validate and bound all user-controlled query inputs;
- verify CORS/origin policy at the gateway;
- test timeout and unavailable-gateway fallback;
- test malformed and unexpected response payloads;
- confirm telemetry minimization and redaction;
- verify no browser path can invoke administrative OOS operations.

## Regression rule

An OOS-backed feature is not automatically an improvement. If it adds complexity without a measurable product, safety or operational benefit, retain the simpler implementation.
