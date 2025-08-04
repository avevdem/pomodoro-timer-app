const timerDisplay = document.getElementById("timer");
const controlButton = document.getElementById("control-button");
const background = document.getElementById("background");

const START_IMG = "pomodoro_img-src/start-button.png";
const STOP_IMG = "pomodoro_img-src/stop-button.png";
const BG_START = "pomodoro_img-src/dark-bg-start.png";
const BG_ACTIVE = "pomodoro_img-src/bg.png";

const startSound = new Audio("pomodoro_audio-src/Timer Start.m4a");
const finishSound = new Audio("pomodoro_audio-src/Timer finish 67.m4a");

let isRunning = false;
let time = 30 * 60; // 30 minutes
let interval = null;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(time);
}

function startTimer() {
  background.src = BG_ACTIVE;
  controlButton.querySelector("img").src = STOP_IMG;
  isRunning = true;
  startSound.currentTime = 0;
  startSound.play();
  interval = setInterval(() => {
    time--;
    updateTimerDisplay();
    if (time <= 0) {
      stopTimer(true); // true = timer stoped(finished) 
    }
  }, 1000);
}

function stopTimer(isFinished = false) {
  clearInterval(interval);
  isRunning = false;
  time = 30 * 60;
  updateTimerDisplay();
  background.src = BG_START;
  controlButton.querySelector("img").src = START_IMG;

  if (isFinished) {
    finishSound.currentTime = 0;
    finishSound.play();
    console.log("Pomodoro complete!");
  }
}

controlButton.addEventListener("click", () => {
  if (!isRunning) {
    startTimer();
  } else {
    stopTimer();
  }
});

// init
updateTimerDisplay();
