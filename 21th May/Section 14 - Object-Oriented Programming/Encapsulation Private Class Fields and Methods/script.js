'use strict';

class Account {

  // Public fields (instances)// not in prototype
  locale = navigator.language;

  //  Private fields (instances) // not in prototype
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;

    //protected property
    this.#pin = pin;
    this.#movements = [];//to make private(not truly)
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public Method

  // Public interface
  getMovements(){
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }
  

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }

  static helper() {
    console.log('Helper');
  }


  // Private Methods
  #approveLoan(val){    //protected
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1._movements.push(250);
// console.log(acc1.#movements.push(-140)); //to check
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
// acc1.#approveLoan(1000);    //out sidde class private not works
console.log(acc1.getMovements());

console.log(acc1);

// console.log(acc1.#movements);//to check private
// console.log(acc1.#pin);


Account.helper();