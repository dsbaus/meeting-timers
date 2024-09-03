let countdownInterval;
let targetTime;
let countdownActive = false;

const countdownDisplay = document.getElementById('countdown');
const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

// Set the time input to the current time when the page loads
function setCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeInput.value = `${hours}:${minutes}`;
}

function calculateTimeRemaining() {
    const now = new Date();
    const targetDateTime = new Date(now.toDateString() + ' ' + targetTime);

    if (targetDateTime < now) {
        targetDateTime.setDate(targetDateTime.getDate() + 1);
    }

    const timeDifference = targetDateTime - now;

    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString().padStart(2, '0');

    countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = '00:00:00';
        stopButton.disabled = true;
        startButton.disabled = false;
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
    setCurrentTime(); // Reset time input to the current time
}

window.onload = function() {
    setCurrentTime();
};

startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopCountdown);
resetButton.addEventListener('click', resetCountdown);