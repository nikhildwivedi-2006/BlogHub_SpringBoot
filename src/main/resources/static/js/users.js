document.addEventListener("DOMContentLoaded", async () => {
  await loadUsers();
});

async function loadUsers() {
  try {
    const users = await apiGet("http://localhost:8082/api/users");
    displayUsers(users);
  } catch {
    showAlert("❌ Failed to load users.", "error");
  }
}

function displayUsers(users) {
  const container = document.getElementById("users-list");
  container.innerHTML = "";

  if (!users || users.length === 0) {
    container.innerHTML = "<p>No users found</p>";
    return;
  }

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
    <h3>${user.name}</h3>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>About:</strong> ${user.about || "N/A"}</p>
    <p class="user-post-count">📝 ${
      user.posts ? user.posts.length : 0
    } Posts</p>
    <div class="user-actions">
      <button onclick="deleteUser(${user.id})" class="btn btn-danger">
        <i class="fas fa-trash"></i> Delete
      </button>
    </div>
  `;
    container.appendChild(card);
  });
}
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;
  try {
    await apiDelete(`http://localhost:8082/api/users/${id}`);
    showAlert("✅ User deleted successfully!", "success");
    setTimeout(loadUsers, 500);
  } catch {
    showAlert("❌ Failed to delete user.", "error");
  }
}

// API helpers
async function apiGet(url) {
  const res = await fetch(url);
  return res.json();
}

async function apiDelete(url) {
  await fetch(url, { method: "DELETE" });
}

function showAlert(msg, type) {
  document.getElementById(
    "alert-container"
  ).innerHTML = `<p class="${type}">${msg}</p>`;
}
