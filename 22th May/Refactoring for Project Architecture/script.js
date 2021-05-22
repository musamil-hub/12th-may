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


// let map, mapEvent;
///////////////////////////////////////////////////////////
class App{
    #map;
    #mapEvent;
    constructor() {
        this._getPostition();
        //EventListeners
            form.addEventListener('submit', this._newWorkout.bind(this));
        //change cycling & Running
            inputType.addEventListener('change', this._toggleElevationField);

    }

    _getPostition() {
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function (){
                alert(`could not get your Loaction`);
            }
        );
    }

    _loadMap(position) {
        //Success Function
            // console.log(position);
            const {latitude} = position.coords;
            const {longitude} = position.coords;
            console.log(`https://www.google.co.in/maps/@${latitude},${longitude}`);

            const coords = [latitude,longitude]

            this.#map = L.map('map').setView(coords, 13); //13 is zooming level
            // console.log(map); //display leaflet library
        
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //org/ style of the map to fr/hot/
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
            
            //Handling clicks on map
            this.#map.on('click', this._showForm.bind(this));
    }
    _showForm(mape) {
        this.#mapEvent = mape;
            form.classList.remove('hidden');
            inputDistance.focus();
    }

    _toggleElevationField(e) {
        e.preventDefault();
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(e) {
        e.preventDefault();
        //clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ' ';

        // Display the marker
        
        // console.log(this.#mapEvent);
            const {lat , lng} = this.#mapEvent.latlng;

                L.marker([lat , lng]).addTo(this.#map)
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
    }
}




///////////////////////////////////////////////////////////////////////////////////////
//create new object or blueprint
const app = new App();
// app._getPostition();


/////////////////////////////////////////////////////////////////////////////////////////
