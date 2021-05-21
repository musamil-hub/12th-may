'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
///////////////////////////////////////////////////////////
// Using the Geolocation API

if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function (position){
            console.log(position);
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.co.in/maps/@${latitude},${longitude}`);

            const coords = [latitude,longitude]

            var map = L.map('map').setView(coords, 13); //13 is zooming level
        
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //org/ style of the map to fr/hot/
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker(coords).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();
            },
        function (){
            alert(`could not get your Loaction`);
        }
    );
