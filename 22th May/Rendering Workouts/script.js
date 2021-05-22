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
////////////////////////////////////////////////////////////////////

class WorkOut {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    constructor(coords, distance, duration){
        this.coords = coords;       //[lat, lng]
        this.distance = distance;   //in km
        this.duration = duration;   //in min       
        
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}

class Running extends WorkOut {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace(){
        //min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends WorkOut {
    type = 'cycling';
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration);
        this.elevation = elevation;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed(){
        //min/km
        this.speed = this.distance / (this.duration / 60 );
        return this.speed;
    }
}
///////////////////////////////////////////////////
//check workout in console 
const run1 = new Running([39, -12], 5.2, 24, 178);
const cyc1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1);
// console.log(cyc1);
///////////////////////////////////////////////////////////
// Application Architecture
class App{
    #map;
    #mapEvent;
    #workouts = [];
    constructor() {
        this._getPostition();
        //EventListeners
            form.addEventListener('submit', this._newWorkout.bind(this));
        //change cycling & Running
            inputType.addEventListener('change', this._toggleElevationField);

    }

    _getPostition() {
        //get geolocation API
        if(navigator.geolocation){

        // function (Success Callback, Error Callback)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function (){
                alert(`could not get your Loaction`);
            });
        }
    }

    _loadMap(position) {
        //Success Function
            // console.log(position);
            const {latitude} = position.coords;     //destructuring - create variable
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
        //check if data is valid
        const validInputs=(...inputs)=>inputs.every(inp=>Number.isFinite(inp)); 

        const allPositive=(...inputs)=>inputs.every(inp=>inp>0); 
    
        // Get data from FORM
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat , lng} = this.#mapEvent.latlng;
        let workout;
        
        

        //if activity running, create running object
        if(type === 'running') {
            const cadence = +inputCadence.value;
            
            if(!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert('Inputs have to be Positive Numbers..!');    

                workout = new Running([lat , lng], distance, duration, cadence);
                
        }
        //if activity running, create cycling object
        if(type === 'cycling') {
            const elevation = +inputElevation.value;
            //check if data is valid
            if(!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
                return alert('Inputs have to be Positive Numbers..!');

                workout = new Cycling([lat , lng], distance, duration, elevation);
        }

        
        
        //Add new object to workout array
        this.#workouts.push(workout);
        console.log(workout);
        
        //Render workout on map as marker
        this._renderWorkoutMarker(workout);
        // const {lat , lng} = this.#mapEvent.latlng;
       

        //Render workout on list
        this._renderWorkout(workout);

        //clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ' ';


    }
    _renderWorkoutMarker(workout) {
         // Display the marker
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            })
        )
        .setPopupContent(`${workout.distance}`)
        .openPopup();
    }

    _renderWorkout(workout){
        let html = `
        <li class="workout workout--${workout.name}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;    
    }
}
/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//create new object or blueprint
const app = new App();
// app._getPostition();
