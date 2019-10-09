/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/game/player.ts":
/*!*******************************!*\
  !*** ./src/js/game/player.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst object_1 = __webpack_require__(/*! ./../physics/object */ \"./src/js/physics/object.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nvar PlayerStates;\r\n(function (PlayerStates) {\r\n    PlayerStates[PlayerStates[\"RUNNING\"] = 0] = \"RUNNING\";\r\n    PlayerStates[PlayerStates[\"IDLING\"] = 1] = \"IDLING\";\r\n    PlayerStates[PlayerStates[\"JUMPING\"] = 2] = \"JUMPING\";\r\n})(PlayerStates = exports.PlayerStates || (exports.PlayerStates = {}));\r\n;\r\nclass PlayerStatesResources {\r\n    constructor(runningState, idlingState, jumpingState) {\r\n        this._runningState = runningState;\r\n        this._idlingState = idlingState,\r\n            this._jumpingState = jumpingState;\r\n    }\r\n    getRelatedAnimation(state) {\r\n        switch (state) {\r\n            case PlayerStates.IDLING: return this._idlingState;\r\n            case PlayerStates.JUMPING: return this._jumpingState;\r\n            case PlayerStates.RUNNING: return this._runningState;\r\n            default: return this._idlingState;\r\n        }\r\n    }\r\n    get running() {\r\n        return this._runningState;\r\n    }\r\n    get jumping() {\r\n        return this._jumpingState;\r\n    }\r\n    get idling() {\r\n        return this._idlingState;\r\n    }\r\n}\r\nexports.PlayerStatesResources = PlayerStatesResources;\r\n;\r\nclass Player extends object_1.GameObject {\r\n    constructor(initPosition, statesResources, firstUpdate) {\r\n        super(initPosition, vec2_1.Vec2.Zero(), statesResources.idling, firstUpdate);\r\n        this._playerState = PlayerStates.IDLING;\r\n        this._actualResource = statesResources.idling;\r\n        this._playerStatesResources = statesResources;\r\n    }\r\n    changeState(newState) {\r\n        this._playerState = newState;\r\n        this._actualResource.reset();\r\n        this._actualResource = this._playerStatesResources.getRelatedAnimation(newState);\r\n        this.changeRepresentation(this._actualResource);\r\n    }\r\n}\r\nexports.Player = Player;\r\n\n\n//# sourceURL=webpack:///./src/js/game/player.ts?");

/***/ }),

/***/ "./src/js/graphics/animation.ts":
/*!**************************************!*\
  !*** ./src/js/graphics/animation.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Animation {\r\n    constructor(context, resource, width, framesNumber, scaleFactor, speedFactor) {\r\n        this._spritesheet = resource;\r\n        this._height = resource.content.height;\r\n        this._width = width;\r\n        this._context = context;\r\n        this._framesNumber = framesNumber;\r\n        this._tickCounter = 0;\r\n        this._scaleFactor = scaleFactor || 0.4;\r\n        this._speedFactor = speedFactor ? this.normSpeedFactor(speedFactor) : this._scaleFactor;\r\n    }\r\n    draw(x, y) {\r\n        this._tickCounter = (this._tickCounter + this._speedFactor) % this._framesNumber;\r\n        this._context.save();\r\n        this._context.drawImage(this._spritesheet.content, Math.trunc(this._tickCounter) * this._width, 0, this._width, this._height, x, y - this.height, this.width, this.height);\r\n        this._context.restore();\r\n    }\r\n    get width() {\r\n        return this._width * this._scaleFactor;\r\n    }\r\n    get height() {\r\n        return this._height * this._scaleFactor;\r\n    }\r\n    set speed(newVelocity) {\r\n        this._speedFactor = this.normSpeedFactor(newVelocity);\r\n    }\r\n    normSpeedFactor(factor) {\r\n        return Math.abs(factor % 1);\r\n    }\r\n    reset() {\r\n        this._tickCounter = 0;\r\n    }\r\n}\r\nexports.Animation = Animation;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/animation.ts?");

/***/ }),

