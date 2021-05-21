'use strict';

class Account {

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    //protected property
    this._pin = pin;
    this._movements = [];//to make private(not truly)
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface
  getMovements(){
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val){
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250);
console.log(acc1._movements.push(-140));
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// console.log(acc1._approveLoan(1000));
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1._pin);