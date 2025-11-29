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

// Select elements
const form = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

// New date input reference
const dateInput = document.getElementById('date');

// Load saved transactions
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Utility: format date string (YYYY-MM-DD -> readable)
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr + 'T00:00:00'); // ensure no timezone shift
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(); // browser locale (e.g., "10/12/2025")
};

// Function to render transactions
function renderTransactions() {
  transactionList.innerHTML = '';

  transactions.forEach((t, index) => {
    const row = document.createElement('tr');
    row.classList.add('border-b', t.type === 'income' ? 'bg-green-50' : 'bg-red-50');

    // Create cells with date displayed
    row.innerHTML = `
      <td class="p-2">₹${t.amount}</td>
      <td class="p-2 capitalize">${t.type}</td>
      <td class="p-2">${t.category}</td>
      <td class="p-2">${t.description || '-'}</td>
      <td class="p-2">${formatDate(t.date)}</td>
      <td class="p-2 space-x-2">
        <button onclick="editTransaction(${index})" class="text-blue-600 font-medium">Edit</button>
        <button onclick="deleteTransaction(${index})" class="text-red-600 font-medium">Delete</button>
      </td>
    `;
    transactionList.appendChild(row);
  });

  localStorage.setItem('transactions', JSON.stringify(transactions));
  // Notify other pages (e.g., dashboard) about update if they listen for storage
  window.dispatchEvent(new Event("storage"));
}

// Add transaction
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  const category = document.getElementById('category').value.trim();
  const description = document.getElementById('description').value.trim();
  const date = document.getElementById('date').value; // capture date

  if (isNaN(amount) || amount <= 0) return alert('Please enter a valid amount.');
  if (!date) return alert('Please choose a valid date.');

  const transaction = { amount, type, category, description, date };
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  form.reset();
  renderTransactions();
});

// Delete transaction
function deleteTransaction(index) {
  if (confirm('Delete this transaction?')) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
  }
}

// Edit transaction
function editTransaction(index) {
  const t = transactions[index];
  document.getElementById('amount').value = t.amount;
  document.getElementById('type').value = t.type;
  document.getElementById('category').value = t.category;
  document.getElementById('description').value = t.description || '';

  // populate date input (so user can edit it)
  // store in ISO yyyy-mm-dd format; t.date is expected in same format
  if (t.date) {
    // if the stored date already is yyyy-mm-dd, use it; else try converting
    const iso = (new Date(t.date)).toISOString().slice(0,10);
    document.getElementById('date').value = iso;
  } else {
    document.getElementById('date').value = '';
  }

  // Remove old transaction so when user submits it will be saved as new (edit -> resave)
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
}

// Initial render
renderTransactions();
