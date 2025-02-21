document.addEventListener("DOMContentLoaded", function () {
    const cityDropdown = document.getElementById("cityDropdown");
    const dropdownButton = document.querySelector(".dropbtn");
    
    // Show/hide dropdown on button click
    dropdownButton.addEventListener("click", function () {
        cityDropdown.style.display = cityDropdown.style.display === "block" ? "none" : "block";
    });
    
    // Dropdown Click Event
    cityDropdown.addEventListener("click", function (event) {
        if (event.target.classList.contains("city-option")) {
            const selectedCity = event.target.dataset.city;
            getWeather(selectedCity);
            
            // Apply pop animation
            cityDropdown.style.animation = "popOut 0.3s ease-out";
            setTimeout(() => {
                cityDropdown.style.display = "none";
                cityDropdown.style.animation = "";
            }, 300);
        }
    });
    
    // Load Kathmandu weather by default
    getWeather("Kathmandu");
});

// Fetch Weather Data
function getWeather(city) {
    const apiKey = "f9677253be604a2bbcf80835252102"; // Replace with your WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=en`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("weatherInfo").style.display = "block";
            document.getElementById("location").innerText = `${data.location.name}, ${data.location.country}`;
            document.getElementById("temperature").innerText = `🌡️ ${data.current.temp_c}°C`;
            document.getElementById("description").innerText = `☁️ ${data.current.condition.text}`;
            document.getElementById("weatherIcon").src = data.current.condition.icon;

            // Update date and time with fade-in animation
            updateDateTime();
        })
        .catch(error => {
            alert("City not found. Try again!");
            console.error("Error fetching weather data:", error);
        });
}

// Search Box Function
function searchWeather() {
    const city = document.getElementById("cityInput").value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name!");
    }
}

// Update Date and Time
function updateDateTime() {
    const date = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    const dateTimeString = date.toLocaleString('en-US', options); // Format the date and time

    document.getElementById('dateTime').textContent = dateTimeString; // Display date and time

    // Trigger the animation for date and time display
    document.getElementById('dateTime').style.animation = "fadeIn 1s ease-out 1s forwards";
}
