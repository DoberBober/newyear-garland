;(function() {
  "use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Balls = function () {
	  function Balls(context, buffer) {
		_classCallCheck(this, Balls);

		this.context = context;
		this.buffer = buffer;
	  }

	  _createClass(Balls, [{
		key: 'setup',
		value: function setup() {
		  this.gainNode = this.context.createGain();
		  this.source = this.context.createBufferSource();
		  this.source.buffer = this.buffer;
		  this.source.connect(this.gainNode);
		  this.gainNode.connect(this.context.destination);
		  this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
		}
	  }, {
		key: 'play',
		value: function play() {
		  this.setup();
		  this.source.start(this.context.currentTime);
		}
	  }, {
		key: 'stop',
		value: function stop() {
		  var ct = this.context.currentTime + 1;
		  this.gainNode.gain.exponentialRampToValueAtTime(.1, ct);
		  this.source.stop(ct);
		}
	  }]);

	  return Balls;
	}();

	var Buffer = function () {
	  function Buffer(context, urls) {
		_classCallCheck(this, Buffer);

		this.context = context;
		this.urls = urls;
		this.buffer = [];
	  }

	  _createClass(Buffer, [{
		key: 'loadSound',
		value: function loadSound(url, index) {
		  var request = new XMLHttpRequest();
		  request.open('get', url, true);
		  request.responseType = 'arraybuffer';
		  var thisBuffer = this;
		  request.onload = function () {
			thisBuffer.context.decodeAudioData(request.response, function (buffer) {
			  thisBuffer.buffer[index] = buffer;
			  if (index == thisBuffer.urls.length - 1) {
				thisBuffer.loaded();
			  }
			});
		  };
		  request.send();
		}
	  }, {
		key: 'getBuffer',
		value: function getBuffer() {
		  var _this = this;

		  this.urls.forEach(function (url, index) {
			_this.loadSound(url, index);
		  });
		}
	  }, {
		key: 'loaded',
		value: function loaded() {
		  _loaded = true;
		}
	  }, {
		key: 'getSound',
		value: function getSound(index) {
		  return this.buffer[index];
		}
	  }]);

	  return Buffer;
	}();

	var balls = null;
	var preset = 0;
	var _loaded = false;

	function playBalls() {
	  var index = parseInt(this.dataset.note) + preset;
	  balls = new Balls(context, buffer.getSound(index));
	  balls.play();
	}

	function stopBalls() {
	  balls.stop();
	}

	var context = new (window.AudioContext || window.webkitAudioContext)();
	var path = 'audio/';
	var sounds = [path + 'sound1.mp3', path + 'sound2.mp3', path + 'sound3.mp3', path + 'sound4.mp3', path + 'sound5.mp3', path + 'sound6.mp3', path + 'sound7.mp3', path + 'sound8.mp3', path + 'sound9.mp3', path + 'sound10.mp3', path + 'sound11.mp3', path + 'sound12.mp3', path + 'sound13.mp3', path + 'sound14.mp3', path + 'sound15.mp3', path + 'sound16.mp3', path + 'sound17.mp3', path + 'sound18.mp3', path + 'sound19.mp3', path + 'sound20.mp3', path + 'sound21.mp3', path + 'sound22.mp3', path + 'sound23.mp3', path + 'sound24.mp3', path + 'sound25.mp3', path + 'sound26.mp3', path + 'sound27.mp3', path + 'sound28.mp3', path + 'sound29.mp3', path + 'sound30.mp3', path + 'sound31.mp3', path + 'sound32.mp3', path + 'sound33.mp3', path + 'sound34.mp3', path + 'sound35.mp3', path + 'sound36.mp3'];

	var buffer = new Buffer(context, sounds);
	var ballsSound = buffer.getBuffer();
	var buttons = document.querySelectorAll('.b-ball_bounce');
	buttons.forEach(function (button) {
	  button.addEventListener('mouseenter', playBalls.bind(button));
	  button.addEventListener('mouseleave', stopBalls);
	});

	function ballBounce(e) {
	  var i = e;
	  if (e.className.indexOf(" bounce") > -1) {
		return;
	  }
	  toggleBounce(i);
	}

	function toggleBounce(i) {
	  i.classList.add("bounce");
	  function n() {
		i.classList.remove("bounce")
		i.classList.add("bounce1");
		function o() {
		  i.classList.remove("bounce1")
		  i.classList.add("bounce2");
		  function p() {
			i.classList.remove("bounce2")
			i.classList.add("bounce3");
			function q() {
			  i.classList.remove("bounce3");
			}
			setTimeout(q, 300);
		  }
		  setTimeout(p, 300);
		}
		setTimeout(o, 300);
	  }
	  setTimeout(n, 300);
	}

	var array1 = document.querySelectorAll('.b-ball_bounce')
	var array2 = document.querySelectorAll('.b-ball_bounce .b-ball__right')

	for(var i=0; i<array1.length; i++){
		array1[i].addEventListener('mouseenter', function(){
			ballBounce(this)
		})
	}

	for(var i=0; i<array2.length; i++){
		array2[i].addEventListener('mouseenter', function(){
			ballBounce(this)
		})
	}

	var l = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"];
	var k = ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"];
	var a = {};
	for (var e = 0, c = l.length; e < c; e++) {
		a[l[e].charCodeAt(0)] = e;
	}
	for (var _e = 0, _c = k.length; _e < _c; _e++) {
		a[k[_e].charCodeAt(0)] = _e;
	}

	document.addEventListener('keypress', function(j){
		var i = j.target;
		if (j.which in a) {
			var index = parseInt(a[j.which]);
			balls = new Balls(context, buffer.getSound(index));
			balls.play();
			var ball = document.querySelector('[data-note="' + index + '"]');
			toggleBounce(ball);
		}
	})

})();
