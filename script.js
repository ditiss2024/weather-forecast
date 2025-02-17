const apiKey = "2c32aab8ef5ffee04428152bd3d653a1";  // Replace with your API Key

async function getWeather(city = null, lat = null, lon = null) {
    let url = "";
    
    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
        document.getElementById("error-message").innerText = "Please enter a city!";
        document.getElementById("error-message").classList.remove("hidden");
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById("error-message").classList.add("hidden");

            document.getElementById("weather-info").classList.remove("hidden");
            document.getElementById("location").innerText = `📍 ${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp}°C`;
            document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `💨 Wind: ${data.wind.speed} m/s`;
            document.getElementById("weather-description").innerText = data.weather[0].description;

            // Update weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById("weather-icon").src = iconUrl;
            document.getElementById("weather-icon").classList.remove("hidden");
        } else {
            document.getElementById("weather-info").classList.add("hidden");
            document.getElementById("error-message").innerText = "City not found. Try again!";
            document.getElementById("error-message").classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("error-message").innerText = "Error fetching weather data.";
        document.getElementById("error-message").classList.remove("hidden");
    }
}

// 📍 Get Location Using Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => getWeather(null, position.coords.latitude, position.coords.longitude),
            (error) => {
                document.getElementById("error-message").innerText = "Location access denied!";
                document.getElementById("error-message").classList.remove("hidden");
            }
        );
    } else {
        document.getElementById("error-message").innerText = "Geolocation is not supported by your browser!";
        document.getElementById("error-message").classList.remove("hidden");
    }
}
