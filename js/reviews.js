// ==========================================================
// Review form – simple client-side validation + local display
// No backend yet
// ==========================================================

document.getElementById("review-form")?.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("review-name");
  const loc = document.getElementById("review-location");
  const rating = document.getElementById("review-rating");
  const text = document.getElementById("review-text");

  let valid = true;

  [name, loc, rating, text].forEach(field => {
    const err = document.querySelector(`[data-error-for="${field.id}"]`);
    if (!field.value.trim()) {
      err.textContent = "Required field.";
      valid = false;
    } else {
      err.textContent = "";
    }
  });

  if (!valid) return;

  const success = document.getElementById("review-success");
  success.textContent = "Review submitted (stored locally). Backend not active yet.";

  // Append locally for now
  const list = document.getElementById("reviews-list");
  list.innerHTML =
    `<article class="review-card">
       <div class="review-header">
         <div class="review-name">${name.value}</div>
         <div class="review-rating">${"★".repeat(rating.value)}</div>
       </div>
       <div class="review-meta">${loc.value} • now</div>
       <p class="review-text">${text.value}</p>
     </article>` + list.innerHTML;

  // Reset
  name.value = "";
  loc.value = "";
  rating.value = "";
  text.value = "";
});
