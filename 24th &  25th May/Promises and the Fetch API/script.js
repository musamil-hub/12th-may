'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Our First AJAX Call - XMLHttpRequest

const renderCountry= function(data, className = ''){
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
/////////////////////////////////////////////////////////////////////////////////////////////////
const getCountryAndNeighbour = function (country) {
    const request = new XMLHttpRequest();
    // request.open('GET', `https://restcountries.eu/rest/v2/alpha/${country}`);
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();  //wait for get data country
  
      request.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        // Render Country
        renderCountry(data);
        
        // Get Neighbour Country 2
        const [neighbour] = data.borders;   ///callback Hell

        if(!neighbour) return;
        // Ajax call Country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener('load', function () {
          const data2 = JSON.parse(this.responseText);
          console.log(data2);

          // Render Country
          renderCountry(data2, 'neighbour');
        });
      });
  };
  
  getCountryAndNeighbour('portugal');   //name     
//getCountryAndNeighbour('ind');     //alpha - code
//////////////////////////////////////////////////////////////////////////////

// Promises and the Fetch API


const request3 = fetch('https://restcountries.eu/rest/v2/name/portugal')
console.log(request3);