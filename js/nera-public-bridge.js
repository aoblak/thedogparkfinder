/* NERA public data bridge v0.1 — static-site safe, read only.
 * The endpoint is disabled until its origin has been independently verified.
 * Use only an approved PUBLIC endpoint, never an administrative OOS gateway.
 */
(function (root) {
  "use strict";
  const LOCAL_PARKS = "data/parks.json";
  const MAX_PARKS = 1000;
  const MAX_PARTNERS = 100;
  const TIMEOUT_MS = 6000;
  const allowedEvidence = new Set(["verified", "observed", "unverified", "demo_unverified"]);
  let config = { publicApiBase: null };

  function configure(options) {
    const url = options && options.publicApiBase;
    if (url === null || url === "" || url === undefined) {
      config.publicApiBase = null;
      return;
    }
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.search || parsed.hash) {
      throw new Error("Public API must be a plain HTTPS origin/base path");
    }
    config.publicApiBase = parsed.href.replace(/\\/$/, "");
  }
  async function readJSON(url) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(url, { signal: controller.signal, credentials: "omit", mode: "cors", headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("HTTP " + response.status);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  function boundedText(value, max) {
    return typeof value === "string" ? value.slice(0, max) : "";
  }
  function evidence(value) {
    return allowedEvidence.has(value) ? value : "unverified";
  }
  function normalizePark(p) {
    if (!p || typeof p !== "object") return null;
    const latitude = Number(p.latitude ?? p.lat);
    const longitude = Number(p.longitude ?? p.lng);
    if (!Number.isFinite(latitude) || Math.abs(latitude) > 90 || !Number.isFinite(longitude) || Math.abs(longitude) > 180) return null;
    const id = boundedText(String(p.id ?? ""), 90);
    const name = boundedText(p.name, 180);
    if (!id || !name) return null;
    return { id, name, city: boundedText(p.city, 120), country: boundedText(p.country, 120),
      latitude, longitude, fenced: p.fenced === true, water: p.water === true, shade: p.shade === true,
      surface: boundedText(p.surface, 100), evidence_status: evidence(p.evidence_status),
      evidence_ref: boundedText(p.evidence_ref, 300) || null };
  }
  function normalizePartner(p) {
    if (!p || typeof p !== "object" || p.public !== true || p.approved !== true) return null;
    const id = boundedText(String(p.id ?? ""), 90);
    const name = boundedText(p.name, 180);
    if (!id || !name) return null;
    let website = null;
    try {
      if (p.website) {
        const u = new URL(p.website);
        if (u.protocol === "https:" || u.protocol === "http:") website = u.href;
      }
    } catch (_) {}
    return { id, name, category: boundedText(p.category, 80),
      pet_policy: p.pet_policy === "confirmed" ? "confirmed" : "unknown",
      evidence_status: evidence(p.evidence_status),
      sponsored: p.sponsored === true, website };
  }
  function unwrap(value) { return Array.isArray(value) ? value : (value && Array.isArray(value.items) ? value.items : []); }
  async function loadParks() {
    if (config.publicApiBase) {
      try {
        const raw = unwrap(await readJSON(config.publicApiBase + "/parks"));
        return { source: "public-api", items: raw.slice(0, MAX_PARKS).map(normalizePark).filter(Boolean) };
      } catch (_) { /* Preserve static baseline offline. */ }
    }
    const raw = unwrap(await readJSON(LOCAL_PARKS));
    return { source: "local-fixture", items: raw.slice(0, MAX_PARKS).map(normalizePark).filter(Boolean) };
  }
  async function loadPartners(parkId) {
    if (!config.publicApiBase || !/^[a-zA-Z0-9_-]{1,90}$/.test(String(parkId))) {
      return { source: "disabled", items: [] };
    }
    try {
      const raw = unwrap(await readJSON(config.publicApiBase + "/parks/" + encodeURIComponent(parkId) + "/partners"));
      return { source: "public-api", items: raw.slice(0, MAX_PARTNERS).map(normalizePartner).filter(Boolean) };
    } catch (_) { return { source: "unavailable", items: [] }; }
  }
  root.NERA_BRIDGE = Object.freeze({ configure, loadParks, loadPartners, normalizePark, normalizePartner });
})(window);
