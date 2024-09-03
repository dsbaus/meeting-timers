let countdownInterval;
let targetTime;
let countdownActive = false;

const countdownDisplay = document.getElementById('countdown');
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

// Set the time input to the nearest time divisible by 5 minutes ahead of the current time
function setNearestTimeDivisibleByFive() {
    const now = new Date();
    let minutes = now.getMinutes();
    minutes = Math.ceil(minutes / 5) * 5;
    if (minutes === 60) {
        minutes = 0;
        now.setHours(now.getHours() + 1);
    }
    const hours = now.getHours().toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
}

function calculateTimeRemaining() {
    const now = new Date();
    const targetDateTime = new Date(now.toDateString() + ' ' + targetTime);

    const timeDifference = targetDateTime - now;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = '00:00:00';
        stopButton.disabled = true;
        startButton.disabled = false;
    } else {
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');

        countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

function startCountdown() {
    targetTime = timeInput.value;
    countdownActive = true;
    calculateTimeRemaining();
    countdownInterval = setInterval(calculateTimeRemaining, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopCountdown() {
    clearInterval(countdownInterval);
    countdownActive = false;
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = '00:00:00';
    startButton.disabled = false;
    stopButton.disabled = true;
    countdownActive = false;
}

window.onload = function() {
    setNearestTimeDivisibleByFive();
};

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);
resetButton.addEventListener('click', resetCountdown);