// ==========================================================
// Near-me search + text search
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

function renderResults(list) {
  const container = document.getElementById("park-results");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = "<p>No parks found.</p>";
    return;
  }

  container.innerHTML = list
    .map(p => `
      <div class="result-card">
        <div class="result-title">${p.name}</div>
        <div class="result-meta">${p.city}, ${p.country}</div>
        <div class="result-meta">Rating ★ ${p.rating}</div>
        <div class="result-meta-muted">${p.surface}, fenced: ${p.fenced}</div>
      </div>
    `)
    .join("");
}

document.getElementById("use-location-btn")?.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const sorted = window.PARKS
      .map(p => ({
        ...p,
        distance: distanceKm(lat, lon, p.latitude, p.longitude)
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 15);

    renderResults(sorted);
  });
});

document.getElementById("search-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const q = document.getElementById("location-input").value.toLowerCase();
  const list = window.PARKS.filter(p =>
    p.city.toLowerCase().includes(q) ||
    p.country.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q)
  );
  renderResults(list.slice(0, 20));
});
