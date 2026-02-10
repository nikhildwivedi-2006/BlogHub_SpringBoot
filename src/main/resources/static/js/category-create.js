document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("category-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const catName = document.getElementById("catName").value.trim();
    const descr = document.getElementById("descr").value.trim();

    if (!catName) {
      showAlert("Category name is required!", "error");
      return;
    }

    try {
      await apiPost("http://localhost:8082/api/categories", { catName, descr });
      showAlert("✅ Category created successfully!", "success");
      form.reset();
      setTimeout(() => (window.location.href = "categories.html"), 1000);
    } catch (error) {
      showAlert(`❌ Failed to create category. ${error.message}`, "error");
    }
  });
});

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;
}
