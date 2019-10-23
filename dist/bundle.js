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

/***/ "./src/js/game/gui/playScene.ts":
/*!**************************************!*\
  !*** ./src/js/game/gui/playScene.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst textBox_1 = __webpack_require__(/*! ./../../graphics/controls/textBox */ \"./src/js/graphics/controls/textBox.ts\");\r\nconst player_1 = __webpack_require__(/*! ./../player */ \"./src/js/game/player.ts\");\r\nconst animation_1 = __webpack_require__(/*! ./../../graphics/representations/animation */ \"./src/js/graphics/representations/animation.ts\");\r\nconst scene_1 = __webpack_require__(/*! ../scene/scene */ \"./src/js/game/scene/scene.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst player_2 = __webpack_require__(/*! ../player */ \"./src/js/game/player.ts\");\r\nconst oneShotAnimation_1 = __webpack_require__(/*! ../../graphics/representations/oneShotAnimation */ \"./src/js/graphics/representations/oneShotAnimation.ts\");\r\nclass PlayScene extends scene_1.Scene {\r\n    constructor(document, canvas, resourceManager, sceneManager) {\r\n        const robotSprites = new player_2.PlayerStatesResources(new animation_1.Animation(canvas.context, resourceManager.getResource('run'), 9), new animation_1.Animation(canvas.context, resourceManager.getResource('idle'), 9), new oneShotAnimation_1.OneShotAnimation(canvas.context, resourceManager.getResource('jump'), 9));\r\n        const player = new player_1.Player(new vec2_1.Vec2(0, canvas.height - robotSprites.idling.height), robotSprites, 0, canvas.width, canvas.height);\r\n        let timeText = new textBox_1.TextControl(canvas.context, new vec2_1.Vec2(0, 0), 300, 30, `Time: 0`);\r\n        super(document, canvas, resourceManager.getDrawable('menu_background'), [\r\n            player,\r\n            timeText,\r\n        ]);\r\n        this.timeText = timeText;\r\n    }\r\n    play(newTime) {\r\n        super.play(newTime);\r\n        this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);\r\n    }\r\n}\r\nexports.PlayScene = PlayScene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/gui/playScene.ts?");

/***/ }),

/***/ "./src/js/game/gui/startScene.ts":
/*!***************************************!*\
  !*** ./src/js/game/gui/startScene.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst button_1 = __webpack_require__(/*! ./../../graphics/controls/button */ \"./src/js/graphics/controls/button.ts\");\r\nconst animation_1 = __webpack_require__(/*! ./../../graphics/representations/animation */ \"./src/js/graphics/representations/animation.ts\");\r\nconst scene_1 = __webpack_require__(/*! ../scene/scene */ \"./src/js/game/scene/scene.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ../../graphics/representations/staticSprite */ \"./src/js/graphics/representations/staticSprite.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst textBox_1 = __webpack_require__(/*! ../../graphics/controls/textBox */ \"./src/js/graphics/controls/textBox.ts\");\r\nconst control_1 = __webpack_require__(/*! ../../graphics/controls/control */ \"./src/js/graphics/controls/control.ts\");\r\nclass StartScene extends scene_1.Scene {\r\n    constructor(document, canvas, resourceManager, sceneManager) {\r\n        let button_normal = resourceManager.getResource('start_button');\r\n        //let button_pressed = resourceManager.getResource('play_button_2');\r\n        let sprite_normal = new staticSprite_1.StaticSprite(canvas.context, button_normal);\r\n        //let sprite_pressed = new StaticSprite(canvas.context, button_pressed);\r\n        let textboxWidth = 1000;\r\n        let textboxHeight = 2000;\r\n        let robot_resource = resourceManager.getResource('idle');\r\n        let spriteRobot = new animation_1.Animation(canvas.context, robot_resource, 9, 1.2, 0.4);\r\n        super(document, canvas, resourceManager.getDrawable('menu_background'), [\r\n            new button_1.OneWayButton(new vec2_1.Vec2((canvas.width - sprite_normal.width) * 0.5, (canvas.height - sprite_normal.height) * 0.5), sprite_normal, () => {\r\n                sceneManager.setScene('play');\r\n            }),\r\n            new textBox_1.TextControl(canvas.context, new vec2_1.Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5 - 200), textboxWidth, textboxHeight, 'RoboWar'),\r\n            new control_1.DrawableControl(new vec2_1.Vec2(0, (canvas.height - spriteRobot.height) * 0.5 + 200), spriteRobot),\r\n        ]);\r\n    }\r\n}\r\nexports.StartScene = StartScene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/gui/startScene.ts?");

/***/ }),

/***/ "./src/js/game/obstacles/obstacle.ts":
/*!*******************************************!*\
  !*** ./src/js/game/obstacles/obstacle.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst gameObject_1 = __webpack_require__(/*! ../../physics/gameObject */ \"./src/js/physics/gameObject.ts\");\r\nclass Obstacle extends gameObject_1.GameObject {\r\n    constructor(initPosition, initVelocity, representation, firstUpdate, deadly) {\r\n        super(initPosition, initVelocity, representation, firstUpdate);\r\n        this._deadly = deadly;\r\n    }\r\n}\r\nexports.Obstacle = Obstacle;\r\n\n\n//# sourceURL=webpack:///./src/js/game/obstacles/obstacle.ts?");