/***/ "./src/js/graphics/canvas.ts":
/*!***********************************!*\
  !*** ./src/js/graphics/canvas.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Canvas {\r\n    constructor(id, backgroundTile) {\r\n        this._canvas = document.getElementById(id);\r\n        this._context = this.canvas.getContext('2d');\r\n        this._backgroundTile = this._context.createPattern(backgroundTile.content, 'repeat');\r\n        document.addEventListener('resize', this.resizeCanvas);\r\n        this.resizeCanvas();\r\n    }\r\n    get canvas() {\r\n        return this._canvas;\r\n    }\r\n    clear() {\r\n        this._context.save();\r\n        this._context.fillStyle = this._backgroundTile;\r\n        this.context.scale(0.5, 0.5);\r\n        this._context.fillRect(0, 0, this._canvas.width * 2, this._canvas.height * 2);\r\n        this._context.restore();\r\n    }\r\n    get context() {\r\n        return this._context;\r\n    }\r\n    resizeCanvas() {\r\n        this._canvas.height = innerHeight;\r\n        this._canvas.width = innerWidth;\r\n    }\r\n    get height() {\r\n        return this._canvas.height;\r\n    }\r\n    get width() {\r\n        return this._canvas.width;\r\n    }\r\n}\r\nexports.Canvas = Canvas;\r\nCanvas.NCOL = 20;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/canvas.ts?");

/***/ }),

/***/ "./src/js/graphics/resourceLoader.ts":
/*!*******************************************!*\
  !*** ./src/js/graphics/resourceLoader.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n;\r\nclass ResourceManager {\r\n    constructor(resourceNameList) {\r\n        this._resourceNameList = resourceNameList || [];\r\n    }\r\n    getResource(id) {\r\n        for (let i = 0; i < this._resourceList.length; i++)\r\n            if (this._resourceList[i].id === id)\r\n                return this._resourceList[i];\r\n        return null;\r\n    }\r\n    getDrawable(id) {\r\n        for (let i = 0; i < this._resourceList.length; i++)\r\n            if (this._resourceList[i].id === id)\r\n                return this._resourceList[i].content;\r\n        return null;\r\n    }\r\n    resourcesPrefetch() {\r\n        const resources = this._resourceNameList;\r\n        return new Promise((resolve, reject) => {\r\n            const resourcePromises = [];\r\n            for (let i = 0; i < resources.length; i++)\r\n                resourcePromises.push(this.resourceFetch(resources[i]));\r\n            Promise.all(resourcePromises).then(resources => {\r\n                this._resourceList = resources;\r\n                resolve();\r\n            }).catch((e) => reject());\r\n        });\r\n    }\r\n    resourceFetch(resource) {\r\n        const path = `assets/imgs/${resource}.png`;\r\n        return new Promise((resolve, reject) => {\r\n            const img = new Image();\r\n            img.addEventListener('load', (e) => {\r\n                console.debug(`Resource ${resource} loaded from ${path}`);\r\n                resolve({ id: resource, content: img });\r\n            });\r\n            img.addEventListener('error', (error) => {\r\n                console.log(`Error loading resource ${resource} from ${path}`);\r\n                reject(error);\r\n            });\r\n            img.src = path;\r\n        });\r\n    }\r\n}\r\nexports.ResourceManager = ResourceManager;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/resourceLoader.ts?");

/***/ }),

/***/ "./src/js/graphics/staticSprite.ts":
/*!*****************************************!*\
  !*** ./src/js/graphics/staticSprite.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass StaticSprite {\r\n    constructor(context, resource, scaleFactor) {\r\n        this._spritesheet = resource;\r\n        this._height = resource.content.height;\r\n        this._width = resource.content.width;\r\n        this._context = context;\r\n        this._scaleFactor = scaleFactor || 0;\r\n    }\r\n    draw(x, y) {\r\n        this._context.save();\r\n        this._context.drawImage(this._spritesheet.content, 0, 0, this._width, this._height, x, y - this.height, this.width, this.height);\r\n        this._context.restore();\r\n    }\r\n    get width() {\r\n        return this._width * this._scaleFactor;\r\n    }\r\n    get height() {\r\n        return this._height * this._scaleFactor;\r\n    }\r\n}\r\nexports.StaticSprite = StaticSprite;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/staticSprite.ts?");

/***/ }),

