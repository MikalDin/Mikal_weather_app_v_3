const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='4b1cc29c3bce1f7c0e85aea3949c5c931';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

                // Using the different OpenWeatherMap API endpoints based on geolocation
        // 1. By city name
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                 console.log(data);
                showWeatherData(data);
        });
            // 2. By city name and country code
            fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name},{country code}&appid=${API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // Process and display the data as needed
    });
     // 3. By city name, state code, and country code
     fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name},{state code},{country code}&appid=${API_KEY}`)
     .then((res) => res.json())
     .then((data) => {
         console.log(data);
         // Process and display the data as needed
     });
    });
}

const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');

locationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = locationInput.ariaValueMax.trim();

            if (location) {
                getWeatherDataByLocation(location);
                locationInput.value = '';
            } else {
                alert('Please enter a location');
            }
});

function getWeatherDataByLocation(location) {
            fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&appid=${API_KEY}`)
}                   .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        showWeatherData(data);
                    })
            .catch((error) => {
                console.error('Error fetching weather data', error);
            });
        

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}