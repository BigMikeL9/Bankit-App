'use strict';

// Data
const account1 = {
  owner: 'Mikel Kamel',
  movements: [200.5, 450.3, -400.9, 3000.7, -650.6, -130.2, 70.4, 1300.6],
  interestRate: 1.2, // %
  pin: 1234,
  icon: '🐱‍👤',

  movementsDates: [
    '2020-08-31T21:31:17.178Z',
    '2021-08-28T07:42:02.383Z',
    '2021-08-30T09:15:04.904Z',
    '2021-08-29T10:17:24.185Z',
    '2021-08-31T14:11:59.604Z',
    '2021-08-28T17:01:17.194Z',
    '2021-08-30T23:36:17.929Z',
    '2021-08-30T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account2 = {
  owner: 'Sandy Kamel',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  icon: '🌷',

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2021-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account3 = {
  owner: 'JoJo Juvana',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  icon: '🐫',

  movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2021-07-26T12:01:20.894Z',
  ],
  currency: 'CAI',
  locale: 'ar-EG',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  icon: '🌚',

  movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2021-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2021-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'fr',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// *********************************************
// Computing Usernames for each Account (initials for each user)

const userName = 'Steven Thomas Williams'; // username --> stw

const createUserNames = function (accs) {
  accs.forEach(function (account) {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

console.log('Accounts 🧾 -->', accounts);

// *********************************************
// Dates functionality

// current date
const createCurrentDate = function () {
  // const nowDate = new Date();
  // const day = `${nowDate.getDate()}`.padStart(2, 0);
  // const month = `${nowDate.getMonth() + 1}`.padStart(2, 0);
  // const year = nowDate.getFullYear();
  // const hour = `${nowDate.getHours()}`.padStart(2, 0);
  // const minute = `${nowDate.getMinutes()}`.padStart(2, 0);

  const now = new Date();
  // const locale = navigator.language;
  const locale = currentUser.locale;
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
};

// Movements days
const formatMovementData = function (date) {
  const calcPassedDays = (date1, date2) =>
    `${Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))}`;

  const daysPassed = Number(calcPassedDays(new Date(), date));

  if (daysPassed === 0) return 'Today 🎪';
  if (daysPassed === 1) return 'Yesterday 🌅';
  if (daysPassed <= 7) return `${daysPassed} days ago 🌻`;

  // will only be executed if all the above conditions are false 👇
  return new Intl.DateTimeFormat(currentUser.locale).format(date);
};

// *********************************************
// internationalization numbers --> currency format (reusable function)
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// *********************************************
// Logout timer functionality
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(Math.floor(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    // if time is 0 --> then logout
    if (time <= 0) {
      clearInterval(timer);
      containerApp.style.opacity = '0'; // Logout user
      labelWelcome.textContent = 'Log in to get started'; // resets welcome msg
    }

    time--;
  };

  // start timer in seconds
  let time = 600;

  // call timer every seconds
  tick();
  const timer = setInterval(tick, 1000);
  return timer; // need to return the timer inorder to clear it when we login to a new user
};

// *********************************************
// Displays User movements to the list
// 'movements' is the array of Withdrawals and Deposits for every Account.
const displayMovements = function (currentUser, sort = false) {
  // removes the already existing movements from the list, before we add any new ones.
  containerMovements.innerHTML = '';

  // Creates a copy of the currentUser's movements array and then sorts movements in Ascending order
  const sortMovements = sort
    ? currentUser.movements.slice().sort((a, b) => a - b)
    : currentUser.movements;

  sortMovements.forEach(function (mov, i) {
    // movement dates
    const date = new Date(currentUser.movementsDates[i]);
    const displayDate = formatMovementData(date);

    // internationalization numbers
    const formattedMov = formatCurrency(
      mov,
      currentUser.locale,
      currentUser.currency
    );

    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// *********************************************
// Calculates total movements, and adds the to the 'Current Balance' UI

const calcCurrentBalance = function (currentUser) {
  currentUser.balance = currentUser.movements.reduce(
    (acc, curr) => acc + curr,
    0
  );

  labelBalance.textContent = `${formatCurrency(
    currentUser.balance,
    currentUser.locale,
    currentUser.currency
  )}`;
};

// *********************************************
// Update Summary --> total Deposits, Withdrawals and Interests UI at the bottom

const calcDisplaySummary = function (currentUser) {
  const deposits = currentUser.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const withdrawals = currentUser.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  // bank pays an interest each time there is a deposit
  // bank pays interest, only if interest is atleast 1€
  const interestRate = currentUser.interestRate / 100;
  const interest = currentUser.movements
    .filter(mov => mov > 0)
    .map(mov => mov * interestRate)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumIn.textContent = `${formatCurrency(
    deposits,
    currentUser.locale,
    currentUser.currency
  )}`;
  labelSumOut.textContent = `${formatCurrency(
    Math.abs(withdrawals),
    currentUser.locale,
    currentUser.currency
  )}`;
  labelSumInterest.textContent = `${formatCurrency(
    interest,
    currentUser.locale,
    currentUser.currency
  )}`;
};

//// ****************************
// Update UI function

const updateUI = function (currentUser) {
  displayMovements(currentUser);
  calcCurrentBalance(currentUser);
  calcDisplaySummary(currentUser);
};

// ****************************
// User login functionality

let currentUser, timer;

btnLogin.addEventListener('click', function (event) {
  // Stops the form button from submitting/reloading the page
  event.preventDefault();

  inputLoginUsername.setAttribute('placeholder', 'user');
  inputLoginPin.setAttribute('placeholder', 'PIN');

  currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value);
  console.log('Current User 👨‍💻:', currentUser);

  // 'pin' property will only be read if 'currentUser' exists (optional chaining). Prevents getting an error.
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome Message
    containerApp.style.opacity = '100';
    labelWelcome.textContent = `Welcome, ${currentUser.owner.split(' ')[0]} ${
      currentUser.icon
    }`;

    // update current date and time
    createCurrentDate();

    // Logout Timer
    // CHECKS if there is a timer already running (similar to setting up a singleton in C#)
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Calc Movements, Balance, and Summary
    updateUI(currentUser);

    // Clear User/PIN inputs
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // removes focus from PIN element
  }
});

// *********************************************
// Transfer Money functionality

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault(); // common when working with forms

  const amountToTransfer = Number(inputTransferAmount.value);
  const transferTo = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  console.log(`${transferTo?.owner} --> ${amountToTransfer} 🦢`);

  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    transferTo?.userName !== currentUser.userName &&
    transferTo &&
    amountToTransfer > 0 &&
    amountToTransfer <= currentUser.balance
  ) {
    console.log('Transfer Accepted 🥳');
    // Adding the transfer
    transferTo.movements.push(amountToTransfer);
    currentUser.movements.push(-amountToTransfer);

    // Adding current transfer date
    transferTo.movementsDates.push(new Date().toISOString());
    currentUser.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentUser);
  } else {
    console.log('Transfer DENIED!! ⛔');
  }

  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

// *********************************************
// Close Account functionality

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    currentUser.userName === inputCloseUsername.value &&
    currentUser.pin === Number(inputClosePin.value)
  ) {
    console.log(`${currentUser.owner} --> Account Deleted! 💀`);

    const index = accounts.findIndex(
      acc => acc.userName === inputCloseUsername.value
    );

    accounts.splice(index, 1); // deletes account from original array
    containerApp.style.opacity = '0'; // Logout user
    labelWelcome.textContent = 'Log in to get started'; // resets welcome msg
  } else {
    console.log(`Wrong Username or Pin! 🛑`);
  }

  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

// *********************************************
// Request Loan functionality

// The bank grants a loan, only if there is at least one deposit with at least 10% of the requested loan amount.

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  // getting loan amount requested
  const requestedLoan = Math.floor(inputLoanAmount.value);

  // returns true if loan requested is at least 10% of one deposit.
  const loanRequirement = currentUser.movements.some(
    mov => mov >= requestedLoan * 0.1
  );

  if (requestedLoan > 0 && loanRequirement) {
    console.log('Processing Requested Loan... 🐼');
    setTimeout(() => {
      console.log('Loan Granted! 👍');

      // Adding requested loan
      currentUser.movements.push(requestedLoan);

      // Adding current requested loan date
      currentUser.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentUser);
    }, 2000);
  } else {
    console.log('Loan DENIED! 😂');
  }

  inputLoanAmount.value = '';
  inputLoanAmount.blur();

  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

// *********************************************
// Sort button functionality

let sortedState = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();

  displayMovements(currentUser, !sortedState);
  sortedState = !sortedState;

  sortedState
    ? console.log('Movements Sorted! 🙌')
    : console.log('Movements NOT Sorted! 😡');
});
