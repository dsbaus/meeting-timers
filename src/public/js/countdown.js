let timerInterval;
let timeRemaining;

const timerInput = document.getElementById('timerInput');
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    timeRemaining = parseInt(timerInput.value, 10) * 60; // Convert minutes to seconds
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            stopButton.disabled = true;
            startButton.disabled = false;
        }
    }, 1000);

    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeRemaining = parseInt(timerInput.value, 10) * 60;
    updateTimerDisplay();
    startButton.disabled = false;
    stopButton.disabled = true;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

window.onload = function() {
    resetTimer(); // Initialize the display with the default time
};