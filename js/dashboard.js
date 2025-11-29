// DOM elements
const incomeDisplay = document.getElementById('total-income');
const expenseDisplay = document.getElementById('total-expense');
const balanceDisplay = document.getElementById('current-balance');

let categoryChart;
let timeChart;

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



// Function to fetch transactions from Local Storage
function getTransactions() {
  return JSON.parse(localStorage.getItem('transactions')) || [];
}

//  Function to update the dashboard totals
function updateTotals(transactions) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  incomeDisplay.textContent = `₹${totalIncome.toLocaleString()}`;
  expenseDisplay.textContent = `₹${totalExpense.toLocaleString()}`;
  balanceDisplay.textContent = `₹${balance.toLocaleString()}`;
}

//  Function to update Category Pie Chart
function updateCategoryChart(transactions) {
  const expenseData = transactions.filter(t => t.type === 'expense');
  const categories = [...new Set(expenseData.map(t => t.category))];

  const categoryTotals = categories.map(cat => {
    return expenseData
      .filter(t => t.category === cat)
      .reduce((sum, t) => sum + Number(t.amount), 0);
  });

  const ctx = document.getElementById('categoryChart').getContext('2d');

  if (categoryChart) categoryChart.destroy(); // Prevent duplicates

  categoryChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        data: categoryTotals,
        backgroundColor: [
          '#8B5CF6', '#A78BFA', '#C4B5FD', '#E9D5FF', '#F3E8FF'
        ],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    },
  });
}

// 🔹 Function to update Expense Over Time Line Chart
function updateTimeChart(transactions) {
  const expenseData = transactions.filter(t => t.type === 'expense');

  // Group by date
  const dateMap = {};
  expenseData.forEach(t => {
    const date = t.date || 'Unknown';
    if (!dateMap[date]) dateMap[date] = 0;
    dateMap[date] += Number(t.amount);
  });

  const dates = Object.keys(dateMap).sort();
  const totals = dates.map(date => dateMap[date]);

  const ctx = document.getElementById('timeChart').getContext('2d');

  if (timeChart) timeChart.destroy();

  timeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Expense Over Time',
        data: totals,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.3,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    },
  });
}

// 🔹 Combined update function
function updateDashboard() {
  const transactions = getTransactions();
  updateTotals(transactions);
  updateCategoryChart(transactions);
  updateTimeChart(transactions);
}

// 🔹 Listen for Local Storage updates
window.addEventListener('storage', updateDashboard);

// 🔹 Initial render on page load
updateDashboard();
