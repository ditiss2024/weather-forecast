const apiKey = "1ce97ae4bc88717c923cd9d97d247b37";  // Replace with your actual API Key

async function getWeather(city = "", lat = null, lon = null) {
    let url = "";

    if (city && city.trim() !== "") {
        // ✅ Construct API URL for city search
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        // ✅ Construct API URL for geolocation
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
        showError("Please enter a city!");
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            showWeather(data);
        } else {
            showError("City not found! Try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("Network error. Please try again later.");
    }
}

// 📍 Get Weather by User Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => getWeather("", position.coords.latitude, position.coords.longitude),
            (error) => showError("Location access denied!")
        );
    } else {
        showError("Geolocation is not supported by your browser!");
    }
}

// ✅ Function to Update UI with Weather Data
function showWeather(data) {
    document.getElementById("error-message").classList.add("hidden");
    document.getElementById("weather-info").classList.remove("hidden");

    document.getElementById("location").innerText = `📍 ${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `💨 Wind: ${data.wind.speed} m/s`;
    document.getElementById("weather-description").innerText = data.weather[0].description;

    // 🌤 Update Weather Icon
    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weather-icon").classList.remove("hidden");
}

// ❌ Function to Show Errors
function showError(message) {
    document.getElementById("error-message").innerText = message;
    document.getElementById("error-message").classList.remove("hidden");
    document.getElementById("weather-info").classList.add("hidden");
}
