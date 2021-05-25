'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// Consuming Promises with Async/Await
// Error Handling With try...catch

const getPosition = function () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  
  // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res))
  
  const whereAmI = async function () {
      // Geolocation
      const pos = await getPosition();
      const { latitude: lat, longitude: lng } = pos.coords;
  
      // Reverse geocoding
      const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      if (!resGeo.ok) throw new Error('Problem getting location data');
  
      const dataGeo = await resGeo.json();
      console.log(dataGeo);
  
      // Country data
      const res = await fetch(
        `https://restcountries.eu/rest/v2/name/portugal`
      );

  
      const data = await res.json();
      console.log(data);
      renderCountry(data[0]);
  };
  whereAmI();

  console.log('FIRST');
 
  