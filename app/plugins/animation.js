import TWEEN from '@tweenjs/tween.js'
TWEEN.now = function () {
  return new Date().getTime();
};

export class Animation extends TWEEN.Tween {
  constructor(obj) {
      super(obj);
      this['_onCompleteCallback'] = function () {
          cancelAnimationFrame();
      };
  }
  start(time) {
      startAnimationFrame();
      return super.start(time);
  }
}

let animationFrameRunning = false;
const cancelAnimationFrame = function () {
  runningTweens--;
  if (animationFrameRunning && runningTweens === 0) {
      animationFrameRunning = false;
  }
};

let runningTweens = 0;
const startAnimationFrame = function () {
  runningTweens++;
  if (!animationFrameRunning) {
      animationFrameRunning = true;
      tAnimate();
  }
};
const requestAnimationFrame = function (cb) {
  return setTimeout(cb, 1000 / 60);
};
function tAnimate() {
  if (animationFrameRunning) {
      requestAnimationFrame(tAnimate);
      TWEEN.update();
  }
}