document.addEventListener("DOMContentLoaded", async () => {
  await loadCategories();

  //Attach live search
  const searchInput = document.getElementById("search-category");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterCategories(e.target.value);
    });
  }
});

let allCategories = [];

//Fetch categories from backend
async function loadCategories() {
  const container = document.getElementById("categories-list");
  if (!container) return;

  try {
    container.innerHTML = `
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i> Loading categories...
      </div>`;

    const categories = await apiGet("http://localhost:8082/api/categories");
    allCategories = categories;
    displayCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    container.innerHTML = `<p style="color:red;text-align:center;">⚠ Failed to load categories</p>`;
  }
}

//Render categories in DOM
function displayCategories(categories) {
  const container = document.getElementById("categories-list");
  if (!container) return;

  container.innerHTML = "";

  if (!categories || categories.length === 0) {
    container.innerHTML = `<p style="text-align:center;">No categories found</p>`;
    return;
  }

  categories.forEach((category) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <h3>${category.catName}</h3>
      <p>${category.descr || "No description available"}</p>
      <span>${category.posts ? category.posts.length : 0} posts</span>
      <button class="delete-btn" data-id="${category.id}">
        🗑 Delete
      </button>
    `;
    container.appendChild(card);
  });

  //Attach delete events AFTER rendering
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      await deleteCategory(id);
    });
  });
}

//Search filter
function filterCategories(query) {
  const filtered = allCategories.filter((cat) =>
    cat.catName.toLowerCase().includes(query.toLowerCase())
  );
  displayCategories(filtered);
}

//Reusable GET function
async function apiGet(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
  return response.json();
}

async function deleteCategory(catId) {
  if (!confirm("Are you sure you want to delete this category?")) return;

  try {
    const response = await fetch(
      `http://localhost:8082/api/categories/${catId}`,
      { method: "DELETE" }
    );

    if (!response.ok) throw new Error("Failed to delete category");

    showToast("✅ Category deleted successfully!");
    await loadCategories(); // reload updated list
  } catch (error) {
    console.error("Error deleting category:", error);
    showToast("❌ Failed to delete category.", "error");
  }
}

//Simple toast display (you already have <div id="toast"></div> in HTML)
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.backgroundColor = type === "error" ? "#ff4d4f" : "#4CAF50";
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