/***/ }),

/***/ "./src/js/game/player.ts":
/*!*******************************!*\
  !*** ./src/js/game/player.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fallingObject_1 = __webpack_require__(/*! ./../physics/fallingObject */ \"./src/js/physics/fallingObject.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nvar MovementKeys;\r\n(function (MovementKeys) {\r\n    MovementKeys[MovementKeys[\"LEFT\"] = 37] = \"LEFT\";\r\n    MovementKeys[MovementKeys[\"RIGHT\"] = 39] = \"RIGHT\";\r\n    MovementKeys[MovementKeys[\"JUMP\"] = 32] = \"JUMP\";\r\n    MovementKeys[MovementKeys[\"SHOT\"] = 17] = \"SHOT\";\r\n})(MovementKeys || (MovementKeys = {}));\r\n;\r\nvar PlayerStates;\r\n(function (PlayerStates) {\r\n    PlayerStates[PlayerStates[\"RUNNING\"] = 0] = \"RUNNING\";\r\n    PlayerStates[PlayerStates[\"IDLING\"] = 1] = \"IDLING\";\r\n    PlayerStates[PlayerStates[\"JUMPING\"] = 2] = \"JUMPING\";\r\n})(PlayerStates = exports.PlayerStates || (exports.PlayerStates = {}));\r\n;\r\nclass PlayerStatesResources {\r\n    constructor(runningState, idlingState, jumpingState) {\r\n        this._runningState = runningState;\r\n        this._idlingState = idlingState,\r\n            this._jumpingState = jumpingState;\r\n    }\r\n    getRelatedAnimation(state) {\r\n        switch (state) {\r\n            case PlayerStates.IDLING: return this._idlingState;\r\n            case PlayerStates.JUMPING: return this._jumpingState;\r\n            case PlayerStates.RUNNING: return this._runningState;\r\n            default: return this._idlingState;\r\n        }\r\n    }\r\n    get running() {\r\n        return this._runningState;\r\n    }\r\n    get jumping() {\r\n        return this._jumpingState;\r\n    }\r\n    get idling() {\r\n        return this._idlingState;\r\n    }\r\n}\r\nexports.PlayerStatesResources = PlayerStatesResources;\r\n;\r\nclass Player extends fallingObject_1.FallingObject {\r\n    constructor(initPosition, statesResources, firstUpdate, maxWidth, maxHeight) {\r\n        super(initPosition, vec2_1.Vec2.Zero(), statesResources.idling, firstUpdate);\r\n        this._playerState = PlayerStates.IDLING;\r\n        this._actualResource = statesResources.idling;\r\n        this._playerStatesResources = statesResources;\r\n        this._playerActualMovement = {\r\n            left: false, right: false,\r\n            jump: false, shot: false\r\n        };\r\n        this._playerMovementRequest = {\r\n            left: false, right: false,\r\n            jump: false, shot: false\r\n        };\r\n        this._worldBounds = {\r\n            width: maxWidth,\r\n            height: maxHeight\r\n        };\r\n    }\r\n    update(time) {\r\n        super.update(time);\r\n        this.manageInputRequests(time);\r\n        this.boundsAdjustPosition(time);\r\n    }\r\n    changeState(newState) {\r\n        if (newState != this._playerState) {\r\n            this._playerState = newState;\r\n            this._actualResource.reset();\r\n            this._actualResource = this._playerStatesResources.getRelatedAnimation(newState);\r\n            this.changeRepresentation(this._actualResource);\r\n        }\r\n    }\r\n    shotHandling() {\r\n        //To redefine\r\n        console.log('BANG!');\r\n    }\r\n    // BOUNDS COLLISION HANDLING\r\n    boundsAdjustPosition(time) {\r\n        if (this._actualPosition.x < 0) {\r\n            this._actualPosition.x = 0;\r\n            this.setVelocity(time, 0, 0);\r\n        }\r\n        if (this._actualPosition.y < 0) {\r\n            this._actualPosition.y = 0;\r\n            this.setVelocity(time, this._velocity.x, 0);\r\n        }\r\n        if (this._actualPosition.x + this.width > this._worldBounds.width) {\r\n            this._actualPosition.x = this._worldBounds.width - this.width;\r\n            this.setVelocity(time, 0, 0);\r\n        }\r\n        if (this._actualPosition.y + this.height > this._worldBounds.height) {\r\n            this._actualPosition.y = this._worldBounds.height - this.height;\r\n            this.setVelocity(time, this._velocity.x, 0);\r\n            this.bottomBoundsHitHandling();\r\n        }\r\n    }\r\n    bottomBoundsHitHandling() {\r\n        this._isFloating = false;\r\n        this._playerActualMovement.jump = false;\r\n        if (this._velocity.x !== 0)\r\n            this.changeState(PlayerStates.RUNNING);\r\n        else\r\n            this.changeState(PlayerStates.IDLING);\r\n    }\r\n    // INPUT MANAGEMENT\r\n    manageInputRequests(time) {\r\n        if (this._playerMovementRequest.left && !this._playerMovementRequest.right) {\r\n            if (!this._playerActualMovement.left) {\r\n                console.log('Left Movement Handled');\r\n                if (!this._isFloating)\r\n                    this.changeState(PlayerStates.RUNNING);\r\n                this.setVelocity(time, -Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);\r\n                this._playerActualMovement.left = true;\r\n            }\r\n            this._playerMovementRequest.left = false;\r\n        }\r\n        if (this._playerMovementRequest.right) {\r\n            if (!this._playerActualMovement.right) {\r\n                console.log('Right Movement Handled');\r\n                if (!this._isFloating)\r\n                    this.changeState(PlayerStates.RUNNING);\r\n                this.setVelocity(time, Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);\r\n                this._playerActualMovement.right = true;\r\n            }\r\n            this._playerMovementRequest.right = false;\r\n        }\r\n        if (this._playerMovementRequest.jump) {\r\n            console.log('Jump Movement Handled');\r\n            if (!this._playerActualMovement.jump) {\r\n                this.changeState(PlayerStates.JUMPING);\r\n                this.setVelocity(time, this._velocity.x, -Player.RUNNING_VERTICAL_VELOCITY);\r\n                this._playerActualMovement.jump = true;\r\n                this._isFloating = true;\r\n            }\r\n            this._playerMovementRequest.jump = false;\r\n        }\r\n        if (this._playerMovementRequest.shot) {\r\n            console.log('Shot Movement Handled');\r\n            if (!this._playerActualMovement.shot) {\r\n                this._playerActualMovement.shot = true;\r\n                this.shotHandling();\r\n            }\r\n            this._playerMovementRequest.shot = false;\r\n        }\r\n        if (!this._playerActualMovement.jump && !this._playerActualMovement.shot &&\r\n            !this._playerActualMovement.left && !this._playerActualMovement.right) {\r\n            this.setVelocity(time, 0, this._velocity.y);\r\n            this.changeState(this._isFloating ? PlayerStates.JUMPING : PlayerStates.IDLING);\r\n        }\r\n    }\r\n    inputAttach(documentReference) {\r\n        const references = [\r\n            { type: 'keydown', callback: this.keyDownHandling.bind(this) },\r\n            { type: 'keyup', callback: this.keyUpHandling.bind(this) }\r\n        ];\r\n        for (let i = 0; i < references.length; i++)\r\n            documentReference.addEventListener(references[i].type, references[i].callback);\r\n        return references;\r\n    }\r\n    keyDownHandling(event) {\r\n        switch (event.keyCode) {\r\n            case MovementKeys.RIGHT:\r\n                this._playerMovementRequest.right = true;\r\n                break;\r\n            case MovementKeys.LEFT:\r\n                this._playerMovementRequest.left = true;\r\n                break;\r\n            case MovementKeys.JUMP:\r\n                this._playerMovementRequest.jump = true;\r\n                break;\r\n            case MovementKeys.SHOT:\r\n                this._playerMovementRequest.shot = true;\r\n                break;\r\n        }\r\n    }\r\n    keyUpHandling(event) {\r\n        switch (event.keyCode) {\r\n            case MovementKeys.LEFT:\r\n                this._playerActualMovement.left = this._playerMovementRequest.left = false;\r\n                break;\r\n            case MovementKeys.RIGHT:\r\n                this._playerActualMovement.right = this._playerMovementRequest.right = false;\r\n                break;\r\n            case MovementKeys.SHOT:\r\n                this._playerActualMovement.shot = false;\r\n                break;\r\n        }\r\n    }\r\n}\r\nexports.Player = Player;\r\nPlayer.RUNNING_HORIZONTAL_VELOCITY = 0.5;\r\nPlayer.RUNNING_VERTICAL_VELOCITY = 1;\r\n\n\n//# sourceURL=webpack:///./src/js/game/player.ts?");

