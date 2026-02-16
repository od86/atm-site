// localStorage.clear();

// Make sure input is clear on every log in page at first launch
// document.querySelector('#user-name').value = '';
// clearInputs();

let attemptsRemaining = 3;
let currentUser = null;

// For when user clicks log in button
document.querySelector('#log-in-btn').addEventListener('click', logIn);
// For when user hits enter key
addEventListener('keydown', (event) => { if (event.key == 'Enter') { logIn(); } });

function setUpNewUser(name, pin) {
  // key is user name, data is an array of pin, balance, array of transactions, num of transactions, total withdrawn
  localStorage.setItem(name, JSON.stringify([pin, 1000, [], 0, 0]))
}

function logIn() {
  logInSection = document.querySelector('.log-in-section');
  inputName = document.querySelector('#user-name').value;
  inputPin = document.querySelector('#user-pin').value;
  clearPIN();

  if(inputPin.length != 4 || attemptsRemaining == 0) { return; }

  // If the username doesnt exist it creates a new user with the inputted pin
  // If the username does exist it checks if pin is correct or not
  // Otherwise tells user their input was wrong and decrements attempts left
  if (localStorage.getItem(inputName) == null) {
    setUpNewUser(inputName, inputPin);
    currentUser = inputName;
    showFullDashboard(logInSection, inputName);
  } else if (JSON.parse(localStorage.getItem(inputName))[0] == inputPin) {
    currentUser = inputName;
    showFullDashboard(logInSection, inputName);
  } else {
    console.log('Wrong PIN');
    attemptsRemaining -= 1
    document.querySelector('#attempts-remaining').textContent = `£${attemptsRemaining}`;
  }

  // Disables the input elements once the user has gotten the pin wrong 3 times
  if (attemptsRemaining == 0) {
    document.querySelector('#user-name').setAttribute('disabled', true);
    document.querySelector('#user-pin').setAttribute('disabled', true);
  }
}

function clearPIN() {
  document.querySelector('#user-pin').value = '';
}

function showWithdrawCount() {
  transactions = JSON.parse(localStorage.getItem(currentUser))[2];

  // How many custom amount transactions there are
  customCount = 0;

  // How many quick amount transaction there are (50, 40, 20, 10, 5)
  quickCount = [0, 0, 0, 0, 0]

  transactions.forEach(transaction => {
    if (transaction[0] == 'custom') {
      customCount += 1;
    } else {
      if (transaction[1] == 50) { quickCount[0] += 1; }
      if (transaction[1] == 40) { quickCount[1] += 1; }
      if (transaction[1] == 20) { quickCount[2] += 1; }
      if (transaction[1] == 10) { quickCount[3] += 1; }
      if (transaction[1] == 5) { quickCount[4] += 1; }
    }
  })

  document.querySelector('#count-custom').textContent = customCount;
  document.querySelector('#count50').textContent = quickCount[0];
  document.querySelector('#count40').textContent = quickCount[1];
  document.querySelector('#count20').textContent = quickCount[2];
  document.querySelector('#count10').textContent = quickCount[3];
  document.querySelector('#count5').textContent = quickCount[4];
}

function removePreviousTransactions() {
  dashboard = document.querySelector('.previous-transactions');
  while(dashboard.childNodes.length > 2) {
    dashboard.removeChild(dashboard.lastChild);
  }
}

function showTransactions() {
  userInfo = JSON.parse(localStorage.getItem(currentUser));
  idIncrementor = 1;

  removePreviousTransactions();

  if (userInfo[3] == 0) {
    document.querySelector('.no-transactions-data').classList.remove('hidden');
    return;
  }

  userInfo[2].forEach(transaction => {
    let transactionId = idIncrementor;
    if (idIncrementor < 10) { transactionId = `0${idIncrementor}`; }

    document.querySelector('.previous-transactions').innerHTML += `
    <div class="previous-transaction">
      <p id="transaction-id${idIncrementor}">#tr_${transactionId}</p>
      <p id="transaction-name${idIncrementor}">${currentUser}</p>
      <p id="transaction-type${idIncrementor}">${transaction[0]}</p>
      <p id="transaction-amount${idIncrementor}">${transaction[1]}</p>
      <p id="transaction-type${idIncrementor}">${transaction[2]}</p>
    </div>`;

    idIncrementor += 1;
  });
}

// Shows full dashbaord will all homepage items but no feature sections (balance, withdraw, pin change)
function showFullDashboard(toHide, name) {
  document.querySelector('.dashboard').classList.remove('hidden');
  document.querySelector('.function-buttons').classList.remove('hidden');
  document.querySelector('.transactions').classList.remove('hidden');
  document.querySelector('.withdraw-counts').classList.remove('hidden');
  document.querySelector('#name-title').textContent = name.charAt(0).toUpperCase() + name.slice(1);
  toHide.classList.add('hidden');
  showWithdrawCount();
  showTransactions();
}

// Hides dashbaord filler items (function-buttons, transactions, withdraw-counts) and shows
// the section that is passed
function hideDashboard(toShow) {
  document.querySelector('.function-buttons').classList.add('hidden');
  document.querySelector('.transactions').classList.add('hidden');
  document.querySelector('.withdraw-counts').classList.add('hidden');
  document.querySelector('.balance').classList.add('hidden');
  document.querySelector('.withdraw').classList.add('hidden');
  document.querySelector('.pin').classList.add('hidden');
  toShow.classList.remove('hidden');
}

