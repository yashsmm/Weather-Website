async function getWeather() {
  const apiKey = 'c5e07e8a9582d78311d423fc4334ab5b';
  const city = document.getElementById('city').value;

  if (!city) {
      alert('Please enter a city');
      return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  try {
      const currentWeatherResponse = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherResponse.json();
      displayWeather(currentWeatherData);

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
      displayHourlyForecast(forecastData.list);
  } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
  }
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  // Clear previous content
  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const temperatureHTML = `<p>${temperature}°C</p>`;
      const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;

      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;
      weatherIcon.style.display = 'block'; 
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const next24Hours = hourlyData.slice(0, 8); 

  hourlyForecastDiv.innerHTML = ''; // 

  next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); 
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); 
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
          <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
          </div>
      `;

      hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}
