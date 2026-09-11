let cityInput = document.querySelector("#city");
let submitBtn = document.querySelector("#submit");
const weatherContainer = document.querySelector("#weather");

let lastCity = "";
let controller = null;

submitBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (!city) {
        weatherContainer.innerHTML = "Enter City name to See Weather";
        return;
    }

    lastCity = city;
    getWeather(city);
});

async function getWeather(city) {

    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    weatherContainer.innerHTML = "<p><b>Loading Weather...</b></p>";

    try {

        const geocodingUrl =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;

        const locationResponse = await fetch(geocodingUrl, {
            signal: controller.signal
        });

        if (!locationResponse.ok) {
            throw new Error("Failed to find the city.");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found.");
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        const weatherResponse = await fetch(weatherUrl, {
            signal: controller.signal
        });

        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather data.");
        }

        const weatherData = await weatherResponse.json();

        weatherContainer.innerHTML = `
            <h3>${location.name}, ${location.country}</h3>

            <p>
                Temperature:
                ${weatherData.current.temperature_2m}
                °C
            </p>

            <p>
                Humidity:
                ${weatherData.current.relative_humidity_2m}
                %
            </p>

            <p>
                Wind Speed:
                ${weatherData.current.wind_speed_10m}
                km/h
            </p>
        `;

    } catch (error) {

        if (error.name === "AbortError") {
            console.log("Previous request was cancelled.");
            return;
        }

        weatherContainer.innerHTML = `
            <p>${error.message}</p>

            <button id="retry">
                Retry
            </button>
        `;
    }
}

weatherContainer.addEventListener("click", (event) => {

    if (event.target.id === "retry") {
        getWeather(lastCity);
    }
});

