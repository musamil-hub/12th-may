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
let map, mapEvent;
if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        //Success
        function (position){
            // console.log(position);
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.co.in/maps/@${latitude},${longitude}`);

            const coords = [latitude,longitude]

            map = L.map('map').setView(coords, 13); //13 is zooming level
            // console.log(map); //display leaflet library
        
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //org/ style of the map to fr/hot/
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            //Handling clicks on map
            map.on('click', function(mape){                 //on is coming form leaflet library and its a eventListener
                mapEvent = mape;
                form.classList.remove('hidden');
                inputDistance.focus();
            // console.log(mapEvent);
            
            });
        },

        //error    
        function (){
            alert(`could not get your Loaction`);
        }
    );

    form.addEventListener('submit', function(e){
        //clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ' ';
        // Display the marker
        e.preventDefault();
        console.log(mapEvent);
            const {lat , lng} = mapEvent.latlng;


                L.marker([lat , lng]).addTo(map)
                    .bindPopup(L.popup({
                        maxWidth: 250,
                        minWidth: 100,
                        autoClose: false,
                        closeOnClick: false,
                        className: 'running-popup',
                    })
                )
                .setPopupContent('WorkOut')
                .openPopup();
    });


    //change cycling & Running
    inputType.addEventListener('change', function(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    });
