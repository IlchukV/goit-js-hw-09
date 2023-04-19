import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
datetimePicker: document.querySelector("#datetime-picker"),
btnStart: document.querySelector('button[data-start]'),
daysRef: document.querySelector(".value[data-days]"),
hoursRef: document.querySelector(".value[data-hours]"),
minutesRef: document.querySelector(".value[data-minutes]"),
secondsRef: document.querySelector(".value[data-seconds]")
}

let intervalId = null;

//flatpickr function parameters object
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
	onClose(selectedDates) {
		if (selectedDates[0] < new Date()) {
			Notiflix.Report.warning('Oops', 'Choose the date in the future', 'Got it!');
			refs.btnStart.disabled = true;
		} else {
			refs.btnStart.disabled = false;
		}

  },
};

//hang the listener on the Start button
refs.btnStart.addEventListener('click', countdown);

//flatpickr function - - select the final date and time in one element of the interface
flatpickr(refs.datetimePicker, options );

//countdown function 
function countdown() {
	intervalId = setInterval(setTime, 1000);
}

//function that calculates the time difference
function setTime() {
	const selectedDate = new Date(refs.datetimePicker.value);
	const nowDate = new Date();
    const dif = selectedDate - nowDate
    
    // if the time difference is less than 1 second - clear the interval
	if ( dif < 1000) {
		clearInterval(intervalId);
		Notiflix.Report.success('Time is up', 'Countdown is over', 'ok');
	}

	const { days, hours, minutes, seconds } = convertMs(dif);

	refs.daysRef.textContent = addLeadingZero(days);
	refs.hoursRef.textContent = addLeadingZero(hours);
	refs.minutesRef.textContent = addLeadingZero(minutes);
	refs.secondsRef.textContent = addLeadingZero(seconds);

	refs.btnStart.disabled = true;
}

//function that converts the current milliseconds to days, hours...
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
};

// a function that adds 2 zeros to date and time values
function addLeadingZero(value) {
	return  value.toString().padStart(2, '0');
};