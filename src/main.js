const btnMinutesPlus = document.querySelector('.timer--plus');
const btnMinutesMinus = document.querySelector('.timer--minus');
const minutes = document.querySelector('.timer-minutes--numbers');
const seconds = document.querySelector('.timer-seconds--numbers');
const start = document.querySelector('.start');
let interval = null;

const plus = (component) => {
  const newValue = Number(component.innerHTML) + 1;
  component.innerHTML =
    newValue > 60 ? '00' : addLeftZero(Number(component.innerHTML) + 1);
}

const minus = (component) => {
  const newValue = Number(component.innerHTML) - 1;
  component.innerHTML = newValue < 0 ? '00' : addLeftZero(newValue);
}

const addLeftZero = (number) => {
  return number < 10 ? '0' + number : number;
}

const mouseDownInterval = (func, component) => {
  if (!interval) {
    interval = setInterval(() => func(component), 200);
  }
}

const removeInterval = () => {
  clearInterval(interval);
  interval = null;
}

const main = () => {
  const state = start.innerHTML;

  if (state === 'START') {
    startMain();
  } else {
    pauseMain();
  }
}

const startMain = () => {
  btnMinutesPlus.disabled = true;
  btnMinutesMinus.disabled = true;
  start.innerHTML = 'PAUSE';

  interval = setInterval(() => {
    let m = Number(minutes.innerHTML);
    let s = Number(seconds.innerHTML);

    if (m === 0 && s === 0) {
      removeInterval();
      const myNotification = new Notification('Simple Timer', {
        body: 'The timer has finished.',
        silent: true
      });
      const audio = new Audio('./assets/sounds/bell.wav');
      audio.play();
      return;
    }

    if (s === 0) {
      m -= 1;
      s = 59;
    } else {
      s -= 1;
    }

    minutes.innerHTML = m < 10 ? addLeftZero(m) : m;
    seconds.innerHTML = s < 10 ? addLeftZero(s) : s;
  }, 1000);
}

const pauseMain = () => {
  btnMinutesPlus.disabled = false;
  btnMinutesMinus.disabled = false;

  start.innerHTML = 'START';
  removeInterval();
}

btnMinutesPlus.addEventListener('mousedown', () => mouseDownInterval(plus, minutes), false);
btnMinutesPlus.addEventListener('mouseup', removeInterval, false);
btnMinutesPlus.addEventListener('mouseleave', removeInterval, false);
btnMinutesMinus.addEventListener('mousedown', () => mouseDownInterval(minus, minutes), false);
btnMinutesMinus.addEventListener('mouseup', removeInterval, false);
btnMinutesMinus.addEventListener('mouseleave', removeInterval, false);
start.addEventListener('click', main, false);