/***/ }),

/***/ "./src/js/game/scene/scene.ts":
/*!************************************!*\
  !*** ./src/js/game/scene/scene.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst control_1 = __webpack_require__(/*! ../../graphics/controls/control */ \"./src/js/graphics/controls/control.ts\");\r\nconst world_1 = __webpack_require__(/*! ../world */ \"./src/js/game/world.ts\");\r\nconst obstacle_1 = __webpack_require__(/*! ../obstacles/obstacle */ \"./src/js/game/obstacles/obstacle.ts\");\r\nconst player_1 = __webpack_require__(/*! ../player */ \"./src/js/game/player.ts\");\r\nconst shot_1 = __webpack_require__(/*! ../shot */ \"./src/js/game/shot.ts\");\r\nconst gameObject_1 = __webpack_require__(/*! ../../physics/gameObject */ \"./src/js/physics/gameObject.ts\");\r\nclass Scene {\r\n    constructor(document, canvas, background, entities) {\r\n        this._objects = [];\r\n        this._controls = [];\r\n        this._player = null;\r\n        this._enemies = [];\r\n        this._lastUpdate = 0;\r\n        this._fistUpdate = null;\r\n        this._canvas = canvas;\r\n        this._background = background;\r\n        this._document = document;\r\n        this._eventsListeners = [];\r\n        for (let i = 0; i < entities.length; i++)\r\n            this.mapObject(entities[i]);\r\n    }\r\n    mapObject(object) {\r\n        if (object instanceof control_1.Control)\r\n            this._controls.push(object);\r\n        else if (object instanceof gameObject_1.GameObject)\r\n            this._objects.push(object);\r\n        if (object instanceof shot_1.Shot)\r\n            this._shots.push(object);\r\n        else if (object instanceof player_1.Player)\r\n            this._player = object;\r\n        else if (object instanceof obstacle_1.Obstacle)\r\n            this._enemies.push(object);\r\n    }\r\n    play(newTime) {\r\n        if (this._fistUpdate === null)\r\n            this._fistUpdate = newTime;\r\n        newTime = newTime - this._fistUpdate;\r\n        if (newTime - this._lastUpdate > (1000 / world_1.World.FPS)) {\r\n            this._canvas.clear(this._background);\r\n            for (let i = 0; i < this._objects.length; i++)\r\n                this._objects[i].update(newTime);\r\n            this._canvas.context.save();\r\n            for (let i = 0; i < this._objects.length; i++)\r\n                this._objects[i].drawObject();\r\n            for (let i = 0; i < this._controls.length; i++)\r\n                this._controls[i].drawControl();\r\n            this._canvas.context.restore();\r\n            this._lastUpdate = newTime;\r\n        }\r\n    }\r\n    initialize() {\r\n        for (let i = 0; i < this._objects.length; i++)\r\n            this._eventsListeners = this._eventsListeners.concat(this._objects[i].inputAttach(this._document));\r\n        for (let i = 0; i < this._controls.length; i++)\r\n            this._eventsListeners = this._eventsListeners.concat(this._controls[i].inputAttach(this._document));\r\n    }\r\n    finalize() {\r\n        for (let i = 0; i < this._eventsListeners.length; i++)\r\n            this._document.removeEventListener(this._eventsListeners[i].type, this._eventsListeners[i].callback);\r\n    }\r\n}\r\nexports.Scene = Scene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/scene/scene.ts?");