/***/ "./src/js/main.ts":
/*!************************!*\
  !*** ./src/js/main.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst player_1 = __webpack_require__(/*! ./game/player */ \"./src/js/game/player.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ./graphics/staticSprite */ \"./src/js/graphics/staticSprite.ts\");\r\nconst object_1 = __webpack_require__(/*! ./physics/object */ \"./src/js/physics/object.ts\");\r\nconst animation_1 = __webpack_require__(/*! ./graphics/animation */ \"./src/js/graphics/animation.ts\");\r\nconst resourceLoader_1 = __webpack_require__(/*! ./graphics/resourceLoader */ \"./src/js/graphics/resourceLoader.ts\");\r\nconst canvas_1 = __webpack_require__(/*! ./graphics/canvas */ \"./src/js/graphics/canvas.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ./physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst RM = new resourceLoader_1.ResourceManager([\r\n    'idle',\r\n    'run',\r\n    'background',\r\n    'red_barrell'\r\n]);\r\nRM.resourcesPrefetch().then(() => {\r\n    console.log('Resource loaded');\r\n    const canvas = new canvas_1.Canvas('scene', RM.getResource('background'));\r\n    let lastUpdate = 0;\r\n    const robotSprites = new player_1.PlayerStatesResources(new animation_1.Animation(canvas.context, RM.getResource('run'), 567, 8), new animation_1.Animation(canvas.context, RM.getResource('idle'), 567, 8), new animation_1.Animation(canvas.context, RM.getResource('run'), 567, 8));\r\n    let barrelImage = new staticSprite_1.StaticSprite(canvas.context, RM.getResource('red_barrell'), 0.7);\r\n    let player = new player_1.Player(vec2_1.Vec2.Zero(), robotSprites, lastUpdate);\r\n    let barrell = new object_1.GameObject(new vec2_1.Vec2(200, 0), vec2_1.Vec2.Zero(), barrelImage, lastUpdate);\r\n    requestAnimationFrame(step);\r\n    function step(newTime) {\r\n        if (newTime - lastUpdate > (1000 / object_1.GameObject.FPS)) {\r\n            canvas.clear();\r\n            player.update(newTime);\r\n            canvas.context.save();\r\n            canvas.context.translate(0, canvas.height);\r\n            player.drawObject();\r\n            barrell.drawObject();\r\n            canvas.context.restore();\r\n            lastUpdate = newTime;\r\n        }\r\n        requestAnimationFrame(step);\r\n    }\r\n}).catch((e) => alert(`Error during resources prefetching: ${e}`));\r\n\n\n//# sourceURL=webpack:///./src/js/main.ts?");

/***/ }),

/***/ "./src/js/physics/object.ts":
/*!**********************************!*\
  !*** ./src/js/physics/object.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vec2_1 = __webpack_require__(/*! ./vec2 */ \"./src/js/physics/vec2.ts\");\r\nclass GameObject {\r\n    constructor(initPosition, initVelocity, representation, firstUpdate) {\r\n        this._initPosition = initPosition;\r\n        this._actualPosition = initPosition;\r\n        this._velocity = initVelocity;\r\n        this._image = representation;\r\n        this._firstUpdate = firstUpdate;\r\n    }\r\n    getVelocity() {\r\n        return this._velocity;\r\n    }\r\n    setVelocity(time, v) {\r\n        this._initPosition = this._actualPosition;\r\n        this._firstUpdate = time;\r\n        this._velocity = v;\r\n    }\r\n    update(time) {\r\n        this._actualPosition = this.getPosition(time);\r\n    }\r\n    drawObject() {\r\n        this._image.draw(this._actualPosition.x, this._actualPosition.y);\r\n    }\r\n    getPosition(time) {\r\n        let dt = time - this._firstUpdate;\r\n        let px = this._initPosition.x + dt * this._velocity.x;\r\n        let py = this._initPosition.y + dt * this._velocity.y;\r\n        return new vec2_1.Vec2(px, py);\r\n    }\r\n    changeRepresentation(newRepresentation) {\r\n        this._image = newRepresentation;\r\n    }\r\n}\r\nexports.GameObject = GameObject;\r\nGameObject.FPS = 100;\r\n\n\n//# sourceURL=webpack:///./src/js/physics/object.ts?");

/***/ }),

/***/ "./src/js/physics/vec2.ts":
/*!********************************!*\
  !*** ./src/js/physics/vec2.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Vec2 {\r\n    constructor(x, y) {\r\n        this._x = x || 0;\r\n        this._y = y || 0;\r\n    }\r\n    get x() {\r\n        return this._x;\r\n    }\r\n    get y() {\r\n        return this._y;\r\n    }\r\n    static Zero() {\r\n        return new Vec2(0, 0);\r\n    }\r\n}\r\nexports.Vec2 = Vec2;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/js/physics/vec2.ts?");

/***/ })

/******/ });