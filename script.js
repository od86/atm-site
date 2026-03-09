// ["name", "[pin, balance, [transactions], numOfWithdraws, totalWithdrawn]"]

// localStorage.clear();

let attemptsRemaining = 3;
let currentUser = null;

document.querySelector('#log-in-btn').addEventListener('click', logIn);

// Logs the user in
function logIn() {
  inputName = document.querySelector('#user-name').value;
  inputPin = document.querySelector('#user-pin').value;
  clearEnterInputs();

  // When user runs out of attempts
  if (attemptsRemaining == 0) {
    disableLogInInputs();
    return;
  }

  // When account doesnt exit
  if (localStorage.getItem(inputName) == null || inputName == "") { 
    showErrorPopup('ACCOUNT DOES NOT EXIST!');
    return;
  }

  // When pin is invalid
  if (inputPin.length != 4) {
    attemptsRemaining -= 1;
    showErrorPopup(`INVALID PIN! Attempts left: ${attemptsRemaining}`);

    if (attemptsRemaining == 0) { disableLogInInputs(); }

    return; 
  }

  // When pin is correct or incorrect
  if (JSON.parse(localStorage.getItem(inputName))[0] != inputPin) { 
    attemptsRemaining -= 1;
    showErrorPopup(`WRONG PIN! Attempts left: ${attemptsRemaining}`);
  } else {
    currentUser = inputName;
    hideLoginPage();
  }

  // When user runs out of attempts
  if (attemptsRemaining == 0) {
    disableLogInInputs();
    return;
  }
}

function disableLogInInputs() {
  document.querySelector('#user-name').setAttribute('disabled', true);
  document.querySelector('#user-pin').setAttribute('disabled', true);
  showErrorPopup('ACCOUNT LOCKED');
}

function showErrorPopup(text) {
  document.querySelector('.error-popup').textContent = text;
  document.querySelector('.error-popup').classList.remove('hidden');

  setTimeout(() => {
    document.querySelector('.error-popup').classList.add('hidden');
  }, 2000);
}

function showInfoPopup(text) {
  document.querySelector('.info-popup').textContent = text;
  document.querySelector('.info-popup').classList.remove('hidden');

  setTimeout(() => {
    document.querySelector('.info-popup').classList.add('hidden');
  }, 2000);
}

function hideLoginPage() {
  showFullDashboard();
  hideSpecificItem(document.querySelector('.log-in-section'));
  hideSpecificItem(document.querySelector('.create-account'));
  hideSpecificItem(document.querySelector('.log-in-items'));
}

function displayDashboard() { document.querySelector('.dashboard').classList.remove('hidden'); }
function hideDashboard() { document.querySelector('.dashboard').classList.add('hidden'); }

// Shows the main dashboard items - action buttons, transactions history and withdraw counts
function displayDashboardItems() {
  document.querySelector('.function-buttons').classList.remove('hidden');
  document.querySelector('.transactions').classList.remove('hidden');
  document.querySelector('.withdraw-counts').classList.remove('hidden');
}

// Hides the main dashboard items - action buttons, transactions history and withdraw counts
function hideDashboardItems() {
  document.querySelector('.function-buttons').classList.add('hidden');
  document.querySelector('.transactions').classList.add('hidden');
  document.querySelector('.withdraw-counts').classList.add('hidden');
}

// Hides the main dashboard features - balance, withdraw and change pin
function hideDashboardActions() {
  document.querySelector('.balance').classList.add('hidden');
  document.querySelector('.withdraw').classList.add('hidden');
  document.querySelector('.pin').classList.add('hidden');
}

// Shows the full dashboard without actions
function showFullDashboard() {
  displayDashboard();
  displayDashboardItems();
  hideDashboardActions();
  hidePreviousTransactionsColumns();
  removePreviousTransactions();
  showTransactions();
  showWithdrawCount();
  updateName();
}

function updateName() {
  document.querySelector('#name-title').textContent = currentUser.toUpperCase();
}

// Hides everything in dashboard aside from sidebar and navbar
function hideFullDashboard() {
  hideDashboardItems();
  hideDashboardActions();
}

function hideSpecificItem(itemName) { itemName.classList.add('hidden'); }
function showSpecificItem(itemName) { itemName.classList.remove('hidden'); }

// Clears the users inputs
function clearEnterInputs() {
  document.querySelector('#user-name').value = '';
  document.querySelector('#user-pin').value = '';
}

// Updates the attempts remaining
function updateAttemptsRemaining() { document.querySelector('#attempts-remaining').textContent = attemptsRemaining; }

// Updates the balance page so it has correct data
function updateBalancePage() {
  userInfo = JSON.parse(localStorage.getItem(currentUser));

  document.querySelector('#balance-amount').textContent = '£' + balanceAmount(userInfo[1]);
  document.querySelector('#num-of-withdraw').textContent = userInfo[3];
  document.querySelector('#total-withdraw').textContent = `£${userInfo[4]}`;
}

