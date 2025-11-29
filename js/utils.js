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

const feedbackForm = document.getElementById("feedbackForm");
const feedbackName = document.getElementById("feedbackName");
const feedbackEmail = document.getElementById("feedbackEmail");
const feedbackMessage = document.getElementById("feedbackMessage");
const feedbackStatus = document.getElementById("feedbackStatus");

// Handle Feedback Form Submission
feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = feedbackName.value.trim();
  const email = feedbackEmail.value.trim();
  const message = feedbackMessage.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Save feedback locally (you can later connect it to backend or email service)
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push({ name, email, message, date: new Date().toLocaleString() });
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  // Clear inputs
  feedbackName.value = "";
  feedbackEmail.value = "";
  feedbackMessage.value = "";

  // Show confirmation
  feedbackStatus.classList.remove("hidden");
  setTimeout(() => feedbackStatus.classList.add("hidden"), 3000);
});
