var rgbled;

function colour_rgb(r, g, b) {
  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;
  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;
  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;
  r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);
  g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);
  b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
}

function getElement(dom) {
  var element = document.querySelector(dom);
  return element;
}

function controllerBtnEvent(c, e, callback) {
  if (e !== 'click') {
    var _u = navigator.userAgent;
    if (_u.indexOf('Android') > -1 || _u.indexOf('iPhone') > -1 || _u.indexOf('iPad') > -1) {
      c.addEventListener(e[1], function () {
        callback();
      });
    } else {
      c.addEventListener(e[0], function () {
        callback();
      });
    }
  } else {
    c.addEventListener('click', function () {
      callback();
    });
  }
}


boardReady({board: 'Smart', device: '10QmaLRQ', transport: 'mqtt'}, function (board) {
  board.samplingInterval = 50;
  rgbled = getRGBLedCathode(board, 15, 12, 13);
  rgbled.setColor('#000000');
  var p;
  var range = document.querySelector('.demo-area-09-input');
  range.setAttribute('min', 0);
  range.setAttribute('max', 100);
  range.setAttribute('step', 1);
  range.setAttribute('value', 50);
  p = Math.round((50 - 0) * 100 / (100 - 0));
  range.style.backgroundImage = '-webkit-linear-gradient(left, #246 0%, #246 ' + p + '%, #222 ' + p + '%, #222 100%)';
  range.oninput = function () {
    var _value = this.value;
    p = Math.round((_value - 0) * 100 / (100 - 0));
    range.style.backgroundImage = '-webkit-linear-gradient(left, #246 0%, #246 ' + p + '%, #222 ' + p + '%, #222 100%)';
    rgbled.setColor(colour_rgb(_value, _value, _value));
  };
  controllerBtnEvent(getElement('#demo-area-09 .btn-color1'),'click', function () {
    rgbled.setColor('#ff0000');
  });
  controllerBtnEvent(getElement('#demo-area-09 .btn-color2'),'click', function () {
    rgbled.setColor('#33ff33');
  });
  controllerBtnEvent(getElement('#demo-area-09 .btn-color3'),'click', function () {
    rgbled.setColor('#33ffff');
  });
  controllerBtnEvent(getElement('#demo-area-09 .btn-color4'),'click', function () {
    rgbled.setColor('#ffff66');
  });
  controllerBtnEvent(getElement('#demo-area-09 .btn-num1'),'click', function () {
    rgbled.setColor('#ffffff');
  });
});