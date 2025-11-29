// Menu toggle 
const openMenuBtn = document.getElementById("openMenuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

// Show menu
openMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
});

// Hide menu
closeMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
});

// Elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const preferredCurrency = document.getElementById("preferredCurrency");
const themeToggle = document.getElementById("themeToggle");
const body = document.getElementById("body");
const resetBtn = document.getElementById("resetBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Load saved profile data
document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userProfile")) || {};
  nameInput.value = userData.name || "";
  emailInput.value = userData.email || "";
  preferredCurrency.value = userData.currency || "USD";

  // Load dark mode state
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  themeToggle.checked = isDarkMode;
  toggleTheme(isDarkMode);
});

// Save Profile Info
document.getElementById("profileForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const userProfile = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    currency: preferredCurrency.value,
  };

  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  alert("Profile updated successfully!");
});

// Theme Toggle
themeToggle.addEventListener("change", (e) => {
  const isDark = e.target.checked;
  toggleTheme(isDark);
  localStorage.setItem("darkMode", isDark);
});

function toggleTheme(isDark) {
  if (isDark) {
    body.classList.add("bg-gray-900", "text-gray-100");
    body.classList.remove("bg-white", "text-gray-800");
  } else {
    body.classList.add("bg-white", "text-gray-800");
    body.classList.remove("bg-gray-900", "text-gray-100");
  }
}

// Reset Transactions / Clear Data
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all saved transactions and data?")) {
    localStorage.removeItem("transactions");
    alert("All data has been cleared.");
  }
});

// Logout Functionality
logoutBtn.addEventListener("click", () => {
  if (confirm("Log out of your account?")) {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  }
});