function balanceAmount(num) {
  needsZeros = true;
  `${num}`.split('').forEach(item => { if (item == '.') { needsZeros = false } });

  return needsZeros ? `${num}.00` : num;
}

// Shows the balance page
function showBalancePage() {
  hideFullDashboard();
  showSpecificItem(document.querySelector('.balance'));
  updateBalancePage();
}

// Shows the withdraw page
function showWithdrawPage() {
  hideFullDashboard();
  showSpecificItem(document.querySelector('.withdraw'));
}

// Shows the change pin page
function showChangePinPage() {
  hideFullDashboard();
  showSpecificItem(document.querySelector('.pin'));
}

// Makes sure account doesnt exit and pins match
function createdNewAccount() {
  newName = document.querySelector('#user-new-name').value;
  newBalance = document.querySelector('#user-new-balance').value;
  newPin = document.querySelector('#user-new-pin').value;
  confirmPin = document.querySelector('#user-new-confirm-pin').value;

  document.querySelector('#user-new-name').value = "";
  document.querySelector('#user-new-balance').value = "";
  document.querySelector('#user-new-pin').value = "";
  document.querySelector('#user-new-confirm-pin').value = "";

  if (localStorage.getItem(newName) != null) { 
    showErrorPopup('ACCOUNT ALREADY EXISTS!');
    return;
  }

  if (newPin != confirmPin) {
    showErrorPopup('PINS MUST BE MATCH!');
    return;
  }

  // Check if balance is a valid number and not allow more than 2 decimal places
  if (validBalance(newBalance) == false) {
    showErrorPopup('MUST ENTER A VALID BALANCE');
    return;
  } 

  localStorage.setItem(newName, JSON.stringify([newPin, newBalance, [], 0, 0]));
  currentUser = newName;
  hideLoginPage();
}

// Makes sure inputed balance is valid
function validBalance(str) {
  decimalCounter = 0;
  nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
  valid = true;
  
  str.split('').forEach(item => {
    if (item == ".") { decimalCounter += 1 }
    if (decimalCounter > 1 || nums.includes(item) == false) { valid = false; }
  });

  return valid;
}

// Create new account button
document.querySelector('#create-account-btn').addEventListener('click', createdNewAccount);

// Log in link button
document.querySelector('#to-log-in-btn-from-create').addEventListener('click', () => {
  document.querySelector('.create-account').classList.add('hidden');
  document.querySelector('.log-in-items').classList.remove('hidden');
});

// Create account link button
document.querySelector('#to-create-from-login').addEventListener('click', () => {
  document.querySelector('.log-in-items').classList.add('hidden');
  document.querySelector('.create-account').classList.remove('hidden');
});

// Log out button
document.querySelector('#to-log-in-btn').addEventListener('click', () => {
  hideFullDashboard();
  hideDashboard();
  clearEnterInputs();

  document.querySelector('.log-in-section').classList.remove('hidden');
  document.querySelector('.create-account').classList.remove('hidden');
  
  attemptsRemaining = 3;
});

// Side title homepage link
document.querySelector('#sidebar-homepage').addEventListener('click', showFullDashboard)

// Balance link buttons
document.querySelector('#to-balance-btn-func').addEventListener('click', showBalancePage);
document.querySelector('#to-balance-btn-link').addEventListener('click', showBalancePage);

// Withdraw link buttons
document.querySelector('#to-withdraw-btn-func').addEventListener('click', showWithdrawPage);
document.querySelector('#to-withdraw-btn-link').addEventListener('click', showWithdrawPage);
document.querySelector('#to-withdraw-btn').addEventListener('click', showWithdrawPage);

// Change PIN link buttons
document.querySelector('#to-pin-btn-func').addEventListener('click', showChangePinPage);
document.querySelector('#to-pin-btn-link').addEventListener('click', showChangePinPage);

// Back buttons
document.querySelector('#balance-back').addEventListener('click', showFullDashboard);
document.querySelector('#withdraw-back').addEventListener('click', showFullDashboard);
document.querySelector('#pin-back').addEventListener('click', () => {
  
  showFullDashboard();
})

// Withdraw buttons
document.querySelector('#withdraw10').addEventListener('click', () => { withdrawAmount(10, 'quick'); });
document.querySelector('#withdraw20').addEventListener('click', () => { withdrawAmount(20, 'quick'); });
document.querySelector('#withdraw50').addEventListener('click', () => { withdrawAmount(50, 'quick'); });
document.querySelector('#withdraw100').addEventListener('click', () => { withdrawAmount(100, 'quick'); });
document.querySelector('#custom-withdraw-confirm').addEventListener('click', () => {
  customAmount = document.querySelector('#custom-amount-input').value;
  document.querySelector('#custom-amount-input').value = "";
  validCustomWithdraw(customAmount) ? withdrawAmount(parseInt(customAmount), 'custom') : showErrorPopup('INAVLID AMOUNT!')
});

