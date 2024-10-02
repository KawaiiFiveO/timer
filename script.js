// script.js

let countdown;
let timeRemaining;
let isPaused = false;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer-display');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', togglePauseResume);
resetButton.addEventListener('click', resetTimer);
hoursInput.addEventListener('input', updateDisplay); // Update display when typing
minutesInput.addEventListener('input', updateDisplay);
secondsInput.addEventListener('input', updateDisplay);

function startTimer() {
    if (isPaused) {
        // Resume from paused state
        countdown = setInterval(updateTimer, 1000);
        isPaused = false;
        startButton.disabled = true;
        return;
    }

    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    timeRemaining = (hours * 3600) + (minutes * 60) + seconds;

    if (timeRemaining <= 0) {
        alert('Please enter a valid time!');
        return;
    }

    startButton.disabled = true;
    pauseButton.disabled = false;
    countdown = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let hours = Math.floor(timeRemaining / 3600);
    let minutes = Math.floor((timeRemaining % 3600) / 60);
    let seconds = timeRemaining % 60;

    const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    timerDisplay.textContent = formattedTime;

    // Update the tab title with the remaining time
    document.title = `Time Left: ${formattedTime}`;

    if (timeRemaining <= 0) {
        clearInterval(countdown);
        alert('Time is up!');
        startButton.disabled = false;
        pauseButton.disabled = true;
        document.title = "Time's Up!";
    } else {
        timeRemaining--;
    }
}

function togglePauseResume() {
    if (isPaused) {
        countdown = setInterval(updateTimer, 1000);
        pauseButton.textContent = 'Pause';
        isPaused = false;
    } else {
        clearInterval(countdown);
        pauseButton.textContent = 'Resume';
        isPaused = true;
        document.title = "Paused";
    }
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = '00:00:00';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.textContent = 'Pause';
    isPaused = false;
    document.title = 'Simple Timer';
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateDisplay() {
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    timerDisplay.textContent = formattedTime;

    // Update the tab title as the user types
    document.title = `Time Set: ${formattedTime}`;
}
