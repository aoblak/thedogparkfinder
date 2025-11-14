// ==========================================================
// Load parks.json + expose global "PARKS" array
// ==========================================================

window.PARKS = [];

fetch("data/parks.json")
  .then(r => r.json())
  .then(data => {
    window.PARKS = data;
    console.log("Loaded parks:", PARKS.length);
  })
  .catch(err => {
    console.error("Error loading parks.json:", err);
  });
