const apiKey = '19566ef8e8bb63e97cff15997d616c46';
const cityInput = document.getElementById('cityInput');
const addCityBtn = document.getElementById('addCityBtn');
const weatherList = document.getElementById('weatherList');

const maxCities = 10;
let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];

savedCities.forEach(city => fetchWeather(city));

addCityBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    if (savedCities.includes(city)) {
        alert('City is already saved.');
        return;
    }
    if (savedCities.length >= maxCities) {
        alert('You can only save up to 10 cities.');
        return;
    }

    savedCities.push(city);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    fetchWeather(city);
    cityInput.value = '';
});

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(city, data);
        })
        .catch(error => {
            alert(`Error fetching weather for ${city}: ${error.message}`);
        });
}

function displayWeather(city, data) {
    const { main, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

    const cityDiv = document.createElement('div');
    cityDiv.className = 'city';
    cityDiv.innerHTML = `
        <div>
            <h3>${city}</h3>
            <p>Temp: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
        </div>
        <img src="${icon}" alt="${weather[0].description}" />
        <button onclick="removeCity('${city}')">Remove</button>
    `;
    weatherList.appendChild(cityDiv);
}

function removeCity(city) {
    savedCities = savedCities.filter(c => c !== city);
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    weatherList.innerHTML = '';
    savedCities.forEach(fetchWeather);
}