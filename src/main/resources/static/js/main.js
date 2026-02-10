// main.js - Simple shared functions

// Theme toggle
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  const themeIcon = document.querySelector(".theme-toggle i");
  if (themeIcon) {
    themeIcon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  const themeIcon = document.querySelector(".theme-toggle i");
  if (themeIcon) {
    themeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// Simple API GET (with session cookies)
async function apiGet(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' // ← Important: Send cookies with request
  });
  
  if (response.status === 401 || response.status === 403) {
    window.location.href = 'login.html';
    return null;
  }
  
  if (!response.ok) throw new Error('Request failed');
  return await response.json();
}

// Simple API POST (with session cookies)
async function apiPost(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ← Important: Send cookies with request
    body: JSON.stringify(data)
  });
  
  if (response.status === 401 || response.status === 403) {
    window.location.href = 'login.html';
    return null;
  }
  
  if (!response.ok) throw new Error('Request failed');
  return await response.json();
}

// Simple API DELETE (with session cookies)
async function apiDelete(url) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include' // ← Important: Send cookies with request
  });
  
  if (response.status === 401 || response.status === 403) {
    window.location.href = 'login.html';
    return null;
  }
  
  if (!response.ok) throw new Error('Request failed');
  return true;
}

// Simple API PUT (with session cookies)
async function apiPut(url, data) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ← Important: Send cookies with request
    body: JSON.stringify(data)
  });
  
  if (response.status === 401 || response.status === 403) {
    window.location.href = 'login.html';
    return null;
  }
  
  if (!response.ok) throw new Error('Request failed');
  return await response.json();
}

// Show toast notification
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Update navbar with user info
function updateNavbar() {
  const userName = sessionStorage.getItem('userName');
  const userRole = sessionStorage.getItem('userRole');
  
  if (!userName) return;

  // Add user info to navbar
  const navActions = document.querySelector('.nav-actions');
  if (navActions) {
    navActions.innerHTML = `
      <span style="color: var(--text-primary); margin-right: 10px;">
        👤 ${userName} ${userRole === 'ADMIN' ? '(Admin)' : ''}
      </span>
      <button onclick="logout()" class="btn-primary btn-sm">Logout</button>
    `;
  }
}

// Logout function - calls backend to invalidate session
async function logout() {
  try {
    // Call backend logout endpoint to invalidate session
    await fetch('http://localhost:8082/api/auth/logout', {
      method: 'POST',
      credentials: 'include' // Send session cookie
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  // Clear frontend session data
  sessionStorage.clear();
  window.location.href = 'login.html';
}

// Check if user is admin
function isAdmin() {
  return sessionStorage.getItem('userRole') === 'ADMIN';
}

// Hide elements for non-admin users
function applyRoleBasedUI() {
  if (!isAdmin()) {
    // Hide admin-only elements
    document.querySelectorAll('.admin-only').forEach(el => {
      el.style.display = 'none';
    });
  }
}
