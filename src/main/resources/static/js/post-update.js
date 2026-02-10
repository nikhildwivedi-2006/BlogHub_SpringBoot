document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const form = document.getElementById("update-post-form");
  const alertContainer = document.getElementById("alert-container");

  // Fetch post details to pre-fill form
  async function loadPost() {
    try {
      const res = await fetch(`/api/posts/${postId}`);
      if (!res.ok) throw new Error("Failed to fetch post");
      const post = await res.json();
      document.getElementById("postId").value = post.id;
      document.getElementById("title").value = post.title;
      document.getElementById("content").value = post.content;
    } catch (err) {
      showAlert(err.message, "error");
    }
  }

  // Show alert
  function showAlert(message, type = "success") {
    alertContainer.innerHTML = `<div class="alert-${type}">${message}</div>`;
    setTimeout(() => (alertContainer.innerHTML = ""), 3000);
  }

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    const payload = {
      title,
      content,
    };

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update post");
      }

      showAlert("Post updated successfully!", "success");
      // Redirect to posts.html after 1 second
      setTimeout(() => (window.location.href = "posts.html"), 1000);
    } catch (err) {
      showAlert(err.message, "error");
    }
  });

  // Initial load
  if (postId) loadPost();
});