/***/ }),

/***/ "./src/js/game/scene/sceneManager.ts":
/*!*******************************************!*\
  !*** ./src/js/game/scene/sceneManager.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass SceneManager {\r\n    constructor(scenes) {\r\n        this._scenes = scenes || [];\r\n        this._actualScene = -1;\r\n        this._lastUpdate = 0;\r\n        this._started = false;\r\n    }\r\n    setScene(name) {\r\n        let index;\r\n        let found = (index = this.lookForScene(name)) !== -1;\r\n        if (found) {\r\n            if (this._actualScene !== -1)\r\n                this._scenes[this._actualScene].scene.finalize();\r\n            this._actualScene = index;\r\n            this._scenes[this._actualScene].scene.initialize();\r\n        }\r\n        return found;\r\n    }\r\n    addScene(scene) {\r\n        this._scenes.push(scene);\r\n        return this;\r\n    }\r\n    start() {\r\n        this._started = true;\r\n        requestAnimationFrame(this.tick.bind(this));\r\n    }\r\n    stop() {\r\n        this._started = false;\r\n    }\r\n    tick(clock) {\r\n        if (this._started) {\r\n            if (this._actualScene !== -1)\r\n                this._scenes[this._actualScene].scene.play(clock);\r\n            requestAnimationFrame(this.tick.bind(this));\r\n        }\r\n    }\r\n    lookForScene(name) {\r\n        let index = -1;\r\n        for (let i = 0; i < this._scenes.length && index === -1; i++)\r\n            if (this._scenes[i].name === name)\r\n                index = i;\r\n        return index;\r\n    }\r\n}\r\nexports.SceneManager = SceneManager;\r\n\n\n//# sourceURL=webpack:///./src/js/game/scene/sceneManager.ts?");

/***/ }),

/***/ "./src/js/game/shot.ts":
/*!*****************************!*\
  !*** ./src/js/game/shot.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vec2_1 = __webpack_require__(/*! ./../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst gameObject_1 = __webpack_require__(/*! ./../physics/gameObject */ \"./src/js/physics/gameObject.ts\");\r\nclass Shot extends gameObject_1.GameObject {\r\n    constructor(initPosition, representation, firstUpdate) {\r\n        super(initPosition, new vec2_1.Vec2(1, 0), representation, firstUpdate);\r\n    }\r\n}\r\nexports.Shot = Shot;\r\n\n\n//# sourceURL=webpack:///./src/js/game/shot.ts?");

/***/ }),

/***/ "./src/js/game/world.ts":
/*!******************************!*\
  !*** ./src/js/game/world.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass World {\r\n}\r\nexports.World = World;\r\nWorld.FPS = 100;\r\nWorld.WORLD_WIDTH = 16;\r\nWorld.WORLD_HEIGHT = 9;\r\n\n\n//# sourceURL=webpack:///./src/js/game/world.ts?");

/***/ }),

