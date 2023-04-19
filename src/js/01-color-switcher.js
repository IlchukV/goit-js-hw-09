const refs = {
btnStart: document.querySelector('button[data-start]'),
btnStop: document.querySelector('button[data-stop]'),
body: document.body

}
    
//hang event listeners on the stop start button
refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

let INTERVAL_ID = null;

//fRandom color start function
function onBtnStartClick() {
	  INTERVAL_ID = setInterval(() => {
		 refs.body.style.backgroundColor = getRandomHexColor();
	  }, 1000);
	
    // start button is deactivated
	refs.btnStart.disabled = true;
	refs.btnStop.disabled = false;

};

//Random color stop function
function onBtnStopClick() {
    clearInterval(INTERVAL_ID);
    
    // stop button is deactivated
	refs.btnStart.disabled = false;
	refs.btnStop.disabled = true;
};

//random color generation function
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
