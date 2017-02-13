/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	window.onload = function () {
	    var canvas = document.getElementById('canvas');
	    var context = canvas.getContext('2d');
	    var centerY = canvas.height / 2;
	    var timeline = 0; // Viewport
	    var speed = 0;
	    var maxSpeed = 20;
	    var accelration = 5;
	    var friction = 0.95;
	    var interval = 50.0;
	    var halfHeight = 5.0;
	    var sequence;
	    window.onkeydown = function (event) {
	        if (event.keyCode === 37 && speed > -maxSpeed) {
	            speed -= accelration;
	        }
	        else if (event.keyCode === 39 && speed < maxSpeed) {
	            speed += accelration;
	        }
	        console.log(speed);
	    };
	    (function drawFrame() {
	        window.requestAnimationFrame(drawFrame);
	        context.clearRect(0, 0, canvas.width, canvas.height);
	        context.save();
	        context.translate(0.5, 0.5);
	        context.beginPath();
	        context.moveTo(0, centerY);
	        context.lineTo(canvas.width, centerY);
	        context.save();
	        context.translate(timeline, 0);
	        var start = -(timeline + (interval - timeline % interval));
	        for (var i = start; i <= (start + canvas.width + interval); i += interval) {
	            sequence = Math.round(i) / interval;
	            context.fillText(sequence.toString(), i, centerY + halfHeight * 3);
	        }
	        context.restore();
	        for (var i = timeline % interval; i < canvas.width; i += interval) {
	            context.moveTo(i, centerY - halfHeight);
	            context.lineTo(i, centerY + halfHeight);
	        }
	        timeline += speed;
	        speed *= 0.95;
	        if (Math.abs(speed) < 0.01) {
	            speed = 0;
	        }
	        context.stroke();
	        context.restore();
	    })();
	};


/***/ }
/******/ ]);