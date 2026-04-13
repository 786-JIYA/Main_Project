'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: "sangli",
    movements: ["4", "10", "2", "12", "15"],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'kolhapur',
    movements: ["8", "11", "3", "5", "18"],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "jaisingpur",
    movements: ["7:30", "08:00", "09:40", "05:00", "09:45", "10:00"],
    interestRate: 0.7,
    pin: 3333,

};

const account4 = {
    owner: 'kagal',
    movements: ["4:30", "10:00", "7:00", "05:00", "09:45"],
    interestRate: 1,
    pin: 4444,
};

const sanglitokolhapur = {
    owner: 'sangli',
    movements: ["Bus No.4", "Bus No.2", "Bus No.12", "Bus No.1", "Bus No.10", "Bus No.5"],
    interestRate: 71,
    pin: 4444,
}

const Punetomumbai = {
    owner: 'Pune',
    movements: ["2:30 pm", "3:00 am", "5:00 pm", "6:30 pm", "07:00 pm", "8:00 am", "10:00 am", "11:45 am"],
    interestRate: 542,
    pin: 4444,
}

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const login = document.querySelector('.login');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferFrom = document.querySelector('.form__input--from');
const inputTransferWhere = document.querySelector('.form__input--where');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

//Bismillah-Stops
const stop = {
  name: "Market Yard",
  lat: 16.7105,
  lng: 74.2500
};

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const showMovements = function (movements) {
    movements.forEach(function (mov, i) {

        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = ` 
            <div class="movements__row">
                 <div class="movements__value" id="stopNo">${inputTransferFrom.value}    ➡️      ${inputTransferWhere.value} </div>
                  <div class="movements__value">  ${mov}</div>
                </div>`

                
        //<div class="movements__value">${mov}</div>
        containerMovements.insertAdjacentHTML('afterbegin', html);

    });
};

// showMovements(account1.movements);


const createusername = function (accs) {
    accs.forEach(acc => {
        acc.username = acc.owner

    });

}

createusername(accounts);

const deposites = movements.filter(function (mov) {
    return mov > 0;
})
console.log(deposites);

const deposit = [];
for (const mov of movements) {
    if (mov > 0) {
        deposit.push(mov);

    }
}

const checkBalance = function (mov) {
    const balance = mov.reduce((acc, bal) => {
        return acc + bal;

    });
    labelBalance.textContent = `${balance} ₹`;
}

// checkBalance(account1.movements)


const checkMax = account2.movements.reduce((acc, mov) => {
    if (acc > mov) return acc;
    else return mov;

}, account2.movements[0])
// console.log(checkMax)

// //////////////challenge-2/////////////
// const dog1 = [5, 2, 4, 1, 15, 8, 3];
// const dog2 = [16, 6, 10, 5, 6, 1, 4];



// const two = 2;
// const hello = dog2.map(function (dog) {
//     if (dog <= 2) {

//         const humanage = dog * 2;
//         return humanage;
//     } else {
//         const humanage = dog * 4 + 16;
//         return humanage
//     }
// });


// const sorted = hello.filter(function (h) {
//     return h >= 18;
// })
// console.log(sorted)

// const sum = sorted.reduce((acc, ele) =>
//     acc + ele / sorted.length, 0)
// console.log(sum)







// showMovements(account1.movements);

// const Mapping = movements.map(function (mov) {
//     return mov * 2;
// })



// const ne = movements.map((mov, i, arr) => {
//     if (mov > 0) {
//         return `Movement ${i + 1} :: You deposited ${mov} .`;
//     }
//     else {
//         return `Movement ${i + 1} :: You withdrew ${Math.abs(mov)} .`
//     }
// });
// console.log(ne);


const accDeposits = function (account) {
    const depo =
        account.movements
            .filter(mov => mov > 0)
            .map((mov, i, arr) => {
                // console.log(arr);
                return mov * 1
            })
            .reduce((acc, mov) => acc + mov, 0);
    // console.log(depo)
    labelSumIn.textContent = `${depo} ₹`;
};

// accDeposits(account1)


const accWithdrew = function (account) {
    const withd =
        account.movements
            .filter(mov => mov < 0)
            .map((mov, i, arr) => {
                // console.log(arr);
                return mov * 1
            })
            .reduce((acc, mov) => acc + mov, 0);
    // console.log(withd)
    labelSumOut.textContent = `${Math.abs(withd)} ₹`

};

// accWithdrew(account1)

const interest = function (money) {
    const hell = money
        .filter(mon => mon > 0)
        .map(dep => dep * 1.2 / 100)
        .reduce((acc, amount) => acc + amount, 0)
    labelSumInterest.textContent = `${hell} ₹`
}
// interest(account1.movements)

let currentaccount;

btnLogin.addEventListener("click", function (h) {
    h.preventDefault();
    currentaccount = accounts.find(acc => acc.username === inputLoginUsername.value);

    if (currentaccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.innerHTML = `Welcome ${currentaccount.owner.split(" ")[0]} !`;
        containerApp.style.opacity = 100;
        interest(currentaccount.movements);
        accWithdrew(currentaccount);
        accDeposits(currentaccount);
        //checkBalance(currentaccount.movements);
        //showMovements(currentaccount.movements);
    }

})

let senderaccount;

btnTransfer.addEventListener("click", function (h) {
    h.preventDefault();
    if (inputTransferFrom.value == "sangli" && inputTransferWhere.value == "college") {
        
        showMovements(sanglitokolhapur.movements);
        const hl = ` <div class="movements">
        <div class="movements__row">
           
           <div class="movements__value"> ${inputTransferFrom.value} → ${inputTransferWhere.value} at</div>
            <div class="movements__value">${mov}</div>
        </div>`

        containerMovements.insertAdjacentHTML('afterbegin', hl);
    }
    if (inputTransferFrom.value == "kolhapur" && inputTransferWhere.value == "college") {
        // labelBalance.innerHTML = `Rate : ${Punetomumbai.interestRate}₹`;
        showMovements(Punetomumbai.movements);
        const hl = ` <div class="movements">
        <div class="movements__row">

           <div class="movements__value">${inputTransferFrom.value} → ${inputTransferWhere.value} at</div>
            <div class="movements__value">${mov}</div>
        </div>`

        containerMovements.insertAdjacentHTML('afterbegin', hl);

    }
    labelBalance.innerHTML = `Rate : ${Punetomumbai.interestRate}₹`;
    showMovements(Punetomumbai.movements);
    const hl = ` <div class="movements">
        <div class="movements__row">

           <div class="movements__value">${inputTransferFrom.value} → ${inputTransferWhere.value} at</div>
            <div class="movements__value">${mov}</div>
        </div>`

    containerMovements.insertAdjacentHTML('afterbegin', hl);


}
)
//Bismillah Hir-Rahmaan Nir-Raheem
//09/04/2026

containerMovements.addEventListener("click", function (e) {
  const row = e.target.closest(".movements__row");

  if (!row) return;

  const index = row.dataset.index;

  console.log("Clicked row:", index);

  // redirect to another page
  window.location.href = `/stops`;
});

