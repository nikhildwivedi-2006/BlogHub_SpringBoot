document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    document.getElementById("single-post").innerHTML = "<p>Post not found</p>";
    return;
  }

  try {
    const post = await apiGet(`http://localhost:8082/api/posts/${postId}`);

    // Fill in the card fields
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-category").textContent = post.categoryName;
    document.getElementById("post-author").textContent = post.authorName;

    document.getElementById("post-date").textContent = post.createdAt
      ? new Date(post.createdAt).toLocaleString()
      : "N/A";
    document.getElementById("post-content").textContent = post.content;
  } catch (error) {
    console.error("Error loading post:", error);
    document.getElementById("single-post").innerHTML =
      "<p>Error loading post</p>";
  }

  // Back button
  document.getElementById("back-posts").addEventListener("click", () => {
    window.location.href = "posts.html";
  });
});
