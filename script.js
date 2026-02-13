localStorage.clear();

let attemptsRemaining = 3;
let userIncrementor = 0;

document.querySelector('#log-in-btn').addEventListener('click', () => {
  logInSection = document.querySelector('.log-in-section');
  inputName = document.querySelector('#user-name').value;
  inputPin = document.querySelector('#user-pin').value;

  if(inputPin.length != 4 || attemptsRemaining == 0) { return; }

  if (localStorage.getItem(inputName) == null) {
    localStorage.setItem(inputName, inputPin);
    console.log(`${inputName}, ${localStorage.getItem(inputName)}`);
    showDashboard(logInSection);
  } else if (localStorage.getItem(inputName) == inputPin) {
    showDashboard(logInSection);
  } else {
    console.log('Wrong PIN');
    attemptsRemaining -= 1
    document.querySelector('#attempts-remaining').textContent = attemptsRemaining;
  }

  if (attemptsRemaining == 0) {
    document.querySelector('#user-name').setAttribute('disabled', true);
    document.querySelector('#user-pin').setAttribute('disabled', true);
  }
});

function showDashboard(toHide) {
  document.querySelector('.dashboard').classList.remove('hidden');
  toHide.classList.add('hidden');
}