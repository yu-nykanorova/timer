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

    const startCount = document.querySelectorAll(".counter-value");
    
    startCount.forEach((item) => {
        console.log(item.textContent);
    })
    
});