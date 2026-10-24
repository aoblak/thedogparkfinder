# NERA public bridge integration contract (draft v0.1)

Branch: `feat/nera-public-bridge-20261025`. This is a **non-production** read-only frontend integration.

## What changed
- `js/nera-public-bridge.js` exports `window.NERA_BRIDGE`.
- `index.html` loads it before `js/parks-loader.js`.
- Existing `window.PARKS` continues to work; `nera:parks-ready` and `nera:parks-error` events signal completion.
- By default **no remote endpoint is configured**. The app continues to read `data/parks.json` and preserves the `demo_unverified` evidence status.

## Optional endpoint activation (only after OOS public API security and CORS verification)
Configure before `parks-loader.js`:
```html
<script src="js/nera-public-bridge.js"></script>
<script>
NERA_BRIDGE.configure({publicApiBase: "https://PUBLIC-API-HOST.example/nera/v1"});
</script>
<script src="js/parks-loader.js"></script>
```
This example host is intentionally **not** an existing service. Do not use an admin gateway, private Worker route, or expose an API key.

## API contract
`GET /parks` -> either `[{...}]` or `{"items":[{...}]}`

Park minimum:
```json
{"id":"hr-pu-test","name":"Example park","city":"Pula","country":"Croatia",
"latitude":44.87,"longitude":13.85,"evidence_status":"unverified","evidence_ref":null}
```

`GET /parks/{park_id}/partners` -> array or `{"items":[...]}`

Partner minimum:
```json
{"id":"partner-example","name":"Example pet shop","category":"pet_store",
"public":true,"approved":true,"pet_policy":"unknown",
"evidence_status":"unverified","sponsored":false,
"website":"https://example.org"}
```

Only approved public partner records may be returned. The bridge itself also filters unapproved entries. No CRM contacts, draft emails, scoring details, personal information, secrets or administrative capabilities may be exposed.

## Failures and provenance
- Remote parks request times out after six seconds; fallback uses local static JSON.
- Invalid park coordinates / names / IDs are discarded.
- Unrecognized evidence status becomes `unverified`.
- Partners default to `pet_policy: unknown`, never assumed dog-friendly.
- Review fixtures are not verified public reviews.
- API-side caching, attribution, Google Places policy compliance, CORS, auth boundaries, and schema versioning require verification **before** enabling remote mode.
- Current v0.1 partner endpoint is an adapter only: there is no partner display connected to the frontend yet.

## Manual smoke checks (not yet executed)
1. Serve local site over HTTP. Search Zagreb. Check existing fixture result.
2. In DevTools ensure `PARKS_SOURCE === 'local-fixture'` and first item evidence remains `demo_unverified`.
3. Configure a mock public read-only API in a test environment; verify event `nera:parks-ready`.
4. Make API unavailable; assert fixture fallback works and secrets are absent from browser requests.
5. Call `loadPartners` with approved/unapproved records and check only approved records survive.
6. Verify keyboard/mobile interface and that no map, geolocation, or marketing SDK loads unexpectedly.

## Open gates
- Confirm real OOS public read-only API origin and contract.
- Add contract tests and live browser smoke tests.
- Add partner presentation only after public API data quality and legal review.
- Obtain independent approval before merge/deploy.
