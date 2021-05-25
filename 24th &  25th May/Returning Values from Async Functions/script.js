'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};


const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/ind`
    );

    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[1]);

    return `you r in ${dataGeo.city}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    //reject promise returned from async function
    throw err; 
  }
};

console.log('1 console');
(async function(){
  try {
    const city=await whereAmI();
    console.log(city);
  }catch(err){
    console.error(`2:${err.message}`)
  }
  console.log(`3 console`);
})();


// //eventhough the catch is avaliable the ajax if fullfilled in a function so then statement is executed
// console.log('1 console');
// whereAmI()
// .then(city=>console.log(city))
// .catch(err=>console.error(`2:${err.message}`))
// .finally(()=>console.log(`3 console`));

// //async always return the promise not the value we return in function bcz function is running not return, so console return the promise
// console.log('1 console');
// const city=whereAmI();
// console.log(city);
// console.log('3 console');
