"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const weatherContainer = document.createElement("div");
    const list = document.createElement("ul");
    const dateElem = document.createElement("h3");
    container.append(weatherContainer);
    weatherContainer.append(dateElem);
    weatherContainer.append(list);

    async function getWeather() {
        try {
          const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability&forecast_days=1");
          const data = await response.json();
          return data; 
        } catch (error) {
            console.log("Error:", error);
        }
    };

    async function setTemperature() {
        const weather = await getWeather();
        console.log(weather);
        const date = `Weather for totday, ${weather.hourly.time[0].slice(0, 10)}`;

        dateElem.textContent = date;

        weather.hourly.time.map((item, index) => {
            const elem = document.createElement("li");
            if (index % 4 === 0) {
                elem.textContent = `${item.slice(11)} — ${weather.hourly.temperature_2m[index].toFixed(0)}°C — ${weather.hourly.precipitation_probability[index]} (%, precipitation probability)`;
                list.append(elem);
            }
        }); 
    }

    setTemperature();

});