/***/ "./src/js/graphics/canvas.ts":
/*!***********************************!*\
  !*** ./src/js/graphics/canvas.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Canvas {\r\n    constructor(id) {\r\n        this._canvas = document.getElementById(id);\r\n        this._context = this.canvas.getContext('2d');\r\n        document.addEventListener('resize', this.resizeCanvas);\r\n        this.resizeCanvas();\r\n    }\r\n    get canvas() {\r\n        return this._canvas;\r\n    }\r\n    clear(color) {\r\n        this._context.save();\r\n        if (!(color instanceof HTMLImageElement)) {\r\n            this._context.fillStyle = color;\r\n            //this._context.scale(0.5, 0.5);\r\n            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);\r\n        }\r\n        else\r\n            this._context.drawImage(color, 0, 0, this._canvas.width, this._canvas.height);\r\n        this._context.restore();\r\n    }\r\n    get context() {\r\n        return this._context;\r\n    }\r\n    resizeCanvas() {\r\n        this._canvas.height = innerHeight;\r\n        this._canvas.width = innerWidth;\r\n    }\r\n    get height() {\r\n        return this._canvas.height;\r\n    }\r\n    get width() {\r\n        return this._canvas.width;\r\n    }\r\n}\r\nexports.Canvas = Canvas;\r\nCanvas.NCOL = 20;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/canvas.ts?");

/***/ }),

/***/ "./src/js/graphics/controls/button.ts":
/*!********************************************!*\
  !*** ./src/js/graphics/controls/button.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst control_1 = __webpack_require__(/*! ./control */ \"./src/js/graphics/controls/control.ts\");\r\nvar ButtonState;\r\n(function (ButtonState) {\r\n    ButtonState[ButtonState[\"normal\"] = 0] = \"normal\";\r\n    ButtonState[ButtonState[\"pressed\"] = 1] = \"pressed\";\r\n})(ButtonState || (ButtonState = {}));\r\nclass TwoWayButton extends control_1.DrawableControl {\r\n    constructor(position, representation, action) {\r\n        super(position, representation.normal);\r\n        this._buttonResource = representation;\r\n        this._action = action;\r\n        this._state = ButtonState.normal;\r\n    }\r\n    buttonDownHandling(event) {\r\n        if (this.isIn(event.clientX, event.clientY) && this._state === ButtonState.normal) {\r\n            this.changeRepresentation(this._buttonResource.pressed);\r\n            this._state = ButtonState.pressed;\r\n        }\r\n    }\r\n    buttonUpHandling(event) {\r\n        if (this._state === ButtonState.pressed) {\r\n            this.changeRepresentation(this._buttonResource.normal);\r\n            this._state = ButtonState.normal;\r\n            if (this.isIn(event.clientX, event.clientY))\r\n                this._action();\r\n        }\r\n    }\r\n    inputAttach(documentReference) {\r\n        const references = [\r\n            { type: 'mousedown', callback: this.buttonDownHandling.bind(this) },\r\n            { type: 'mouseup', callback: this.buttonUpHandling.bind(this) }\r\n        ];\r\n        for (let i = 0; i < references.length; i++)\r\n            documentReference.addEventListener(references[i].type, references[i].callback);\r\n        return references;\r\n    }\r\n}\r\nexports.TwoWayButton = TwoWayButton;\r\nclass OneWayButton extends TwoWayButton {\r\n    constructor(position, representation, action) {\r\n        super(position, {\r\n            normal: representation,\r\n            pressed: representation\r\n        }, action);\r\n    }\r\n    buttonDownHandling(event) {\r\n        if (this.isIn(event.clientX, event.clientY) && this._state === ButtonState.normal)\r\n            this._state = ButtonState.pressed;\r\n    }\r\n    buttonUpHandling(event) {\r\n        if (this._state === ButtonState.pressed) {\r\n            this._state = ButtonState.normal;\r\n            if (this.isIn(event.clientX, event.clientY))\r\n                this._action();\r\n        }\r\n    }\r\n}\r\nexports.OneWayButton = OneWayButton;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/controls/button.ts?");

/***/ }),

/***/ "./src/js/graphics/controls/control.ts":
/*!*********************************************!*\
  !*** ./src/js/graphics/controls/control.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Control {\r\n    constructor(context, position, width, height) {\r\n        this._position = position;\r\n        this._width = width;\r\n        this._height = height;\r\n        this._inputHandlers = [];\r\n        this._context = context;\r\n    }\r\n    drawControl() {\r\n        throw new Error(`Method not implemented yet`);\r\n    }\r\n    get width() {\r\n        return this._width;\r\n    }\r\n    get height() {\r\n        return this._height;\r\n    }\r\n    isIn(x, y) {\r\n        return this._position.x < x &&\r\n            x < this._position.x + this._width &&\r\n            this._position.y < y &&\r\n            y < this._position.y + this._height;\r\n    }\r\n    inputAttach(documentReference) {\r\n        return [];\r\n    }\r\n    inputDetach(documentReference) { }\r\n    get context() {\r\n        return this._context;\r\n    }\r\n}\r\nexports.Control = Control;\r\nclass DrawableControl extends Control {\r\n    constructor(position, representation) {\r\n        super(representation.context, position, representation.width, representation.height);\r\n        this._image = representation;\r\n    }\r\n    drawControl() {\r\n        this._image.draw(this._position.x, this._position.y, false);\r\n    }\r\n    changeRepresentation(newRepresentation) {\r\n        this._image = newRepresentation;\r\n    }\r\n}\r\nexports.DrawableControl = DrawableControl;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/controls/control.ts?");

/***/ }),

