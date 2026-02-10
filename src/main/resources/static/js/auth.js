// auth.js - Session Authentication Helper

// Check if user is logged in
function isLoggedIn() {
  return sessionStorage.getItem("userId") !== null;
}

// Get current user info
function getCurrentUser() {
  return {
    userId: sessionStorage.getItem("userId"),
    userName: sessionStorage.getItem("userName"),
    email: sessionStorage.getItem("userEmail"),
    role: sessionStorage.getItem("userRole"),
  };
}

// API Call Wrapper - Sabse Important Function
async function apiCall(url, options = {}) {
  // Default headers setup
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    ...options,
    headers: headers,
    credentials: "include", // <--- YAHI MAGIC HAI: Ye JSESSIONID cookie backend ko bhejta hai
  };

  try {
    const response = await fetch(url, config);

    // Agar user logged in nahi hai (Session expire ho gaya)
    if (response.status === 401 || response.status === 403) {
      sessionStorage.clear();
      window.location.href = "login.html";
      return null;
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Logout function
async function logout() {
  await apiCall("http://localhost:8082/api/auth/logout", { method: "POST" });
  sessionStorage.clear();
  window.location.href = "login.html";
}
