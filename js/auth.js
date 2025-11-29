// Tab Switching Logic
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

signupTab.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  signupTab.classList.add('text-purple-600', 'font-semibold', 'border-b-2', 'border-purple-600');
  loginTab.classList.remove('text-purple-600', 'font-semibold', 'border-b-2', 'border-purple-600');
  loginTab.classList.add('text-gray-500');
});

loginTab.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginTab.classList.add('text-purple-600', 'font-semibold', 'border-b-2', 'border-purple-600');
  signupTab.classList.remove('text-purple-600', 'font-semibold', 'border-b-2', 'border-purple-600');
  signupTab.classList.add('text-gray-500');
});

// Signup Form Submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.find(u => u.email === email);

  if (userExists) {
    alert('User already exists! Please login.');
  } else {
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! You can now login.');
    signupForm.reset();
    loginTab.click();
  }
});

// Login Form Submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const validUser = users.find(u => u.email === email && u.password === password);

  if (validUser) {
    localStorage.setItem('loggedInUser', JSON.stringify(validUser));
    alert(`Welcome back, ${validUser.name}!`);
    window.location.href = 'dashboard.html'; // Redirect to dashboard
  } else {
    alert('Invalid credentials. Please try again.');
  }
});
