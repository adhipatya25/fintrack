# 📊 FinTrack – Smart Expense Tracker

A Web Programming Course Project
**By Mayank Jatariya and Adhipatya Saxena**

---

## 📌 Overview

**FinTrack** is a simple, clean, and user-friendly expense tracking web application.
It helps users manage their personal finances by allowing them to:

* Add, view, edit, and delete transactions
* Track income and expenses separately
* Categorize daily expenses
* View spending trends using charts
* Analyze monthly expense data
* Store everything in LocalStorage so that data stays even after closing the browser

The project is built entirely using **HTML**, **TailwindCSS**, **JavaScript**, and **Chart.js**.

---

## 🛠️ Tools & Technologies Used

### **Frontend**

* **HTML5** – Builds the layout and structure
* **TailwindCSS** – Styling and responsive UI
* **JavaScript (ES6)** – Logic, DOM updates, form validation, page interaction

### **Data Handling**

* **LocalStorage** – Saves all user transactions permanently on the browser

### **Visualizations**

* **Chart.js** – Used to generate pie charts and bar charts

### **Development Tools**

* Visual Studio Code
* Live Server
* Chrome DevTools

---

## 🌟 Features

### ✔ **Add, Edit, and Delete Transactions**

Users can record daily expenses and income with amount, category, description, and date.

### ✔ **Category-wise Expense Tracking**

Pie chart shows where money is being spent.

### ✔ **Monthly Expense Trend**

Bar chart displays spending patterns across days of a selected month.

### ✔ **Income vs Expense Chart**

A comparison chart helps users understand their financial health.

### ✔ **Multi-Page Navigation**

The website includes:

* Dashboard
* Transactions Page
* Analytics Page
* Profile Page
* About Page
* Login/Signup Page
* Navigation Menu

### ✔ **Persistent Data Storage**

All user data is saved in LocalStorage, so it doesn’t disappear after refreshing or closing the browser.

### ✔ **Responsive Layout**

TailwindCSS ensures the app works smoothly on mobile, tablet, and desktop.

---

## 🧭 How FinTrack Works (Simple Workflow)

1. User adds a transaction → it is saved to LocalStorage
2. Dashboard updates totals automatically
3. Analytics reads stored data → generates charts
4. User can edit or delete any entry
5. Changes are updated across all pages in real-time

---

## 📂 Folder Structure (Updated)

```
WP-PROJECT-FINTRACK/
│
├── asset/
│   └── logo.png
│
├── js/
│   ├── analytics.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── profile.js
│   ├── transactions.js
│   └── utils.js
│
├── tailwindcss/
│   ├── output.css
│   └── style.css
│
├── about.html
├── analytics.html
├── dashboard.html
├── index.html
├── menu.html
├── profile.html
└── transactions.html
```

---

## 📄 Pages Overview

### 🔹 **Dashboard (dashboard.html)**

Shows:

* Total Income
* Total Expense
* Balance
* Quick summaries

### 🔹 **Transactions (transactions.html)**

Allows:

* Adding new entries
* Editing and deleting existing entries
* Viewing a transaction table

### 🔹 **Analytics (analytics.html)**

Shows:

* Category-wise pie chart
* Monthly trend bar chart
* Income vs Expense chart

### 🔹 **Profile (profile.html)**

User preferences:

* Update profile
* Currency
* Data reset

### 🔹 **About Page (about.html)**

Explains:

* Purpose of the app
* How the system works
* Contact/Feedback form

### 🔹 **Login/Signup (index.html)**

Simple login page for the project’s flow.

### 🔹 **Menu Page (menu.html)**

Navigation hub that links all major pages.

---

## 📈 Recommended Screenshots

(Add these in your GitHub README if you want)

* Dashboard Summary
  <img width="900" height="418" alt="image" src="https://github.com/user-attachments/assets/33fb3db5-be4b-4fba-ab5c-f28127d89cca" />

* Add Transaction Form
  <img width="900" height="438" alt="image" src="https://github.com/user-attachments/assets/c2b8b091-8e0f-4023-b41f-66dc0dce6025" />

* Charts in Analytics Page
  <img width="900" height="450" alt="image" src="https://github.com/user-attachments/assets/b21c192b-1dd7-4309-adbe-614f5b5fe1ac" />

* Profile Page
  <img width="900" height="416" alt="image" src="https://github.com/user-attachments/assets/ab6d5ccb-c3fd-435a-81ce-b9c899e5f13e" />

* About Page
  <img width="900" height="679" alt="image" src="https://github.com/user-attachments/assets/2ce4a192-3c67-42d1-8be4-0f1e839d062f" />


---

## 🎓 Learning Outcomes

From this project, I learned:

* How to build and structure a multi-page website
* How to design responsive layouts using TailwindCSS
* Real-time DOM manipulation with JavaScript
* Using LocalStorage to save user data
* Creating charts with Chart.js
* Organizing code across multiple JavaScript files
* Debugging layout and logic issues
* Designing a project from start to finish

---

## ✅ Conclusion

FinTrack is a complete personal finance tracking application built with modern web technologies. It is simple, fast, and helps users stay organized with their money.
This project demonstrates practical skills in front-end development, data handling, UI design, and JavaScript logic.
