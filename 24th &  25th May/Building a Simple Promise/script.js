'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
/////////////////////////////////////////
const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  };
  
  const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    countriesContainer.style.opacity = 1;
  };

///////////////////////////////////////
  
////////////////////////////////////////////////////////////////////
// Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) { //fulfilled
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 3000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//////////////////////////////////////////////////////////////////////////////////////
// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));


  // normal
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
