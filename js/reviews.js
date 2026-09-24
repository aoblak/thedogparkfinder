// Session-only review UI. No backend or persistence.
document.getElementById("review-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("review-name");
  const location = document.getElementById("review-location");
  const rating = document.getElementById("review-rating");
  const report = document.getElementById("review-text");
  const required = [name, location, rating, report];
  let valid = true;

  required.forEach(field => {
    const error = document.querySelector(`[data-error-for="${field.id}"]`);
    if (!field.value.trim()) {
      if (error) error.textContent = "Required field.";
      valid = false;
    } else if (error) {
      error.textContent = "";
    }
  });
  if (!valid) return;

  const article = document.createElement("article");
  article.className = "review-card";
  const header = document.createElement("div");
  header.className = "review-header";
  const reviewName = document.createElement("div");
  reviewName.className = "review-name";
  reviewName.textContent = name.value;
  const reviewRating = document.createElement("div");
  reviewRating.className = "review-rating";
  reviewRating.textContent = "★".repeat(Number(rating.value));
  header.append(reviewName, reviewRating);
  const meta = document.createElement("div");
  meta.className = "review-meta";
  meta.textContent = location.value + " • session-only";
  const text = document.createElement("p");
  text.className = "review-text";
  text.textContent = report.value;
  article.append(header, meta, text);

  const list = document.getElementById("reviews-list");
  document.getElementById("review-placeholder")?.remove();
  list?.prepend(article);

  const success = document.getElementById("review-success");
  if (success) success.textContent = "Displayed in this browser session only. Nothing was sent or persisted.";

  name.value = "";
  location.value = "";
  rating.value = "";
  report.value = "";
});
