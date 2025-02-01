// رمز عبور
const PASSWORD = "$$@@admin";

// DOM Elements
const passwordModal = document.getElementById("password-modal");
const passwordInput = document.getElementById("password-input");
const passwordSubmit = document.getElementById("password-submit");
const passwordError = document.getElementById("password-error");
const walletContainer = document.getElementById("wallet-container");

// بررسی رمز عبور
passwordSubmit.addEventListener("click", () => {
    if (passwordInput.value === PASSWORD) {
        // رمز صحیح است
        passwordModal.style.display = "none";
        walletContainer.style.display = "block";
    } else {
        // رمز اشتباه است
        passwordError.textContent = "Incorrect password! Try again.";
        passwordError.style.display = "block";
    }
});

// Initial Balance
let btcBalance = 0.5;
const btcToUsd = 27000;

// DOM Elements for Wallet
const btcBalanceEl = document.getElementById("btc-balance");
const usdBalanceEl = document.getElementById("usd-balance");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");

// Update Balance Function
function updateBalance() {
    btcBalanceEl.textContent = `${btcBalance.toFixed(2)} BTC`;
    usdBalanceEl.textContent = `≈ $${(btcBalance * btcToUsd).toFixed(2)}`;
}

// Add Transaction Function
function addTransaction(description, amount) {
    const li = document.createElement("li");
    const amountClass = amount > 0 ? "credit" : "debit";
    li.innerHTML = `<span>${description}</span><span class="${amountClass}">${amount > 0 ? "+" : ""}${amount.toFixed(2)} BTC</span>`;
    transactionList.appendChild(li);
}

// Form Submit Event
transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!description || isNaN(amount)) {
        alert("Please enter valid details!");
        return;
    }

    // Update Balance
    btcBalance += amount;
    updateBalance();

    // Add Transaction to List
    addTransaction(description, amount);

    // Clear Inputs
    descriptionInput.value = "";
    amountInput.value = "";
});

// Initial Render
updateBalance();
