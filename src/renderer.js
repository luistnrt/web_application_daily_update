document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.getElementById("greeting");
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
  
    typeEffect(() => {
      setTimeout(fetchWeather, 1000);
    });
  });
  
  async function fetchWeather() {
    const apiKey = "f11d1c21a5224969ba1125948253003";
    const city = "Heidelberg";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      console.log("Weather Data:", data);
  
      const currentTemp = data.current.temp_c;
      const condition = data.current.condition.text;
      const iconUrl = data.current.condition.icon;
      const high = data.forecast.forecastday[0].day.maxtemp_c;
      const low = data.forecast.forecastday[0].day.mintemp_c;
      const humidity = data.current.humidity;
      const windSpeed = data.current.wind_kph;
      const windDir = data.current.wind_dir;
      const uvIndex = data.current.uv;
  
      const weatherHeader = `Heidelberg: ${condition}`;
      const temperatureInfo = `Currently: ${currentTemp}°C | High: ${high}°C | Low: ${low}°C`;
      const additionalInfo = `Humidity: ${humidity}% | Wind: ${windSpeed} km/h ${windDir} | UV Index: ${uvIndex}`;
  
      displayWeatherText(weatherHeader, temperatureInfo, additionalInfo, iconUrl);
    } catch (error) {
      console.error("Weather fetch error:", error);
      displayWeatherText("Unable to fetch weather data.");
    }
  }
  
  function displayWeatherText(header, tempInfo, addInfo, iconUrl) {
    const weatherContainer = document.getElementById("weather");
  
    // Clear previous content
    weatherContainer.innerHTML = "";
  
    const weatherHeader = document.createElement("h2");
    weatherHeader.textContent = header;
  
    const weatherIcon = document.createElement("img");
    weatherIcon.src = "https:" + iconUrl;
    weatherIcon.style.width = "50px";
    weatherIcon.style.height = "50px";
    weatherIcon.style.marginRight = "10px";
  
    const temperatureInfo = document.createElement("p");
    temperatureInfo.textContent = tempInfo;
    temperatureInfo.style.fontWeight = "bold";
  
    const additionalInfo = document.createElement("p");
    additionalInfo.textContent = addInfo;
  
    weatherContainer.appendChild(weatherHeader);
    weatherContainer.appendChild(weatherIcon);
    weatherContainer.appendChild(temperatureInfo);
    weatherContainer.appendChild(additionalInfo);
  }
  