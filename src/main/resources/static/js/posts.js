// document.addEventListener("DOMContentLoaded", async () => {
//   await loadPosts();
//   document
//     .getElementById("search-term")
//     .addEventListener("input", (e) => filterPosts(e.target.value));
// });

// let allPosts = [];

// async function loadPosts() {
//   const posts = await apiGet("http://localhost:8082/api/posts");
//   allPosts = posts;
//   displayPosts(posts);
// }

// function displayPosts(posts) {
//   const container = document.getElementById("posts-list");
//   container.innerHTML = "";
//   if (!posts || posts.length === 0) {
//     container.innerHTML = "<p>No posts found</p>";
//     return;
//   }

//   posts.forEach((post) => {
//     const card = document.createElement("div");
//     card.className = "post-card";
//     // Make entire card clickable
//     card.onclick = () => {
//       window.location.href = `post.html?id=${post.id}`;
//     };
//     card.innerHTML = `
//     <div class="post-info">
//       <div class="post-meta">
//         <span class="post-category">${post.categoryName}</span>
//         <span class="post-date">${
//           post.createdAt
//             ? new Date(post.createdAt.split(".")[0]).toLocaleDateString(
//                 "en-GB",
//                 {
//                   day: "2-digit",
//                   month: "long",
//                   year: "numeric",
//                 }
//               )
//             : "Unknown date"
//         }</span>
//       </div>
//       <h3 class="post-title">${post.title}</h3>
//       <p class="post-excerpt">${post.content.substring(0, 120)}...</p>
//       <div class="post-actions">
//         <button class="btn btn-edit" onclick="event.stopPropagation(); editPost(${
//           post.id
//         })">
//         <i class="fas fa-edit"></i> Edit
//       </button>
//       <button class="btn btn-danger" onclick="event.stopPropagation(); deletePost(${
//         post.id
//       })">
//         <i class="fas fa-trash"></i> Delete
//       </button>
//       </div>
//     </div>
//   `;
//     container.appendChild(card);
//   });
// }

// function filterPosts(query) {
//   const filtered = allPosts.filter(
//     (post) =>
//       post.title.toLowerCase().includes(query.toLowerCase()) ||
//       post.content.toLowerCase().includes(query.toLowerCase())
//   );
//   displayPosts(filtered);
// }

// async function deletePost(id) {
//   if (!confirm("Are you sure you want to delete this post?")) return;
//   try {
//     await apiDelete(`http://localhost:8082/api/posts/${id}`);
//     showToast("✅ Post deleted successfully!", "success");
//     loadPosts();
//   } catch (err) {
//     console.error("Delete error:", err);
//     showToast("❌ Failed to delete post!", "danger");
//   }
// }

// function editPost(id) {
//   window.location.href = `post-update.html?id=${id}`;
// }

// // API helpers
// async function apiGet(url) {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("Failed to fetch");
//   return res.json();
// }

// async function apiDelete(url) {
//   const res = await fetch(url, { method: "DELETE" });
//   if (!res.ok) throw new Error("Failed to delete");
// }

//For Pagination & Sorting Functionality
document.addEventListener("DOMContentLoaded", async () => {
  await loadPosts();

  document
    .getElementById("search-term")
    .addEventListener("input", (e) => filterPosts(e.target.value));

  document.getElementById("sort-select").addEventListener("change", (e) => {
    const [field, dir] = e.target.value.split(",");
    sortBy = field;
    sortDir = dir;
    currentPage = 0;
    loadPosts();
  });
});

let allPosts = [];
let currentPage = 0;
let pageSize = 3;
let sortBy = "createdAt";
let sortDir = "desc";

// Load posts from API with pagination & sorting
async function loadPosts() {
  try {
    const url = `http://localhost:8082/api/posts?page=${currentPage}&size=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`;
    const data = await apiGet(url);

    allPosts = data.content; // Array of PostDto
    displayPosts(allPosts);
    renderPagination(data);
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

// Display posts on page
function displayPosts(posts) {
  const container = document.getElementById("posts-list");
  container.innerHTML = "";
  if (!posts || posts.length === 0) {
    container.innerHTML = "<p>No posts found</p>";
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.onclick = () => {
      window.location.href = `post.html?id=${post.id}`;
    };
    card.innerHTML = `
      <div class="post-info">
        <div class="post-meta">
          <span class="post-category">${post.categoryName}</span>
          <span class="post-date">${
            post.createdAt
              ? new Date(post.createdAt.split(".")[0]).toLocaleDateString(
                  "en-GB",
                  { day: "2-digit", month: "long", year: "numeric" }
                )
              : "Unknown date"
          }</span>
        </div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.content.substring(0, 120)}...</p>
        <div class="post-actions">
          <button class="btn btn-edit" onclick="event.stopPropagation(); editPost(${
            post.id
          })">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn-danger" onclick="event.stopPropagation(); deletePost(${
            post.id
          })">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Filter posts by search query
function filterPosts(query) {
  const filtered = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  );
  displayPosts(filtered);
}

// Delete a post
async function deletePost(id) {
  if (!confirm("Are you sure you want to delete this post?")) return;
  try {
    await apiDelete(`http://localhost:8082/api/posts/${id}`);
    showToast("✅ Post deleted successfully!", "success");
    loadPosts();
  } catch (err) {
    console.error("Delete error:", err);
    showToast("❌ Failed to delete post!", "danger");
  }
}

// Edit post
function editPost(id) {
  window.location.href = `post-update.html?id=${id}`;
}

// Render pagination buttons
function renderPagination(pageData) {
  const container = document.getElementById("pagination");
  container.innerHTML = "";
  for (let i = 0; i < pageData.totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i + 1;
    btn.className = i === pageData.number ? "active" : "";
    btn.style.margin = "0 6px";
    btn.onclick = () => {
      currentPage = i;
      loadPosts();
    };
    container.appendChild(btn);
  }
}

// API helpers
async function apiGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function apiDelete(url) {
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
}