function validCustomWithdraw(str) {
  nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  valid = true;
  
  str.split('').forEach(item => { if (nums.includes(item) == false) { valid = false; } });

  return (parseInt(str) % 5 == 0 && valid == true) ? true : false
}

// Removes amount from balance, adds transaction, updates num of transactions and total withdrawn
function withdrawAmount(amount, type) {
  userInfo = JSON.parse(localStorage.getItem(currentUser));
  totalWithdrawn = 0;

  if (amount > userInfo[1]) {
    showErrorPopup('INSUFFICIENT FUNDS!');
    return; 
  }

  showInfoPopup(`WITHDREW - £${amount}`);
  
  userInfo[1] -= amount;
  userInfo[2].push([type, amount, `${(new Date).getDate()}/${(new Date).getMonth()}/${(new Date).getFullYear()}`]);
  userInfo[2].forEach(transaction => { totalWithdrawn += transaction[1]; });
  userInfo[3] = userInfo[2].length;
  userInfo[4] = totalWithdrawn;
  localStorage.setItem(currentUser, JSON.stringify(userInfo));
}

// Shows the count for all different withdraw types
function showWithdrawCount() {
  transactions = JSON.parse(localStorage.getItem(currentUser))[2];
  customCount = 0;
  quickCount = [0, 0, 0, 0]

  transactions.forEach(transaction => {
    if (transaction[0] == 'custom') {
      customCount += 1;
    } else {
      if (transaction[1] == 100) { quickCount[0] += 1; }
      if (transaction[1] == 50) { quickCount[1] += 1; }
      if (transaction[1] == 20) { quickCount[2] += 1; }
      if (transaction[1] == 10) { quickCount[3] += 1; }
    }
  })

  document.querySelector('#count-custom').textContent = customCount;
  document.querySelector('#count100').textContent = quickCount[0];
  document.querySelector('#count50').textContent = quickCount[1];
  document.querySelector('#count20').textContent = quickCount[2];
  document.querySelector('#count10').textContent = quickCount[3];
}

// Shows previous transactions in the transactions section on the homepage
function showTransactions() {

  userInfo = JSON.parse(localStorage.getItem(currentUser));
  idIncrementor = userInfo[2].length;

  if (userInfo[3] == 0) {
    document.querySelector('.no-transactions-data').classList.remove('hidden');
    return;
  } else {
    document.querySelector('.no-transactions-data').classList.add('hidden');
    showPreviousTransactionsColumns();
    removePreviousTransactions();
  }

  userInfo[2].reverse().forEach(transaction => {
    let transactionId = idIncrementor;
    if (idIncrementor < 10) { transactionId = `0${idIncrementor}`; }

    document.querySelector('.previous-transactions').innerHTML += `
    <div class="previous-transaction">
      <p>#tr_${transactionId}</p>
      <p>${currentUser}</p>
      <p>${transaction[0]}</p>
      <p>£${transaction[1]}</p>
      <p>${transaction[2]}</p>
    </div>`;

    idIncrementor -= 1;
  });
}

// Remove the previous transactions so that there arent duplicates
function removePreviousTransactions() {
  dashboard = document.querySelector('.previous-transactions');

  while(dashboard.childNodes.length > 4) {
    dashboard.removeChild(dashboard.lastChild);
  }
}

function hidePreviousTransactionsColumns() {
  document.querySelector('.previous-transactions-columns').classList.add('hidden');
}

function showPreviousTransactionsColumns() {
  document.querySelector('.previous-transactions-columns').classList.remove('hidden');
}

// PIN change functionality
document.querySelector('#change-pin-confirm').addEventListener('click', changePIN);

function changePIN() {
  newPin = document.querySelector('#new-pin').value;
  confirmPin = document.querySelector('#confirm-pin').value;
  document.querySelector('#new-pin').value = "";
  document.querySelector('#confirm-pin').value = "";

  userInfo = JSON.parse(localStorage.getItem(currentUser));

  if (newPin != confirmPin) {
    showErrorPopup('PINS MUST MATCH!');
    return; 
  }
  if (newPin == userInfo[0]) {
    showErrorPopup('PIN CANNOT BE SAME AS PREVIOUS');
    return; 
  }
  
  showInfoPopup('PIN CHANGED');
  userInfo[0] = newPin;
  localStorage.setItem(currentUser, JSON.stringify(userInfo));
}


// Updates the current time every minutes
showTime()
setInterval(showTime, 1000);

function showTime() {
  let time = new Date;
  hours = formatTime(time.getHours());
  minutes = formatTime(time.getMinutes());
  seconds = formatTime(time.getSeconds());
  days = formatTime(time.getDate());
  months = formatTime(time.getMonth() + 1);
  fullTime = `${hours}:${minutes}:${seconds} ${days}/${months}/${time.getFullYear()}`;
  document.querySelector('#current-time').textContent = fullTime;
}

// Formats time so that it has a 0 in front of it if its single digit
function formatTime(number) {
  if (number < 10) { return `0${number}`; }
  return number;
}