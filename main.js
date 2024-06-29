
const apiKey = "dc30584c2e934cd2ba7200327242706";
const searchInput = document.getElementById("search");
const forecastContainer = document.getElementById("forecast");

let lastSearchedCity = "Cairo"; 
let dropList = document.querySelector("#drop-list")
let mobilNav = document.querySelector("#mobil-nav")
dropList.addEventListener("click", function() {
    mobilNav.classList.toggle("show")
})

window.addEventListener('load', () => {
    getWeather(lastSearchedCity);
});

searchInput.addEventListener("input", () => {
    const location = searchInput.value.trim();

    if (location) {
        getWeather(location);
        lastSearchedCity = location;
    } else {
        getWeather(lastSearchedCity);
    }
});

function getWeather(location) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching the weather data:", error);
        });
}

function displayWeather(data) {
    const { location, current, forecast } = data;
    const today = forecast.forecastday[0];
    const tomorrow = forecast.forecastday[1];
    const dayAfterTomorrow = forecast.forecastday[2];

    forecastContainer.innerHTML = `
         <div class="col-sm-12 col-lg-4 px-0">
        <div class="today forecast">
            <div class="forecast-header" id="today">
                <div class="info-time">
                    <div class="day">${new Date(today.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                    <div class="date">${new Date(today.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="forecast-content" id="current">
                    <div class="location">${location.name}</div>
                    <div class="degree">
                        <div class="num">${current.temp_c}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                            <img src="https:${current.condition.icon}" alt="" width="90">
                        </div>
                    </div>
                    <div class="custom">${current.condition.text}</div>
                    <span><img src="image/icon-umberella.png" alt="">${current.precip_mm}mm</span>
                    <span><img src="image/icon-wind.png" alt="">${current.wind_kph}km/h</span>
                    <span><img src="image/icon-compass.png" alt="">${current.wind_dir}</span>
                </div>
            </div>
        </div>
    </div>
        
        <div class="test col-sm-12 col-lg-4 pb-2 px-0">
        <div class="forecast">
            <div class="forecast-header">
                <div class="day">${new Date(tomorrow.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https:${tomorrow.day.condition.icon}" alt="" width="48">
                </div>
                <div class="degree">${tomorrow.day.maxtemp_c}<sup>o</sup>C</div>
                <small>${tomorrow.day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${tomorrow.day.condition.text}</div>
            </div>
        </div>
    </div>
        <div class="col-sm-12 col-lg-4 pb-2 px-0">
        <div class="forecast">
            <div class="forecast-header">
                <div class="day">${new Date(dayAfterTomorrow.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https:${dayAfterTomorrow.day.condition.icon}" alt="" width="48">
                </div>
                <div class="degree">${dayAfterTomorrow.day.maxtemp_c}<sup>o</sup>C</div>
                <small>${dayAfterTomorrow.day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${dayAfterTomorrow.day.condition.text}</div>
            </div>
        </div>
    </div>
    `;
}