/***/ "./src/js/graphics/controls/textBox.ts":
/*!*********************************************!*\
  !*** ./src/js/graphics/controls/textBox.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst control_1 = __webpack_require__(/*! ./control */ \"./src/js/graphics/controls/control.ts\");\r\nclass TextControl extends control_1.Control {\r\n    constructor(context, position, width, height, text, background) {\r\n        super(context, position, width, height);\r\n        this._fontSize = 0;\r\n        this._font = 'ethnocentricregular';\r\n        this._text = text;\r\n        this._fontColor = 'white';\r\n        this._align = 'center';\r\n        this._background = background || null;\r\n        this.balanceTextSize();\r\n    }\r\n    drawControl() {\r\n        this._context.save();\r\n        this.balanceTextSize();\r\n        this._context.rect(this._position.x, this._position.y, this._width, this._height);\r\n        this._context.fillStyle = this._fontColor;\r\n        this._context.textAlign = this._align;\r\n        if (this._background !== null)\r\n            if (this._background instanceof HTMLImageElement)\r\n                this._context.drawImage(this._background, this._position.x, this._position.y, this.width, this.height);\r\n            else\r\n                this._context.fillRect(this._position.x, this._position.y, this.width, this.height);\r\n        this._context.fillText(this._text, this._position.x + this.width * 0.5, this._position.y + this.height * 0.5);\r\n        this._context.clip();\r\n        this._context.restore();\r\n    }\r\n    changeText(text) {\r\n        this._text = text;\r\n    }\r\n    get align() {\r\n        return this._align;\r\n    }\r\n    get color() {\r\n        return this._fontColor;\r\n    }\r\n    set align(alignment) {\r\n        this._align = alignment;\r\n    }\r\n    set color(color) {\r\n        this._fontColor = color;\r\n    }\r\n    balanceTextSize() {\r\n        let textSize = 0;\r\n        this._context.font = `${textSize}pt ${this._font}`;\r\n        let measuredWidth = this._context.measureText(this._text).width;\r\n        while (measuredWidth < this._width) {\r\n            textSize += 1;\r\n            this._context.font = `${textSize}pt ${this._font}`;\r\n            measuredWidth = this._context.measureText(this._text).width;\r\n        }\r\n        console.log(`Text size: ${textSize}`);\r\n        this._fontSize = textSize - 1;\r\n        this._context.font = `${this._fontSize}pt ${this._font}`;\r\n    }\r\n}\r\nexports.TextControl = TextControl;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/controls/textBox.ts?");

/***/ }),

/***/ "./src/js/graphics/representations/animation.ts":
/*!******************************************************!*\
  !*** ./src/js/graphics/representations/animation.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Animation {\r\n    constructor(context, resource, framesNumber, scaleFactor, speedFactor) {\r\n        this._spritesheet = resource;\r\n        this._height = resource.content.height;\r\n        this._width = resource.content.width / framesNumber;\r\n        this._context = context;\r\n        this._framesNumber = framesNumber;\r\n        this._tickCounter = 0;\r\n        this._scaleFactor = scaleFactor || 0.4;\r\n        this._speedFactor = speedFactor ? this.normSpeedFactor(speedFactor) : this._scaleFactor;\r\n    }\r\n    draw(x, y, inversion) {\r\n        this._tickCounter = (this._tickCounter + this._speedFactor) % this._framesNumber;\r\n        this._context.save();\r\n        this._context.translate(x + 0.5 * this.width, y + 0.5 * this.height);\r\n        if (inversion)\r\n            this._context.scale(-1, 1);\r\n        this._context.drawImage(this._spritesheet.content, Math.trunc(this._tickCounter) * this._width, 0, this._width, this._height, -this.width / 2, -this.height / 2, this.width, this.height);\r\n        this._context.restore();\r\n    }\r\n    get width() {\r\n        return this._width * this._scaleFactor;\r\n    }\r\n    get height() {\r\n        return this._height * this._scaleFactor;\r\n    }\r\n    set speed(newVelocity) {\r\n        this._speedFactor = this.normSpeedFactor(newVelocity);\r\n    }\r\n    normSpeedFactor(factor) {\r\n        return Math.abs(factor % 1);\r\n    }\r\n    reset() {\r\n        this._tickCounter = 0;\r\n    }\r\n    get context() {\r\n        return this._context;\r\n    }\r\n    set context(context) {\r\n        this._context = context;\r\n    }\r\n}\r\nexports.Animation = Animation;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/representations/animation.ts?");

/***/ }),

/***/ "./src/js/graphics/representations/oneShotAnimation.ts":
/*!*************************************************************!*\
  !*** ./src/js/graphics/representations/oneShotAnimation.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst animation_1 = __webpack_require__(/*! ./animation */ \"./src/js/graphics/representations/animation.ts\");\r\nclass OneShotAnimation extends animation_1.Animation {\r\n    constructor(context, resource, framesNumber, scaleFactor, speedFactor) {\r\n        super(context, resource, framesNumber, scaleFactor, speedFactor);\r\n    }\r\n    draw(x, y, inversion) {\r\n        if (this._tickCounter < this._framesNumber - 1)\r\n            this._tickCounter = this._tickCounter + this._speedFactor;\r\n        this._context.save();\r\n        this._context.translate(x + 0.5 * this.width, y + 0.5 * this.height);\r\n        if (inversion)\r\n            this._context.scale(-1, 1);\r\n        this._context.drawImage(this._spritesheet.content, Math.trunc(this._tickCounter) * this._width, 0, this._width, this._height, -this.width / 2, -this.height / 2, this.width, this.height);\r\n        this._context.restore();\r\n    }\r\n}\r\nexports.OneShotAnimation = OneShotAnimation;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/representations/oneShotAnimation.ts?");

