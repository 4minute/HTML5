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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Ball_1 = __webpack_require__(1);
	window.onload = function () {
	    var canvas = document.getElementById('canvas');
	    var context = canvas.getContext('2d');
	    var balls = new Array();
	    var originX = 0, originY = 0;
	    var isMouseDown = false;
	    var numBalls = 10;
	    canvas.onmousedown = function () {
	        isMouseDown = true;
	    };
	    window.onmouseup = function () {
	        isMouseDown = false;
	    };
	    window.onmousemove = function (event) {
	        if (isMouseDown) {
	            originX += event.movementX;
	            originY += event.movementY;
	        }
	    };
	    // Setup balls
	    for (var i = 0; i < numBalls; i++) {
	        var ball = new Ball_1.Ball(Math.random() * 25 + 25);
	        ball.x = Math.random() * canvas.width;
	        ball.y = Math.random() * canvas.height;
	        balls.push(ball);
	    }
	    (function drawFrame() {
	        window.requestAnimationFrame(drawFrame);
	        context.clearRect(0, 0, canvas.width, canvas.height);
	        context.save();
	        context.translate(0.5, 0.5);
	        context.save();
	        context.translate(originX, originY);
	        // Draw balls
	        for (var _i = 0, balls_1 = balls; _i < balls_1.length; _i++) {
	            var ball = balls_1[_i];
	            ball.draw(context);
	        }
	        context.restore();
	        for (var i = originX % 30; i < canvas.width; i += 30) {
	            context.moveTo(i, 0);
	            context.lineTo(i, canvas.height);
	        }
	        context.stroke();
	        for (var i = originY % 30; i < canvas.height; i += 30) {
	            context.moveTo(0, i);
	            context.lineTo(canvas.width, i);
	        }
	        context.stroke();
	        context.restore();
	    })();
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Sprite_1 = __webpack_require__(2);
	var Ball = (function (_super) {
	    __extends(Ball, _super);
	    function Ball(radius, color) {
	        if (radius === void 0) { radius = 25; }
	        if (color === void 0) { color = '#000000'; }
	        var _this = _super.call(this, color) || this;
	        _this.radius = radius;
	        return _this;
	    }
	    Ball.prototype.onDraw = function (context) {
	        context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
	    };
	    return Ball;
	}(Sprite_1.Sprite));
	exports.Ball = Ball;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(3);
	var Sprite = (function () {
	    function Sprite(fillColor, strokeColor) {
	        if (fillColor === void 0) { fillColor = '#000000'; }
	        if (strokeColor === void 0) { strokeColor = '#000000'; }
	        this.x = 0;
	        this.y = 0;
	        this.rotation = 0;
	        this.scaleX = 1;
	        this.scaleY = 1;
	        this.lineWidth = 1;
	        this.closePath = true;
	        this.fillColor = utils_1.parseColor(fillColor);
	        this.strokeColor = utils_1.parseColor(strokeColor);
	    }
	    Sprite.prototype.draw = function (context) {
	        context.save();
	        context.translate(this.x, this.y);
	        context.rotate(this.rotation);
	        context.scale(this.scaleX, this.scaleY);
	        context.lineWidth = this.lineWidth;
	        context.strokeStyle = this.strokeColor;
	        context.fillStyle = this.fillColor;
	        context.beginPath();
	        this.onDraw(context);
	        if (this.closePath) {
	            context.closePath();
	        }
	        if (this.fillColor) {
	            context.fill();
	        }
	        if (this.lineWidth > 0) {
	            context.stroke();
	        }
	        context.restore();
	    };
	    return Sprite;
	}());
	exports.Sprite = Sprite;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	function captureMouse(element) {
	    var mouse = {
	        x: 0,
	        y: 0
	    };
	    element.addEventListener('mousemove', function (event) {
	        var x, y;
	        if (event.pageX || event.pageY) {
	            x = event.pageX;
	            y = event.pageY;
	        }
	        else {
	            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	        }
	        x -= element.offsetLeft;
	        y -= element.offsetTop;
	        mouse.x = x;
	        mouse.y = y;
	    }, false);
	    return mouse;
	}
	exports.captureMouse = captureMouse;
	;
	function captureTouch(element) {
	    var touch = {
	        x: null,
	        y: null,
	        isPressed: false
	    };
	    element.addEventListener('touchstart', function (event) {
	        touch.isPressed = true;
	    }, false);
	    element.addEventListener('touchend', function (event) {
	        touch.isPressed = false;
	        touch.x = null;
	        touch.y = null;
	    }, false);
	    element.addEventListener('touchmove', function (event) {
	        var x, y, touchEvent = event.touches[0];
	        if (touchEvent.pageX || touchEvent.pageY) {
	            x = touchEvent.pageX;
	            y = touchEvent.pageY;
	        }
	        else {
	            x = touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	            y = touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	        }
	        x -= element.offsetLeft;
	        y -= element.offsetTop;
	        touch.x = x;
	        touch.y = y;
	    }, false);
	    return touch;
	}
	exports.captureTouch = captureTouch;
	function parseColor(color, toNumber) {
	    if (toNumber === void 0) { toNumber = false; }
	    if (toNumber === true) {
	        if (typeof color === 'number') {
	            return (color | 0);
	        }
	        if (typeof color === 'string' && color[0] === '#') {
	            color = color.slice(1);
	        }
	        return parseInt(color, 16);
	    }
	    else {
	        if (typeof color === 'number') {
	            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
	        }
	        return color;
	    }
	}
	exports.parseColor = parseColor;


/***/ }
/******/ ]);