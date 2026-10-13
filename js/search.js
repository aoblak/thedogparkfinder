// Near-me and text search over local benchmark fixtures.
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function line(className, value) {
  const node = document.createElement("div");
  node.className = className;
  node.textContent = value;
  return node;
}
function renderResults(list) {
  const container = document.getElementById("park-results");
  if (!container) return;
  container.replaceChildren();
  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No benchmark records found.";
    container.append(empty);
    return;
  }
  list.forEach(place => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.append(
      line("result-title", place.name),
      line("result-meta", place.city + ", " + place.country),
      line("result-meta", "Evidence: benchmark fixture — not verified"),
      line("result-meta-muted", place.surface + ", fenced: " + String(place.fenced))
    );
    container.append(card);
  });
}
document.getElementById("use-location-btn")?.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const sorted = (window.PARKS || []).map(place => ({...place, distance: distanceKm(lat, lon, place.latitude, place.longitude)})).sort((a, b) => a.distance - b.distance).slice(0, 15);
    renderResults(sorted);
  });
});
document.getElementById("search-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const q = document.getElementById("location-input").value.toLowerCase().trim();
  const list = (window.PARKS || []).filter(place => place.city.toLowerCase().includes(q) || place.country.toLowerCase().includes(q) || place.name.toLowerCase().includes(q));
  renderResults(list.slice(0, 20));
});
