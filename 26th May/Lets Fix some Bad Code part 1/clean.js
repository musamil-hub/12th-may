const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'ajmal' },
  { value: -45, description: 'Groceries 🥑', user: 'ajmal' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'ajmal' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'ajmal' },
  { value: -1100, description: 'New iPhone 📱', user: 'ajmal' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'ajmal' },
];

const spendingLimits = {
  ajmal: 1500,
  matilda: 100,
};

const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpense = function (value, description, user='ajmal') {
  user = user.toLowerCase();

  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
// console.log(budget);

const checkExpenses = function () {
  for (const entry of budget)
    // const limit=spendingLimits?.[entry.user]??0;
    if (entry.value < -getLimit(entry.user)) 
      entry.flag = 'limit';
};
checkExpenses();

// console.log(budget);

const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget)
    output +=entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  output = output.slice(0, -2);
  console.log(output);
};
console.log(budget);
logBigExpenses(500);