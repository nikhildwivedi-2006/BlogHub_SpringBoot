document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  await loadStats();
  loadFeaturedPosts();
});

let allPosts = [];
let allAuthors = [];

// Fetch helper
async function apiGet(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch " + url);
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Toast notification
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Fetch and display stats
async function loadStats() {
  try {
    const posts = await apiGet("http://localhost:8082/api/posts/getAll");
    const authors = await apiGet("http://localhost:8082/api/users");
    const categories = await apiGet("http://localhost:8082/api/categories");

    allPosts = posts || [];
    allAuthors = authors || [];

    document.getElementById("total-posts").innerText = allPosts.length;
    document.getElementById("total-authors").innerText = allAuthors.length;
    document.getElementById("total-categories").innerText = categories.length;
  } catch (error) {
    console.error("Error loading stats:", error);
  }
}

// Display featured posts (top 3)
async function loadFeaturedPosts() {
  const container = document.getElementById("featured-posts-grid");
  if (!container) return;

  if (!allPosts || allPosts.length === 0) {
    await loadStats();
  }

  container.innerHTML = "";

  if (!allPosts || allPosts.length === 0) {
    container.innerHTML = "<p>No posts available</p>";
    return;
  }

  container.innerHTML = allPosts
    .slice(0, 3)
    .map(
      (post) => `
      <div class="post-card" onclick="window.location.href='post.html?id=${post.id}'">
          <div class="post-info">
              <div class="post-meta">
                  <span class="post-category">${post.categoryName || 'Uncategorized'}</span>
                  <span class="post-date">${
                    post.createdAt
                      ? new Date(post.createdAt.split(".")[0]).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "Unknown date"
                  }</span>
              </div>
              <h3 class="post-title">${post.title}</h3>
              <p class="post-excerpt">${post.content.substring(0, 100)}...</p>
              <div class="post-author">
                  <span class="author-name">By ${
                    post.authorName 
                      ? post.authorName.charAt(0).toUpperCase() + post.authorName.slice(1).toLowerCase()
                      : "Unknown"
                  }</span>
              </div>
          </div>
      </div>
      `
    )
    .join("");
}

