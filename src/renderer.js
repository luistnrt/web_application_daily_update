document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.getElementById("greeting");
    const weather = document.createElement("div");
    weather.id = "weather";
    document.body.appendChild(weather);
  
    const userName = "Luis";
    const now = new Date();
    const hours = now.getHours();
    const greetingText =
      hours < 12 ? "Good morning" : hours < 18 ? "Good afternoon" : "Good evening";
  
    const fullText = `${greetingText}, ${userName}! Today is ${now.toDateString()}.`;
    let index = 0;
  
    function typeEffect(callback) {
      if (index < fullText.length) {
        greeting.innerHTML = fullText.substring(0, index + 1) + "<span class='cursor'>|</span>";
        index++;
        setTimeout(() => typeEffect(callback), 50);
      } else {
        document.querySelector(".cursor").style.animation = "blink 1s infinite";
        if (callback) callback();
      }
    }
  
    typeEffect(fetchWeather);
  });
  
  async function fetchWeather() {
    const apiKey = "f11d1c21a5224969ba1125948253003";  // Replace with your actual API key
    const city = "Heidelberg";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      console.log("Weather Data:", data);
  
      // Extract high and low temperatures
      const high = data.forecast.forecastday[0].day.maxtemp_c;
      const low = data.forecast.forecastday[0].day.mintemp_c;
      const weatherText = `Today will be a warm day with a high of ${high}°C and a low of ${low}°C.`;
  
      // Display weather text with a typing effect
      displayWeatherText(weatherText);
    } catch (error) {
      console.error("Weather fetch error:", error);
      displayWeatherText("Unable to fetch weather data.");
    }
  }
  
  function displayWeatherText(text) {
    const weather = document.getElementById("weather");
    let index = 0;
  
    function typeWeather() {
      if (index < text.length) {
        weather.innerHTML = text.substring(0, index + 1) + "<span class='cursor'>|</span>";
        index++;
        setTimeout(typeWeather, 50);
      } else {
        document.querySelector(".cursor").style.animation = "blink 1s infinite";
      }
    }
  
    typeWeather();
  }
  