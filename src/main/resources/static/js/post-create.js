document.addEventListener("DOMContentLoaded", async () => {
  await loadCategories();
  await loadAuthors();

  document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    await createPost();
  });
});

async function loadCategories() {
  try {
    const categories = await apiGet("http://localhost:8082/api/categories");
    const categorySelect = document.getElementById("category");
    categorySelect.innerHTML = `<option value="">-- Select Category --</option>`;
    categories.forEach((cat) => {
      categorySelect.innerHTML += `<option value="${cat.id}">${cat.catName}</option>`;
    });
  } catch (err) {
    console.error("Category Load Error:", err);
    showToast("⚠️ Failed to load categories.", "warning");
  }
}

async function loadAuthors() {
  try {
    const authors = await apiGet("http://localhost:8082/api/users");
    const authorSelect = document.getElementById("author");
    authorSelect.innerHTML = `<option value="">-- Select Author --</option>`;
    authors.forEach((author) => {
      authorSelect.innerHTML += `<option value="${author.id}">${author.name}</option>`;
    });
  } catch (err) {
    console.error("Author Load Error:", err);
    showToast("⚠️ Failed to load authors.", "warning");
  }
}

async function createPost() {
  const categoryId = parseInt(document.getElementById("category").value);
  const authorId = parseInt(document.getElementById("author").value);

  if (!categoryId || !authorId) {
    showToast("⚠️ Please select both category and author.", "warning");
    return;
  }

  const post = {
    title: document.getElementById("title").value,
    content: document.getElementById("content").value,
    categoryId: categoryId,
    authorId: authorId,
  };

  try {
    await apiPost("http://localhost:8082/api/posts", post);
    showToast("✅ Post created successfully", "success");

    document.getElementById("post-form").reset();
    setTimeout(() => (window.location.href = "posts.html"), 1000);
  } catch (err) {
    console.error("Post Creation Error:", err);
    showToast("❌ Failed to create post.", "danger");
  }
}

//API Helpers
async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed GET: ${res.status}`);
  return res.json();
}

async function apiPost(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed POST: ${res.status}`);
  return res.json();
}