function showDashboard() {
  document.querySelector('.function-buttons').classList.remove('hidden');
  document.querySelector('.transactions').classList.remove('hidden');
  document.querySelector('.withdraw-counts').classList.remove('hidden');
  document.querySelector('.balance').classList.add('hidden');
  document.querySelector('.withdraw').classList.add('hidden');
  document.querySelector('.pin').classList.add('hidden');
  showTransactions();
}

function setBalance() {
  userInfo = JSON.parse(localStorage.getItem(currentUser));
  document.querySelector('#balance-amount').textContent = '£' + userInfo[1] + '.00';
  document.querySelector('#num-of-withdraw').textContent = userInfo[3];
  document.querySelector('#total-withdraw').textContent = userInfo[4];
}

function updateBalanceWithdrawInfo() {
  userInfo = JSON.parse(localStorage.getItem(currentUser));
  totalWithdrawn = 0;

  userInfo[2].forEach(transaction => {
    totalWithdrawn += transaction[1];
  });

  userInfo[3] = userInfo[2].length;
  userInfo[4] = totalWithdrawn;

  localStorage.setItem(currentUser, JSON.stringify(userInfo));

  showWithdrawCount();
}

function withdrawAmount(amount, type) {
  userInfo = JSON.parse(localStorage.getItem(currentUser));

  if (amount <= userInfo[1]) {
    userInfo[1] -= amount;
    userInfo[2].push([type, amount, `${(new Date).getDate()}/${(new Date).getMonth()}/${(new Date).getFullYear()}`]);
    localStorage.setItem(currentUser, JSON.stringify(userInfo));
    updateBalanceWithdrawInfo();
  }
}

// Log out button
document.querySelector('#to-log-in-btn').addEventListener('click', () => {
  document.querySelector('.dashboard').classList.add('hidden');
  document.querySelector('.balance').classList.add('hidden');
  document.querySelector('.withdraw').classList.add('hidden');
  document.querySelector('.pin').classList.add('hidden');
  document.querySelector('.log-in-section').classList.remove('hidden');
  document.querySelector('#user-name').value = '';
  attemptsRemaining = 3;
  document.querySelector('#attempts-remaining').textContent = attemptsRemaining;
  clearPIN();
});

// Balance link buttons
document.querySelector('#to-balance-btn-func').addEventListener('click', () => {
  hideDashboard(document.querySelector('.balance'));
  setBalance();
});

document.querySelector('#to-balance-btn-link').addEventListener('click', () => {
  hideDashboard(document.querySelector('.balance'));
  setBalance();
})

document.querySelector('#balance-back').addEventListener('click', showDashboard);

// Withdraw link buttons
document.querySelector('#to-withdraw-btn-func').addEventListener('click', () => {
  hideDashboard(document.querySelector('.withdraw'));
});

document.querySelector('#to-withdraw-btn-link').addEventListener('click', () => {
  hideDashboard(document.querySelector('.withdraw'));
});

document.querySelector('#to-withdraw-btn').addEventListener('click', () => {
  hideDashboard(document.querySelector('.withdraw'));
});

document.querySelector('#withdraw-back').addEventListener('click', showDashboard);

document.querySelector('#withdraw5').addEventListener('click', () => { withdrawAmount(5, 'quick'); });
document.querySelector('#withdraw10').addEventListener('click', () => { withdrawAmount(10, 'quick'); });
document.querySelector('#withdraw20').addEventListener('click', () => { withdrawAmount(20, 'quick'); });
document.querySelector('#withdraw40').addEventListener('click', () => { withdrawAmount(40, 'quick'); });
document.querySelector('#withdraw50').addEventListener('click', () => { withdrawAmount(50, 'quick'); });
document.querySelector('#custom-withdraw-confirm').addEventListener('click', () => {
  customAmount = parseInt(document.querySelector('#custom-amount-input').value);
  if (customAmount % 5 == 0) { withdrawAmount(customAmount , 'custom'); };
});

// PIN chnage link buttons
document.querySelector('#to-pin-btn-func').addEventListener('click', () => {
  hideDashboard(document.querySelector('.pin'));
});

document.querySelector('#to-pin-btn-link').addEventListener('click', () => {
  hideDashboard(document.querySelector('.pin'));
});

document.querySelector('#pin-back').addEventListener('click', showDashboard);

// PIN change functionality
document.querySelector('#change-pin-confirm').addEventListener('click', () => {
  newPin = document.querySelector('#new-pin').value;
  confirmPin = document.querySelector('#confirm-pin').value;
  userInfo = JSON.parse(localStorage.getItem(currentUser));

  if (newPin != confirmPin) { return; }
  if (newPin == userInfo[0]) { return; }

  userInfo[0] = newPin;
  localStorage.setItem(currentUser, JSON.stringify(userInfo));
});

function showTime() {
  let time = new Date;
  fullTime = `${time.getHours()}:${time.getMinutes()} ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
  document.querySelector('#current-time').textContent = fullTime;
}

showTime()
setInterval(showTime, 60000);