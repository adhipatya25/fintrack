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


// Fetch data from Local Storage
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Get elements
const dateFilter = document.getElementById("dateFilter");

// Chart contexts
const ctxCategory = document.getElementById("categoryChart");
const ctxTrend = document.getElementById("trendChart");
const ctxComparison = document.getElementById("comparisonChart");

// Global chart instances
let categoryChart, trendChart, comparisonChart;

// Function to aggregate data from filtered transactions
function aggregateData(filteredTransactions) {
  const categoryData = {};
  let totalIncome = 0, totalExpense = 0;

  filteredTransactions.forEach(t => {
    const { type, amount, category } = t;
    const amt = parseFloat(amount);

    // Category-wise (only expenses for pie chart)
    if (type === "expense") {
      categoryData[category] = (categoryData[category] || 0) + amt;
    }

    if (type === "income") totalIncome += amt;
    else totalExpense += amt;
  });

  return { categoryData, totalIncome, totalExpense };
}

// Aggregate overall monthly data for trend chart
const monthlyData = {};
transactions.forEach(t => {
  const { type, amount, date } = t;
  const amt = parseFloat(amount);
  const month = new Date(date).toLocaleString('default', { month: 'short' });

  monthlyData[month] = (monthlyData[month] || { income: 0, expense: 0 });
  monthlyData[month][type] += amt;
});

// Function to update charts
function updateCharts(filteredTransactions) {
  const { categoryData, totalIncome, totalExpense } = aggregateData(filteredTransactions);

  // Update Category Pie Chart
  categoryChart.data.labels = Object.keys(categoryData);
  categoryChart.data.datasets[0].data = Object.values(categoryData);
  categoryChart.update();

  // Update Income vs Expense Chart
  comparisonChart.options.plugins.legend.display = true;
  comparisonChart.data.labels = ["Total Income", "Total Expense"];
  comparisonChart.data.datasets[0].data = [totalIncome, totalExpense];
  comparisonChart.update();

  // Trend chart remains overall, no update needed
}

// Initialize charts
const months = Object.keys(monthlyData);
const expenses = months.map(m => monthlyData[m].expense);
const incomes = months.map(m => monthlyData[m].income);

// Category Pie Chart (empty initially)
categoryChart = new Chart(ctxCategory, {
  type: "pie",
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"],
    }]
  },
  options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
});

// Monthly Trend Chart (overall)
trendChart = new Chart(ctxTrend, {
  type: "bar",
  data: {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: expenses,
        backgroundColor: "#9b5de5"
      },
      {
        label: "Income",
        data: incomes,
        backgroundColor: "#00bbf9"
      }
    ]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { position: "bottom" } }
  }
});

// Income vs Expense Comparison Chart (empty initially)
comparisonChart = new Chart(ctxComparison, {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [{
      data: [0, 0],
      backgroundColor: ["#00bbf9", "#9b5de5"],
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: "bottom", display: false } }
  }
});

// Function to reload transactions and update all data
function reloadData() {
  transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  // Recalculate monthly data for trend chart
  monthlyData = {};
  transactions.forEach(t => {
    const { type, amount, date } = t;
    const amt = parseFloat(amount);
    const month = new Date(date).toLocaleString('default', { month: 'short' });

    monthlyData[month] = (monthlyData[month] || { income: 0, expense: 0 });
    monthlyData[month][type] += amt;
  });

  // Update trend chart
  const months = Object.keys(monthlyData);
  const expenses = months.map(m => monthlyData[m].expense);
  const incomes = months.map(m => monthlyData[m].income);
  trendChart.data.labels = months;
  trendChart.data.datasets[0].data = expenses;
  trendChart.data.datasets[1].data = incomes;
  trendChart.update();

  // Update filtered charts only if month selected
  const selectedMonth = dateFilter.value;
  if (selectedMonth) {
    const filteredTransactions = transactions.filter(t => t.date.startsWith(selectedMonth));
    updateCharts(filteredTransactions);
  } else {
    categoryChart.data.labels = [];
    categoryChart.data.datasets[0].data = [];
    categoryChart.update();
    comparisonChart.options.plugins.legend.display = false;
    comparisonChart.data.labels = [];
    comparisonChart.data.datasets[0].data = [0, 0];
    comparisonChart.update();
  }
}

// Event listener for month filter
dateFilter.addEventListener('change', () => {
  const selectedMonth = dateFilter.value;
  if (selectedMonth) {
    const filteredTransactions = transactions.filter(t => t.date.startsWith(selectedMonth));
    updateCharts(filteredTransactions);
  } else {
    categoryChart.data.labels = [];
    categoryChart.data.datasets[0].data = [];
    categoryChart.update();
    comparisonChart.options.plugins.legend.display = false;
    comparisonChart.data.labels = [];
    comparisonChart.data.datasets[0].data = [0, 0];
    comparisonChart.update();
  }
});

// Listen for storage changes (e.g., new transactions added)
window.addEventListener('storage', reloadData);
