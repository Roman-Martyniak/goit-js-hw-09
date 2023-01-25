import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const calendarInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDiv = document.querySelector('.timer');
const fieldDiv = document.querySelectorAll('.field');
const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const deltaT = selectedDates[0] - new Date();
    if (selectedDates[0] < options.defaultDate || deltaT < 1500) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
    startButton.addEventListener('click', intervalFoo);

    function intervalFoo() {
      const intervalID = setInterval(() => {
        const delta = selectedDates[0] - new Date();
        const remainingTime = convertMs(delta);
        daysValueEl.textContent = addLeadingZero(remainingTime.days);
        hoursValueEl.textContent = addLeadingZero(remainingTime.hours);
        minutesValueEl.textContent = addLeadingZero(remainingTime.minutes);
        secondsValueEl.textContent = addLeadingZero(remainingTime.seconds);
        if (selectedDates[0] - Date.now() < 1000) {
          clearInterval(intervalID);
          startButton.disabled = true;
        }
      }, 1000);
    }

    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }
  },
};

startButton.disabled = true;
timerDiv.style.display = 'flex';
timerDiv.style.gap = '10px';

fieldDiv.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.justifyContent = 'center';
  el.style.alignItems = 'center';
});

flatpickr(calendarInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}