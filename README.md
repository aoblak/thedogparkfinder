# The Dog Park Finder

A lightweight, mobile-friendly website for finding dog parks.

The public version is intentionally simple: static HTML, CSS and JavaScript with local park data. It is fast, easy to host and useful as a baseline before adding maps, accounts or heavier platform features.

## Current status

Working public baseline. The data set and location coverage are still being expanded and verified.

## What works today

- dog-park listings from local structured data
- browser-based distance search
- responsive static pages
- pricing, advertiser and partner information
- deployment without a database or privileged backend

## Project structure

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

## Why it stays lightweight

The Dog Park Finder is part of the broader NERA product direction, but it is not the main NERA application. Keeping this version small makes it useful for testing:

- search quality
- page speed
- mobile usability
- structured data and discoverability
- whether a proposed integration creates enough value to justify its complexity

## Security baseline

- no private keys or privileged credentials in browser code
- no direct browser access to administrative systems
- external services must be optional and narrowly scoped
- the site must continue working when an integration is unavailable

## Run locally

Serve the repository as a static website. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## License

MIT, subject to final project-wide review.
