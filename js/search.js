// ==========================================================
// Near-me search + text search
// Static baseline remains authoritative fallback.
// ==========================================================

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2)**2 +
    Math.cos(lat1 * Math.PI/180) *
    Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderResults(list) {
  const container = document.getElementById("park-results");
  if (!container) return;

  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = "<p>No parks found.</p>";
    return;
  }

  container.innerHTML = list
    .map(p => `
      <div class="result-card">
        <div class="result-title">${escapeHtml(p.name)}</div>
        <div class="result-meta">${escapeHtml(p.city)}, ${escapeHtml(p.country)}</div>
        <div class="result-meta">Rating ★ ${escapeHtml(p.rating)}</div>
        <div class="result-meta-muted">${escapeHtml(p.surface)}, fenced: ${escapeHtml(p.fenced)}</div>
      </div>
    `)
    .join("");
}

function localTextSearch(query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return [];
  return (window.PARKS || []).filter(p =>
    String(p.city || "").toLowerCase().includes(q) ||
    String(p.country || "").toLowerCase().includes(q) ||
    String(p.name || "").toLowerCase().includes(q)
  ).slice(0, 20);
}

async function textSearch(query) {
  const local = localTextSearch(query);
  if (!window.OOS) return local;

  const remote = await window.OOS.search(String(query || "").trim(), 20);
  const parks = remote?.data?.parks;

  // OOS is advisory in this pilot. Any malformed/error response falls back locally.
  return remote.ok && Array.isArray(parks) ? parks.slice(0, 20) : local;
}

document.getElementById("use-location-btn")?.addEventListener("click", () => {
  if (!navigator.geolocation) {
    renderResults([]);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const sorted = (window.PARKS || [])
        .map(p => ({
          ...p,
          distance: distanceKm(lat, lon, p.latitude, p.longitude)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 15);

      renderResults(sorted);
    },
    () => renderResults([])
  );
});

document.getElementById("search-form")?.addEventListener("submit", async e => {
  e.preventDefault();
  const input = document.getElementById("location-input");
  const q = input?.value || "";
  const results = await textSearch(q);
  renderResults(results);
});
