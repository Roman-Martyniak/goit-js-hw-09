const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let intervalFunction;
stopButton.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartButtonClick(event) {
  const randomColor = getRandomHexColor();
  bodyEl.style.backgroundColor = randomColor;
  colorChangeInterval();
  startButton.disabled = true;
  stopButton.disabled = false;
}

function colorChangeInterval() {
  if (!intervalFunction) {
    intervalFunction = setInterval(onStartButtonClick, 1000);
  }
}

function onStopButtonClick(event) {
  clearInterval(intervalFunction);
  intervalFunction = null;
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);