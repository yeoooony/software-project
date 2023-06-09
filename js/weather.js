const weather = document.querySelector(".weather-info");
const city = document.querySelector(".weather-city");
const weatherIcon = document.querySelector(".weather-icon");
const humidity = document.querySelector(".weather-humidity");
const tempMax = document.querySelector(".weather-tempmax");
const tempMin = document.querySelector(".weather-tempmin");
const API_KEY = "26518fbfd031afbda8dee033ebc207d7";

const weatherIconList = {
  "01": "fa solid fa-sun",
  "02": "fa solid fa-cloud",
  "03": "fa solid fa-cloud",
  "04": "fa solid fa-cloud",
  "09": "fa solid fa-cloud-rain",
  10: "fa solid fa-cloud-showers-heavy",
  11: "fa solid fa-cloud-bolt",
  13: "fa solid fa-snowflake",
  50: "fa solid fa-smog",
};

const weatherTexts = {
  Clear: "맑음",
  Clouds: "구름",
  Rain: "비",
  Drizzle: "이슬비",
  Thunderstorm: "뇌우",
  Snow: "눈",
  Mist: "안개",
  Smoke: "연기",
  Haze: "연무",
  Dust: "먼지",
  Fog: "안개",
  Sand: "모래",
  Ash: "재",
  Squall: "돌풍",
  Tornado: "토네이도",
};

function onGeoSuccess(position) {
  const lat = position.coords.latitude; //위도
  const lon = position.coords.longitude; //경도
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`; //현재 위치의 현재 날씨
  const temp = `https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const icon = data.weather[0].icon.substr(0, 2);
      weatherIcon.innerHTML = `<i class="${weatherIconList[icon]}"></i>`;
      const weatherMain = data.weather[0].main;
      weather.textContent = `${weatherTexts[weatherMain]} / ${data.main.temp}º`;
      city.textContent = data.name;
      humidity.innerHTML = `<i class="fa-solid fa-droplet"></i><span>${data.main.humidity}%</span>`;
    });
  fetch(temp)
    .then((response) => response.json())
    .then((data) => {
      tempMax.innerHTML = `<i class="fa-solid fa-temperature-high"></i><span>${Math.floor(
        data.daily[0].temp.max
      )}º</span>`;
      tempMin.innerHTML = `<i class="fa-solid fa-temperature-low"></i><span>${Math.floor(
        data.daily[0].temp.min
      )}º</span>`;

      const tomorrowMax = Math.floor(data.daily[1].temp.max);
      const tomorrowMin = Math.floor(data.daily[1].temp.min);
      const afterTomorrowMax = Math.floor(data.daily[2].temp.max);
      const afterTomorrowMin = Math.floor(data.daily[2].temp.min);

      const weatherDaily = document.querySelector(".weather-daily");
      weatherDaily.innerHTML = `
        <span class="weather-tempmax">
          <span>내일 ${tomorrowMax}º</span>
        </span>
        <span class="weather-tempmin">
          <span>${tomorrowMin}º</span>
        </span>
        <br>
        <span class="weather-tempmax">
          <span>모레 ${afterTomorrowMax}º</span>
        </span>
        <span class="weather-tempmin">
          <span>${afterTomorrowMin}º</span>
        </span>
      `;
    });
}

function onGeoError() {
  alert("위치정보를 찾을 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