/***/ }),

/***/ "./src/js/graphics/representations/staticSprite.ts":
/*!*********************************************************!*\
  !*** ./src/js/graphics/representations/staticSprite.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass StaticSprite {\r\n    constructor(context, resource, scaleFactor) {\r\n        this._spritesheet = resource;\r\n        this._height = resource.content.height;\r\n        this._width = resource.content.width;\r\n        this._context = context;\r\n        this._scaleFactor = scaleFactor || 0.8;\r\n    }\r\n    draw(x, y, _) {\r\n        this._context.save();\r\n        this._context.drawImage(this._spritesheet.content, 0, 0, this._width, this._height, x, y, this.width, this.height);\r\n        this._context.restore();\r\n    }\r\n    get width() {\r\n        return this._width * this._scaleFactor;\r\n    }\r\n    get height() {\r\n        return this._height * this._scaleFactor;\r\n    }\r\n    get context() {\r\n        return this._context;\r\n    }\r\n    set context(context) {\r\n        this._context = context;\r\n    }\r\n}\r\nexports.StaticSprite = StaticSprite;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/representations/staticSprite.ts?");

/***/ }),

/***/ "./src/js/graphics/resourceLoader.ts":
/*!*******************************************!*\
  !*** ./src/js/graphics/resourceLoader.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n;\r\nclass ResourceManager {\r\n    constructor(resourceNameList) {\r\n        this._resourceNameList = resourceNameList || [];\r\n    }\r\n    getResource(id) {\r\n        for (let i = 0; i < this._resourceList.length; i++)\r\n            if (this._resourceList[i].id === id)\r\n                return this._resourceList[i];\r\n        return null;\r\n    }\r\n    getDrawable(id) {\r\n        for (let i = 0; i < this._resourceList.length; i++)\r\n            if (this._resourceList[i].id === id)\r\n                return this._resourceList[i].content;\r\n        return null;\r\n    }\r\n    resourcesPrefetch() {\r\n        const resources = this._resourceNameList;\r\n        return new Promise((resolve, reject) => {\r\n            const resourcePromises = [];\r\n            for (let i = 0; i < resources.length; i++)\r\n                resourcePromises.push(this.resourceFetch(resources[i]));\r\n            Promise.all(resourcePromises).then(resources => {\r\n                this._resourceList = resources;\r\n                resolve();\r\n            }).catch((e) => reject());\r\n        });\r\n    }\r\n    resourceFetch(resource) {\r\n        const path = `assets/imgs/${resource}.png`;\r\n        return new Promise((resolve, reject) => {\r\n            const img = new Image();\r\n            img.addEventListener('load', (e) => {\r\n                console.debug(`Resource ${resource} loaded from ${path}`);\r\n                const pathPool = resource.split('/');\r\n                resolve({ id: pathPool[pathPool.length - 1], content: img });\r\n            });\r\n            img.addEventListener('error', (error) => {\r\n                console.log(`Error loading resource ${resource} from ${path}`);\r\n                reject(error);\r\n            });\r\n            img.src = path;\r\n        });\r\n    }\r\n}\r\nexports.ResourceManager = ResourceManager;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/resourceLoader.ts?");

/***/ }),

/***/ "./src/js/main.ts":
/*!************************!*\
  !*** ./src/js/main.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst playScene_1 = __webpack_require__(/*! ./game/gui/playScene */ \"./src/js/game/gui/playScene.ts\");\r\nconst sceneManager_1 = __webpack_require__(/*! ./game/scene/sceneManager */ \"./src/js/game/scene/sceneManager.ts\");\r\nconst resourceLoader_1 = __webpack_require__(/*! ./graphics/resourceLoader */ \"./src/js/graphics/resourceLoader.ts\");\r\nconst canvas_1 = __webpack_require__(/*! ./graphics/canvas */ \"./src/js/graphics/canvas.ts\");\r\nconst startScene_1 = __webpack_require__(/*! ./game/gui/startScene */ \"./src/js/game/gui/startScene.ts\");\r\n//Resource Targeting\r\nconst resourceManager = new resourceLoader_1.ResourceManager([\r\n    'player/idle', 'player/run', 'player/jump',\r\n    'background', 'menu_background',\r\n    'red_barrel',\r\n    'gui/play_button_1', 'gui/play_button_2', 'gui/start_button',\r\n]);\r\n//Resource Prefetching\r\nresourceManager.resourcesPrefetch().then(() => {\r\n    console.log('Resource loaded');\r\n    const canvas = new canvas_1.Canvas('scene');\r\n    let sceneManager = new sceneManager_1.SceneManager();\r\n    let start = new startScene_1.StartScene(document, canvas, resourceManager, sceneManager);\r\n    let gameScene = new playScene_1.PlayScene(document, canvas, resourceManager, sceneManager);\r\n    sceneManager.addScene({\r\n        name: 'start', scene: start\r\n    }).addScene({\r\n        name: 'play', scene: gameScene\r\n    });\r\n    sceneManager.setScene('start');\r\n    sceneManager.start();\r\n}).catch((e) => alert(`Error during resources prefetching: ${e.stack}`));\r\n\n\n//# sourceURL=webpack:///./src/js/main.ts?");

