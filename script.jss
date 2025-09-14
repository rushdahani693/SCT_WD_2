const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function formatTime(time) {
  const milliseconds = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return (
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds + '.' +
    milliseconds.toString().padStart(3, '0')
  );
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.000';
  laps = [];
  lapList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function addLap() {
  laps.push(elapsedTime);
  const lapItem = document.createElement('div');
  lapItem.classList.add('lap-item');
  lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
  lapList.prepend(lapItem);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
