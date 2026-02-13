// localStorage.clear()

// if (localStorage.getItem('pin')  == null) { localStorage.setItem('pin', '1234'); }
// if (localStorage.getItem('balance') == null) { localStorage.setItem('balance', '1000'); }

// document.querySelector('#log-in-btn').addEventListener('click', () => {
//   if (document.querySelector('#pin').value == localStorage.getItem('pin')) {
//     document.querySelector('.log-in').classList.add('hidden');
//     document.querySelector('.homepage').classList.remove('hidden');
//   }
// });

// document.querySelector('#to-log-in').addEventListener('click', () => {
//   document.querySelector('.homepage').classList.add('hidden');
//   document.querySelector('.log-in').classList.remove('hidden');
// });

// // going buttons
// document.querySelector('#to-balance').addEventListener('click', () => {
//   document.querySelector('.homepage').classList.add('hidden');
//   document.querySelector('.balance-section').classList.remove('hidden');
//   document.querySelector('#balance-amount').textContent = localStorage.getItem('balance');
// });

// document.querySelector('#to-withdraw').addEventListener('click', () => {
//   document.querySelector('.homepage').classList.add('hidden');
//   document.querySelector('.withdraw-section').classList.remove('hidden');
// });

// document.querySelector('#change-pin').addEventListener('click', () => {
//   document.querySelector('#homepage').classList.add('hidden');
//   document.querySelector('#change-pin-section').classList.remove('hidden');
// });

// document.querySelector('#log-out-btn').addEventListener('click', () => {
//   document.querySelector('#homepage').classList.add('hidden');
//   document.querySelector('#log-out').classList.remove('hidden');
// });

// document.querySelector('#custom-withdraw').addEventListener('click', () => {
//   document.querySelector('#withdraw-section').classList.add('hidden');
//   document.querySelector('#custom-withdraw-section').classList.remove('hidden');
// });

// // leaving buttons
// document.querySelector('#balance-back').addEventListener('click', () => {
//   console.log('hello')
//   document.querySelector('.balance-section').classList.add('hidden');
//   document.querySelector('.homepage').classList.remove('hidden');
// });

// document.querySelector('#withdraw-back').addEventListener('click', () => {
//   document.querySelector('#withdraw-section').classList.add('hidden');
//   document.querySelector('#homepage').classList.remove('hidden');
// });

// document.querySelector('#change-pin-back').addEventListener('click', () => {
//   document.querySelector('#change-pin-section').classList.add('hidden');
//   document.querySelector('#homepage').classList.remove('hidden');
// });

// document.querySelector('#custom-withdraw-back').addEventListener('click', () => {
//   document.querySelector('#custom-withdraw-section').classList.add('hidden');
//   document.querySelector('#withdraw-section').classList.remove('hidden');
// })

// withdrawing amounts
// document.querySelector('#withdraw-btn5').addEventListener('click', () => {
//   localStorage.setItem('balance', (parseInt(localStorage.getItem('balance')) - 5).toString());
//   console.log(`Balance = ${localStorage.getItem('balance')}`);
// });

// document.querySelector('#withdraw-btn10').addEventListener('click', () => {
//   localStorage.setItem('balance', (parseInt(localStorage.getItem('balance')) - 10).toString());
//   console.log(`Balance = ${localStorage.getItem('balance')}`);
// });

// document.querySelector('#withdraw-btn20').addEventListener('click', () => {
//   localStorage.setItem('balance', (parseInt(localStorage.getItem('balance')) - 20).toString());
//   console.log(`Balance = ${localStorage.getItem('balance')}`);
// });

// document.querySelector('#withdraw-btn40').addEventListener('click', () => {
//   localStorage.setItem('balance', (parseInt(localStorage.getItem('balance')) - 40).toString());
//   console.log(`Balance = ${localStorage.getItem('balance')}`);
// });

// document.querySelector('#withdraw-btn50').addEventListener('click', () => {
//   localStorage.setItem('balance', (parseInt(localStorage.getItem('balance')) - 50).toString());
//   console.log(`Balance = ${localStorage.getItem('balance')}`);
// });

// withdrawing custom amount
// document.querySelector('#custom-withdraw-confirm').addEventListener('click', () => {
//   customAmount = parseFloat(document.querySelector('#custom-amount').value);

//   if (customAmount % 5 == 0) { 
//     localStorage.setItem('balance', (parseInt(localStorage.getItem('balance')) - customAmount).toString());
//     console.log(`Balance = ${localStorage.getItem('balance')}`);
//   }
// });

// changing pin
// document.querySelector('#change-pin-btn').addEventListener('click',  () => {
//   newPin = document.querySelector('#new-pin').value;
//   confirmPin = document.querySelector('#confirm-new-pin').value;
  
//   if (newPin == confirmPin) { 
//     localStorage.setItem('pin', newPin); 
//     console.log(`PIN = ${localStorage.getItem('pin')}`);
//   }
// });
