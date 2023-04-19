const refs = {
btnStart: document.querySelector('button[data-start]'),
btnStop: document.querySelector('button[data-stop]'),
body: document.body

}
    

refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);

let INTERVAL_ID = null;
function onBtnStartClick() {
	  INTERVAL_ID = setInterval(() => {
		 refs.body.style.backgroundColor = getRandomHexColor();
	  }, 1000);
	
	refs.btnStart.disabled = true;
	refs.btnStop.disabled = false;


};

function onBtnStopClick() {
	clearInterval(INTERVAL_ID);
	refs.btnStart.disabled = false;
	refs.btnStop.disabled = true;


};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
