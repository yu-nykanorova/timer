"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const deadline = "2026 1 1";

    // timer
    
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const time = Date.parse(endtime) - Date.parse(new Date());

        if (time <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24));
            hours = Math.floor((time / (1000 * 60 *60)) % 24);
            minutes = Math.floor((time / (1000 * 60)) % 60);
            seconds = Math.floor((time / 1000) % 60);
        }
        
        return {
            "total": time,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        }
    }

    function addZero(value) {
        if (value < 10) {
            return `0${value}`;
        }
        return value;
    }

    function setTimeRemaining(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        const interval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime() {
            const t = getTimeRemaining(endtime);
            
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(interval);
            } 
        }
    }

    setTimeRemaining("#timer-container", deadline)

    // counters

    const counter = document.querySelectorAll(".counter-value");
    const duration = 2500;

    console.log(Date.now());

    function countUp(startValue, element, maxValue) {
        
        const interval = setInterval(() => {
            startValue++;
            element.textContent = startValue;

            if (startValue >= maxValue) {
                clearInterval(interval);
            }
        }, duration / (maxValue - startValue) );
    }

    counter.forEach((item) => {
        console.log(item.dataset.max);
    });

    counter.forEach((item) => {
        countUp(item.textContent, item, item.dataset.max);
    });

    // fetch for pictures block
    const fetchItems = document.querySelectorAll(".fetch-text");
    console.log(fetchItems);

    fetchItems.forEach((item, index) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${index + 1}`)
            .then(response => response.json())
            .then(data => item.textContent = data.title);
    })
    
    // fetch for weather

    const dateElem = document.getElementById("weather-date");
    const weatherList = document.getElementById("weather-list");

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
        const date = `Weather for today (Kyiv) — ${weather.hourly.time[0].slice(0, 10)}`;

        dateElem.textContent = date;

        weather.hourly.time.map((item, index) => {
            const elem = document.createElement("li");
            const time = document.createElement("span");
            time.setAttribute("id", "weather-time");
            const temper = document.createElement("span");
            temper.setAttribute("id", "weather-temperature");
            const precipit = document.createElement("span");
            precipit.setAttribute("id", "weather-precipitation");

            if (index % 4 === 0) {
                time.textContent = item.slice(11);
                temper.textContent = `${weather.hourly.temperature_2m[index].toFixed(0)}°C`;
                precipit.textContent = `${weather.hourly.precipitation_probability[index]}%`;
                elem.append(time, temper, precipit);
                weatherList.append(elem);
            }
        }); 
    }

    setTemperature();
    
});