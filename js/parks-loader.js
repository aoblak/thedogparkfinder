// NERA static benchmark loader. No remote API is enabled by default.
window.PARKS = [];
window.PARKS_SOURCE = "pending";
const load = window.NERA_BRIDGE
  ? window.NERA_BRIDGE.loadParks()
  : fetch("data/parks.json").then(r => { if (!r.ok) throw new Error("local data unavailable"); return r.json(); }).then(items => ({ source: "local-fixture", items }));
load.then(result => {
  window.PARKS = result.items;
  window.PARKS_SOURCE = result.source;
  window.dispatchEvent(new CustomEvent("nera:parks-ready", { detail: { source: result.source, count: result.items.length } }));
}).catch(err => {
  window.PARKS = [];
  window.PARKS_SOURCE = "unavailable";
  console.error("Parks unavailable:", err);
  window.dispatchEvent(new CustomEvent("nera:parks-error"));
});