/***/ }),

/***/ "./src/js/physics/fallingObject.ts":
/*!*****************************************!*\
  !*** ./src/js/physics/fallingObject.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst gameObject_1 = __webpack_require__(/*! ./gameObject */ \"./src/js/physics/gameObject.ts\");\r\nclass FallingObject extends gameObject_1.GameObject {\r\n    constructor(initosition, initVelocity, representation, firstUpdate) {\r\n        super(initosition, initVelocity, representation, firstUpdate);\r\n        this._isFloating = true;\r\n    }\r\n    update(time) {\r\n        this.updateVelocity(time);\r\n        super.update(time);\r\n    }\r\n    updateVelocity(time) {\r\n        if (this._isFloating) {\r\n            let dt = time - this._firstUpdate;\r\n            let vy = this._velocity.y + dt * FallingObject.GRAVITY_ACELERATION;\r\n            this._velocity.y = vy;\r\n        }\r\n    }\r\n}\r\nexports.FallingObject = FallingObject;\r\nFallingObject.GRAVITY_ACELERATION = 0.0001; //9.8;\r\n\n\n//# sourceURL=webpack:///./src/js/physics/fallingObject.ts?");

/***/ }),

/***/ "./src/js/physics/gameObject.ts":
/*!**************************************!*\
  !*** ./src/js/physics/gameObject.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vec2_1 = __webpack_require__(/*! ./vec2 */ \"./src/js/physics/vec2.ts\");\r\nclass GameObject {\r\n    constructor(initPosition, initVelocity, representation, firstUpdate, playerCollisionCallback) {\r\n        this._initPosition = initPosition;\r\n        this._actualPosition = initPosition;\r\n        this._velocity = initVelocity;\r\n        this._image = representation;\r\n        this._firstUpdate = firstUpdate;\r\n        this._playerCollisionCallback = playerCollisionCallback || (() => { });\r\n        this._inputHandlers = [];\r\n    }\r\n    //Velocity Management\r\n    getVelocity() {\r\n        return this._velocity;\r\n    }\r\n    setVelocity(time, nx, ny) {\r\n        if (this._velocity.x !== nx || this._velocity.y !== ny) {\r\n            this._initPosition = this._actualPosition;\r\n            this._firstUpdate = time;\r\n            this._velocity.x = nx;\r\n            this._velocity.y = ny;\r\n        }\r\n    }\r\n    //Game Logic Management\r\n    update(time) {\r\n        this._actualPosition = this.getPosition(time);\r\n    }\r\n    drawObject() {\r\n        this._image.draw(this._actualPosition.x, this._actualPosition.y, this._velocity.x < 0);\r\n    }\r\n    getPosition(time) {\r\n        let dt = time - this._firstUpdate;\r\n        let px = this._initPosition.x + dt * this._velocity.x;\r\n        let py = this._initPosition.y + dt * this._velocity.y;\r\n        return new vec2_1.Vec2(px, py);\r\n    }\r\n    isIn(x, y) {\r\n        return this._actualPosition.x < x &&\r\n            x < this._actualPosition.x + this._image.width &&\r\n            this._actualPosition.y < y &&\r\n            y < this._actualPosition.y + this._image.height;\r\n    }\r\n    //Representation Management\r\n    changeRepresentation(newRepresentation) {\r\n        this._image = newRepresentation;\r\n    }\r\n    get width() {\r\n        return this._image.width;\r\n    }\r\n    get height() {\r\n        return this._image.height;\r\n    }\r\n    inputAttach(documentReference) {\r\n        return [];\r\n    }\r\n}\r\nexports.GameObject = GameObject;\r\n\n\n//# sourceURL=webpack:///./src/js/physics/gameObject.ts?");

/***/ }),

/***/ "./src/js/physics/vec2.ts":
/*!********************************!*\
  !*** ./src/js/physics/vec2.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Axis;\r\n(function (Axis) {\r\n    Axis[Axis[\"Horizontal\"] = 0] = \"Horizontal\";\r\n    Axis[Axis[\"Vertical\"] = 1] = \"Vertical\";\r\n    Axis[Axis[\"Both\"] = 2] = \"Both\";\r\n})(Axis = exports.Axis || (exports.Axis = {}));\r\nclass Vec2 {\r\n    constructor(x, y) {\r\n        this._x = x || 0;\r\n        this._y = y || 0;\r\n    }\r\n    get x() {\r\n        return this._x;\r\n    }\r\n    get y() {\r\n        return this._y;\r\n    }\r\n    set x(x) {\r\n        this._x = x;\r\n    }\r\n    set y(y) {\r\n        this._y = y;\r\n    }\r\n    isEqual(v) {\r\n        return this._x === v.x && this._y === v.y;\r\n    }\r\n    static Zero() {\r\n        return new Vec2(0, 0);\r\n    }\r\n}\r\nexports.Vec2 = Vec2;\r\n;\r\n\n\n//# sourceURL=webpack:///./src/js/physics/vec2.ts?");

/***/ })

/******/ });