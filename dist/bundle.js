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

/***/ "./src/js/game/goal.ts":
/*!*****************************!*\
  !*** ./src/js/game/goal.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst obstacle_1 = __webpack_require__(/*! ./obstacles/obstacle */ \"./src/js/game/obstacles/obstacle.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ../graphics/representations/staticSprite */ \"./src/js/graphics/representations/staticSprite.ts\");\r\nclass Goal extends obstacle_1.Obstacle {\r\n    constructor(initPosition, resourceManager) {\r\n        super(initPosition, new vec2_1.Vec2(0, 0), resourceManager, false);\r\n        this._image = new staticSprite_1.StaticSprite(resourceManager.getResource('goal'), 0.3);\r\n    }\r\n    get width() {\r\n        return this._image.width * 0.5;\r\n    }\r\n    get height() {\r\n        return this._image.height * 0.5;\r\n    }\r\n}\r\nexports.Goal = Goal;\r\n\n\n//# sourceURL=webpack:///./src/js/game/goal.ts?");

/***/ }),

/***/ "./src/js/game/gui/gameOverScene.ts":
/*!******************************************!*\
  !*** ./src/js/game/gui/gameOverScene.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst control_1 = __webpack_require__(/*! ./../../graphics/controls/control */ \"./src/js/graphics/controls/control.ts\");\r\nconst oneShotAnimation_1 = __webpack_require__(/*! ./../../graphics/representations/oneShotAnimation */ \"./src/js/graphics/representations/oneShotAnimation.ts\");\r\nconst textBox_1 = __webpack_require__(/*! ./../../graphics/controls/textBox */ \"./src/js/graphics/controls/textBox.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ./../../graphics/representations/staticSprite */ \"./src/js/graphics/representations/staticSprite.ts\");\r\nconst button_1 = __webpack_require__(/*! ./../../graphics/controls/button */ \"./src/js/graphics/controls/button.ts\");\r\nconst scene_1 = __webpack_require__(/*! ./../scene/scene */ \"./src/js/game/scene/scene.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nclass GameOverScene extends scene_1.Scene {\r\n    constructor(document, canvas, resourceManager, sceneManager) {\r\n        let buttonResource = {\r\n            normal: new staticSprite_1.StaticSprite(resourceManager.getResource('replay_button_1')),\r\n            pressed: new staticSprite_1.StaticSprite(resourceManager.getResource('replay_button_2'))\r\n        };\r\n        let replayButton = new button_1.TwoWayButton(new vec2_1.Vec2((canvas.width - buttonResource.normal.width) * 0.5, (canvas.height - buttonResource.normal.height) * 0.5 - 300), buttonResource, () => {\r\n            sceneManager.setScene('play');\r\n        });\r\n        let robotSprite = new oneShotAnimation_1.OneShotAnimation(resourceManager.getResource('dead'), 9, 1.2, 0.3);\r\n        let deadRobot = new control_1.DrawableControl(new vec2_1.Vec2(canvas.width - robotSprite.width, canvas.height - robotSprite.height), robotSprite);\r\n        let textboxWidth = 1200;\r\n        let textboxHeight = 600;\r\n        super(document, canvas, resourceManager.getDrawable('menu_background'), [\r\n            replayButton,\r\n            deadRobot,\r\n            new textBox_1.TextControl(new vec2_1.Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5), textboxWidth, textboxHeight, 'Game Over')\r\n        ]);\r\n        this._robotAnimation = robotSprite;\r\n    }\r\n    finalize() {\r\n        super.finalize();\r\n        this._robotAnimation.reset();\r\n    }\r\n}\r\nexports.GameOverScene = GameOverScene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/gui/gameOverScene.ts?");

/***/ }),

/***/ "./src/js/game/gui/playScene.ts":
/*!**************************************!*\
  !*** ./src/js/game/gui/playScene.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst goal_1 = __webpack_require__(/*! ./../goal */ \"./src/js/game/goal.ts\");\r\nconst obstacle_1 = __webpack_require__(/*! ./../obstacles/obstacle */ \"./src/js/game/obstacles/obstacle.ts\");\r\nconst block_1 = __webpack_require__(/*! ./../obstacles/block */ \"./src/js/game/obstacles/block.ts\");\r\nconst textBox_1 = __webpack_require__(/*! ./../../graphics/controls/textBox */ \"./src/js/graphics/controls/textBox.ts\");\r\nconst player_1 = __webpack_require__(/*! ./../player */ \"./src/js/game/player.ts\");\r\nconst scene_1 = __webpack_require__(/*! ../scene/scene */ \"./src/js/game/scene/scene.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nclass PlayScene extends scene_1.Scene {\r\n    constructor(document, canvas, resourceManager, sceneManager) {\r\n        const shotsRequests = [];\r\n        const player = new player_1.Player(new vec2_1.Vec2(0, 100), resourceManager, 0, canvas.width, canvas.height, () => sceneManager.setScene('gameover'), () => sceneManager.setScene('win'));\r\n        let timeText = new textBox_1.TextControl(new vec2_1.Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));\r\n        const blocks = [\r\n            new block_1.Block(new vec2_1.Vec2(400, canvas.height - 300), resourceManager),\r\n            new block_1.Block(new vec2_1.Vec2(600, canvas.height - 600), resourceManager),\r\n            new block_1.Block(new vec2_1.Vec2(900, canvas.height - 500), resourceManager),\r\n        ];\r\n        const goal = new goal_1.Goal(new vec2_1.Vec2(canvas.width - 200, canvas.height - 300), resourceManager);\r\n        let bomb1 = new obstacle_1.Bomb(new vec2_1.Vec2(100, canvas.height - 300), resourceManager);\r\n        let missile = new obstacle_1.Missile(canvas.width, canvas.height - 500, resourceManager);\r\n        super(document, canvas, resourceManager.getDrawable('menu_background'), [\r\n            player,\r\n            timeText,\r\n            bomb1,\r\n            missile,\r\n            goal\r\n        ].concat(blocks));\r\n        this.timeText = timeText;\r\n        this.shotsRequests = shotsRequests;\r\n    }\r\n    play(newTime) {\r\n        super.play(newTime);\r\n        this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);\r\n    }\r\n}\r\nexports.PlayScene = PlayScene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/gui/playScene.ts?");

/***/ }),

/***/ "./src/js/game/gui/startScene.ts":
/*!***************************************!*\
  !*** ./src/js/game/gui/startScene.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst button_1 = __webpack_require__(/*! ./../../graphics/controls/button */ \"./src/js/graphics/controls/button.ts\");\r\nconst animation_1 = __webpack_require__(/*! ./../../graphics/representations/animation */ \"./src/js/graphics/representations/animation.ts\");\r\nconst scene_1 = __webpack_require__(/*! ../scene/scene */ \"./src/js/game/scene/scene.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ../../graphics/representations/staticSprite */ \"./src/js/graphics/representations/staticSprite.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst textBox_1 = __webpack_require__(/*! ../../graphics/controls/textBox */ \"./src/js/graphics/controls/textBox.ts\");\r\nconst control_1 = __webpack_require__(/*! ../../graphics/controls/control */ \"./src/js/graphics/controls/control.ts\");\r\nclass StartScene extends scene_1.Scene {\r\n    constructor(document, canvas, resourceManager, sceneManager) {\r\n        let button_normal = resourceManager.getResource('start_button');\r\n        let sprite_normal = new staticSprite_1.StaticSprite(button_normal);\r\n        let textboxWidth = 1200;\r\n        let textboxHeight = 500;\r\n        let robot_resource = resourceManager.getResource('idle');\r\n        let spriteRobot = new animation_1.Animation(robot_resource, 9, 1.2, 0.4);\r\n        super(document, canvas, resourceManager.getDrawable('menu_background'), [\r\n            new button_1.OneWayButton(new vec2_1.Vec2((canvas.width - sprite_normal.width) * 0.5, (canvas.height - sprite_normal.height) * 0.5), sprite_normal, () => {\r\n                sceneManager.setScene('play');\r\n            }),\r\n            new textBox_1.TextControl(new vec2_1.Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5 - 200), textboxWidth, textboxHeight, 'RoboWar'),\r\n            new control_1.DrawableControl(new vec2_1.Vec2(0, (canvas.height - spriteRobot.height) * 0.5 + 200), spriteRobot),\r\n        ]);\r\n    }\r\n}\r\nexports.StartScene = StartScene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/gui/startScene.ts?");

/***/ }),

/***/ "./src/js/game/gui/winScene.ts":
/*!*************************************!*\
  !*** ./src/js/game/gui/winScene.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst animation_1 = __webpack_require__(/*! ./../../graphics/representations/animation */ \"./src/js/graphics/representations/animation.ts\");\r\nconst control_1 = __webpack_require__(/*! ./../../graphics/controls/control */ \"./src/js/graphics/controls/control.ts\");\r\nconst textBox_1 = __webpack_require__(/*! ./../../graphics/controls/textBox */ \"./src/js/graphics/controls/textBox.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ./../../graphics/representations/staticSprite */ \"./src/js/graphics/representations/staticSprite.ts\");\r\nconst button_1 = __webpack_require__(/*! ./../../graphics/controls/button */ \"./src/js/graphics/controls/button.ts\");\r\nconst scene_1 = __webpack_require__(/*! ./../scene/scene */ \"./src/js/game/scene/scene.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nclass WinScene extends scene_1.Scene {\r\n    constructor(document, canvas, resourceManager, sceneManager) {\r\n        let buttonResource = {\r\n            normal: new staticSprite_1.StaticSprite(resourceManager.getResource('menu_button_1')),\r\n            pressed: new staticSprite_1.StaticSprite(resourceManager.getResource('menu_button_2'))\r\n        };\r\n        let replayButton = new button_1.TwoWayButton(new vec2_1.Vec2((canvas.width - buttonResource.normal.width) * 0.5, (canvas.height - buttonResource.normal.height) * 0.5 - 300), buttonResource, () => {\r\n            sceneManager.setScene('start');\r\n        });\r\n        let robotSprite = new animation_1.Animation(resourceManager.getResource('idle'), 9, 1.2, 0.3);\r\n        let deadRobot = new control_1.DrawableControl(new vec2_1.Vec2(canvas.width - robotSprite.width, canvas.height - robotSprite.height), robotSprite);\r\n        let textboxWidth = 500;\r\n        let textboxHeight = 400;\r\n        const starSprite = new staticSprite_1.StaticSprite(resourceManager.getResource('goal'), 0.3);\r\n        super(document, canvas, resourceManager.getDrawable('menu_background'), [\r\n            replayButton,\r\n            deadRobot,\r\n            new textBox_1.TextControl(new vec2_1.Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5), textboxWidth, textboxHeight, 'You Win!')\r\n        ]);\r\n        this._robotAnimation = robotSprite;\r\n    }\r\n    finalize() {\r\n        super.finalize();\r\n        this._robotAnimation.reset();\r\n    }\r\n}\r\nexports.WinScene = WinScene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/gui/winScene.ts?");

/***/ }),

/***/ "./src/js/game/obstacles/block.ts":
/*!****************************************!*\
  !*** ./src/js/game/obstacles/block.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst obstacle_1 = __webpack_require__(/*! ./obstacle */ \"./src/js/game/obstacles/obstacle.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ../../graphics/representations/staticSprite */ \"./src/js/graphics/representations/staticSprite.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nclass Block extends obstacle_1.Obstacle {\r\n    constructor(initPosition, resourceManager) {\r\n        super(initPosition, vec2_1.Vec2.Zero(), resourceManager, false);\r\n        this._image = new staticSprite_1.StaticSprite(resourceManager.getResource('block'), 0.3);\r\n    }\r\n}\r\nexports.Block = Block;\r\n\n\n//# sourceURL=webpack:///./src/js/game/obstacles/block.ts?");

/***/ }),

/***/ "./src/js/game/obstacles/obstacle.ts":
/*!*******************************************!*\
  !*** ./src/js/game/obstacles/obstacle.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst animation_1 = __webpack_require__(/*! ./../../graphics/representations/animation */ \"./src/js/graphics/representations/animation.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst gameObject_1 = __webpack_require__(/*! ../../physics/gameObject */ \"./src/js/physics/gameObject.ts\");\r\nclass Obstacle extends gameObject_1.GameObject {\r\n    constructor(initPosition, initVelocity, resourceManager, deadly) {\r\n        super(initPosition, initVelocity, resourceManager, 0);\r\n        this._deadly = deadly;\r\n    }\r\n    get deadly() {\r\n        return this._deadly;\r\n    }\r\n}\r\nexports.Obstacle = Obstacle;\r\nclass Bomb extends Obstacle {\r\n    constructor(initPosition, resourceManager) {\r\n        super(initPosition, new vec2_1.Vec2(0, Bomb.BOMB_VELOCITY), resourceManager, true);\r\n        this._image = new animation_1.Animation(resourceManager.getResource('one'), 10);\r\n    }\r\n    update(time) {\r\n        const position = this.getPosition(time);\r\n        const goingUp = this.getVelocity().y < 0;\r\n        if (Math.abs(position.y - this._initPosition.y) > 100)\r\n            this.setVelocity(time, this.getVelocity().x, goingUp ? Bomb.BOMB_VELOCITY : -Bomb.BOMB_VELOCITY);\r\n    }\r\n    get width() {\r\n        return this._image.width * 0.6;\r\n    }\r\n}\r\nexports.Bomb = Bomb;\r\nBomb.BOMB_VELOCITY = 0.2;\r\nclass Missile extends Obstacle {\r\n    constructor(worldWidth, initHeight, resourceManager) {\r\n        super(new vec2_1.Vec2(worldWidth + 100, initHeight), new vec2_1.Vec2(-Missile.MISSILE_VELOCITY, 0), resourceManager, true);\r\n        this._image = new animation_1.Animation(resourceManager.getResource('missile_one'), 9);\r\n    }\r\n    update(time) {\r\n        const position = this.getPosition(time);\r\n        if (position.x < -this.width)\r\n            this.setPosition(time, this._originalPosition.x, this._originalPosition.y);\r\n    }\r\n    get width() {\r\n        return this._image.width * 0.7;\r\n    }\r\n    get height() {\r\n        return this._image.height * 0.5;\r\n    }\r\n}\r\nexports.Missile = Missile;\r\nMissile.MISSILE_VELOCITY = 1;\r\n\n\n//# sourceURL=webpack:///./src/js/game/obstacles/obstacle.ts?");

/***/ }),

/***/ "./src/js/game/player.ts":
/*!*******************************!*\
  !*** ./src/js/game/player.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst goal_1 = __webpack_require__(/*! ./goal */ \"./src/js/game/goal.ts\");\r\nconst fallingObject_1 = __webpack_require__(/*! ./../physics/fallingObject */ \"./src/js/physics/fallingObject.ts\");\r\nconst animation_1 = __webpack_require__(/*! ../graphics/representations/animation */ \"./src/js/graphics/representations/animation.ts\");\r\nconst vec2_1 = __webpack_require__(/*! ../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst gameObject_1 = __webpack_require__(/*! ../physics/gameObject */ \"./src/js/physics/gameObject.ts\");\r\nconst oneShotAnimation_1 = __webpack_require__(/*! ../graphics/representations/oneShotAnimation */ \"./src/js/graphics/representations/oneShotAnimation.ts\");\r\nvar MovementKeys;\r\n(function (MovementKeys) {\r\n    MovementKeys[MovementKeys[\"LEFT\"] = 37] = \"LEFT\";\r\n    MovementKeys[MovementKeys[\"RIGHT\"] = 39] = \"RIGHT\";\r\n    MovementKeys[MovementKeys[\"JUMP\"] = 32] = \"JUMP\";\r\n    MovementKeys[MovementKeys[\"SHOT\"] = 17] = \"SHOT\";\r\n})(MovementKeys || (MovementKeys = {}));\r\n;\r\nvar PlayerStates;\r\n(function (PlayerStates) {\r\n    PlayerStates[PlayerStates[\"RUNNING\"] = 0] = \"RUNNING\";\r\n    PlayerStates[PlayerStates[\"IDLING\"] = 1] = \"IDLING\";\r\n    PlayerStates[PlayerStates[\"JUMPING\"] = 2] = \"JUMPING\";\r\n})(PlayerStates = exports.PlayerStates || (exports.PlayerStates = {}));\r\n;\r\nclass PlayerStatesResources {\r\n    constructor(runningState, idlingState, jumpingState) {\r\n        this._runningState = runningState;\r\n        this._idlingState = idlingState,\r\n            this._jumpingState = jumpingState;\r\n    }\r\n    getRelatedAnimation(state) {\r\n        switch (state) {\r\n            case PlayerStates.IDLING: return this._idlingState;\r\n            case PlayerStates.JUMPING: return this._jumpingState;\r\n            case PlayerStates.RUNNING: return this._runningState;\r\n            default: return this._idlingState;\r\n        }\r\n    }\r\n    get running() {\r\n        return this._runningState;\r\n    }\r\n    get jumping() {\r\n        return this._jumpingState;\r\n    }\r\n    get idling() {\r\n        return this._idlingState;\r\n    }\r\n}\r\nexports.PlayerStatesResources = PlayerStatesResources;\r\n;\r\nclass Player extends fallingObject_1.FallingObject {\r\n    constructor(initPosition, resourceManager, firstUpdate, maxWidth, maxHeight, dyingAction, winningAction) {\r\n        super(initPosition, vec2_1.Vec2.Zero(), resourceManager, firstUpdate);\r\n        this._playerState = PlayerStates.IDLING;\r\n        this._playerStatesResources = new PlayerStatesResources(new animation_1.Animation(resourceManager.getResource('run'), 9, 0.3), new animation_1.Animation(resourceManager.getResource('idle'), 9, 0.3), new oneShotAnimation_1.OneShotAnimation(resourceManager.getResource('jump'), 9, 0.3));\r\n        this._actualResource = this._playerStatesResources.idling;\r\n        this._playerActualMovement = {\r\n            left: false, right: false,\r\n            jump: false, shot: false\r\n        };\r\n        this._playerMovementRequest = {\r\n            left: false, right: false,\r\n            jump: false, shot: false\r\n        };\r\n        this._worldBounds = {\r\n            width: maxWidth,\r\n            height: maxHeight\r\n        };\r\n        this._dyingAction = dyingAction;\r\n        this._winningAction = winningAction;\r\n    }\r\n    update(time, colliding) {\r\n        const oldPosition = this.getPosition(time);\r\n        const oldVelocity = this.getVelocity();\r\n        let onABrick = undefined !== colliding.find(obj => obj.side === gameObject_1.Direction.BOTTOM && oldVelocity.y > 0);\r\n        if (this._isFloating && onABrick)\r\n            this.bottomBoundsHitHandling();\r\n        else if (oldPosition.y < this._worldBounds.height - this.height)\r\n            this._isFloating = true;\r\n        super.update(time);\r\n        if (colliding.some(object => object.collider.deadly))\r\n            this._dyingAction();\r\n        else if (colliding.some(object => object.collider instanceof goal_1.Goal))\r\n            this._winningAction();\r\n        else {\r\n            this.collidingsHandling(time, colliding, oldPosition, oldVelocity);\r\n            this.boundsAdjustPosition(time);\r\n            this.manageInputRequests(time);\r\n        }\r\n    }\r\n    changeState(newState) {\r\n        if (newState != this._playerState) {\r\n            this._playerState = newState;\r\n            this._actualResource.reset();\r\n            this._actualResource = this._playerStatesResources.getRelatedAnimation(newState);\r\n            this.changeRepresentation(this._actualResource);\r\n        }\r\n    }\r\n    shotHandling() {\r\n    }\r\n    reset() {\r\n        super.reset();\r\n        this._playerState = PlayerStates.IDLING;\r\n        this._actualResource = this._playerStatesResources.idling;\r\n        this.changeRepresentation(this._actualResource);\r\n        this._playerActualMovement = {\r\n            left: false, right: false,\r\n            jump: false, shot: false\r\n        };\r\n        this._playerMovementRequest = {\r\n            left: false, right: false,\r\n            jump: false, shot: false\r\n        };\r\n    }\r\n    // BOUNDS COLLISION HANDLING\r\n    boundsAdjustPosition(time) {\r\n        let lastPosition = this.getPosition(time);\r\n        let leftBounce = (x) => {\r\n            this.setPosition(time, x, lastPosition.y);\r\n            this.setVelocity(time, 0, 0);\r\n        };\r\n        let rightBounce = (max) => {\r\n            this.setPosition(time, max - this.width, lastPosition.y);\r\n            this.setVelocity(time, 0, 0);\r\n        };\r\n        let topBounce = (y) => {\r\n            this.setPosition(time, lastPosition.x, y);\r\n            this.setVelocity(time, this._velocity.x, 0);\r\n        };\r\n        let bottomBounce = (max) => {\r\n            this.setPosition(time, lastPosition.x, max - this.height);\r\n            this.setVelocity(time, this._velocity.x, 0);\r\n            this.bottomBoundsHitHandling();\r\n        };\r\n        if (lastPosition.x < 0)\r\n            leftBounce(0);\r\n        else if (lastPosition.y < 0)\r\n            topBounce(0);\r\n        else if (lastPosition.x + this.width > this._worldBounds.width)\r\n            rightBounce(this._worldBounds.width);\r\n        else if (lastPosition.y + this.height > this._worldBounds.height)\r\n            bottomBounce(this._worldBounds.height);\r\n    }\r\n    bottomBoundsHitHandling() {\r\n        this._isFloating = false;\r\n        this._playerActualMovement.jump = false;\r\n        if (this.getVelocity().x !== 0)\r\n            this.changeState(PlayerStates.RUNNING);\r\n        else\r\n            this.changeState(PlayerStates.IDLING);\r\n    }\r\n    collidingsHandling(time, colliding, oldPosition, oldVelocity) {\r\n        const wishedPosition = this.getPosition(time);\r\n        for (let col of colliding) {\r\n            if (col.side === gameObject_1.Direction.RIGHT && oldVelocity.x > 0) {\r\n                this.setPosition(time, col.collider.getPosition(time).x - this.width, oldPosition.y);\r\n                this.setVelocity(time, 0, this._velocity.y);\r\n            }\r\n            else if (col.side === gameObject_1.Direction.LEFT && oldVelocity.x < 0) {\r\n                this.setPosition(time, col.collider.getPosition(time).x + col.collider.width, oldPosition.y);\r\n                this.setVelocity(time, 0, this._velocity.y);\r\n            }\r\n            else if (col.side === gameObject_1.Direction.TOP && oldVelocity.y < 0) {\r\n                this.setPosition(time, wishedPosition.x, col.collider.getPosition(time).y + col.collider.height);\r\n                this.setVelocity(time, this._velocity.x, 0);\r\n            }\r\n            else if (col.side === gameObject_1.Direction.BOTTOM && oldVelocity.y > 0) {\r\n                this.setPosition(time, wishedPosition.x, col.collider.getPosition(time).y - this.height);\r\n                this.setVelocity(time, this._velocity.x, 0);\r\n            }\r\n        }\r\n    }\r\n    get width() {\r\n        return this._image.width * 0.5;\r\n    }\r\n    get height() {\r\n        return this._image.height * 0.9;\r\n    }\r\n    // INPUT MANAGEMENT\r\n    manageInputRequests(time) {\r\n        if (this._playerMovementRequest.left && !this._playerMovementRequest.right) {\r\n            if (!this._playerActualMovement.left) {\r\n                if (!this._isFloating)\r\n                    this.changeState(PlayerStates.RUNNING);\r\n                this.setVelocity(time, -Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);\r\n                this._playerActualMovement.left = true;\r\n            }\r\n            this._playerMovementRequest.left = false;\r\n        }\r\n        if (this._playerMovementRequest.right) {\r\n            if (!this._playerActualMovement.right) {\r\n                if (!this._isFloating)\r\n                    this.changeState(PlayerStates.RUNNING);\r\n                this.setVelocity(time, Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);\r\n                this._playerActualMovement.right = true;\r\n            }\r\n            this._playerMovementRequest.right = false;\r\n        }\r\n        if (this._playerMovementRequest.jump) {\r\n            if (!this._playerActualMovement.jump) {\r\n                this.changeState(PlayerStates.JUMPING);\r\n                this.setVelocity(time, this._velocity.x, -Player.RUNNING_VERTICAL_VELOCITY);\r\n                this._playerActualMovement.jump = true;\r\n                this._isFloating = true;\r\n            }\r\n            this._playerMovementRequest.jump = false;\r\n        }\r\n        if (this._playerMovementRequest.shot) {\r\n            if (!this._playerActualMovement.shot) {\r\n                this._playerActualMovement.shot = true;\r\n                this.shotHandling();\r\n            }\r\n            this._playerMovementRequest.shot = false;\r\n        }\r\n        if (!this._playerActualMovement.jump && !this._playerActualMovement.shot &&\r\n            !this._playerActualMovement.left && !this._playerActualMovement.right) {\r\n            this.setVelocity(time, 0, this._velocity.y);\r\n            this.changeState(this._isFloating && this._playerActualMovement.jump ? PlayerStates.JUMPING : PlayerStates.IDLING);\r\n        }\r\n    }\r\n    inputAttach(documentReference) {\r\n        const references = [\r\n            { type: 'keydown', callback: this.keyDownHandling.bind(this) },\r\n            { type: 'keyup', callback: this.keyUpHandling.bind(this) }\r\n        ];\r\n        for (let i = 0; i < references.length; i++)\r\n            documentReference.addEventListener(references[i].type, references[i].callback);\r\n        return references;\r\n    }\r\n    keyDownHandling(event) {\r\n        switch (event.keyCode) {\r\n            case MovementKeys.RIGHT:\r\n                this._playerMovementRequest.right = true;\r\n                break;\r\n            case MovementKeys.LEFT:\r\n                this._playerMovementRequest.left = true;\r\n                break;\r\n            case MovementKeys.JUMP:\r\n                this._playerMovementRequest.jump = true;\r\n                break;\r\n            case MovementKeys.SHOT:\r\n                this._playerMovementRequest.shot = true;\r\n                break;\r\n        }\r\n    }\r\n    keyUpHandling(event) {\r\n        switch (event.keyCode) {\r\n            case MovementKeys.LEFT:\r\n                this._playerActualMovement.left = this._playerMovementRequest.left = false;\r\n                break;\r\n            case MovementKeys.RIGHT:\r\n                this._playerActualMovement.right = this._playerMovementRequest.right = false;\r\n                break;\r\n            case MovementKeys.SHOT:\r\n                this._playerActualMovement.shot = false;\r\n                break;\r\n        }\r\n    }\r\n}\r\nexports.Player = Player;\r\nPlayer.RUNNING_HORIZONTAL_VELOCITY = 0.5;\r\nPlayer.RUNNING_VERTICAL_VELOCITY = 3.5;\r\n\n\n//# sourceURL=webpack:///./src/js/game/player.ts?");

/***/ }),

/***/ "./src/js/game/scene/scene.ts":
/*!************************************!*\
  !*** ./src/js/game/scene/scene.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst gameObject_1 = __webpack_require__(/*! ./../../physics/gameObject */ \"./src/js/physics/gameObject.ts\");\r\nconst control_1 = __webpack_require__(/*! ../../graphics/controls/control */ \"./src/js/graphics/controls/control.ts\");\r\nconst world_1 = __webpack_require__(/*! ../world */ \"./src/js/game/world.ts\");\r\nconst obstacle_1 = __webpack_require__(/*! ../obstacles/obstacle */ \"./src/js/game/obstacles/obstacle.ts\");\r\nconst player_1 = __webpack_require__(/*! ../player */ \"./src/js/game/player.ts\");\r\nconst shot_1 = __webpack_require__(/*! ../shot */ \"./src/js/game/shot.ts\");\r\nclass Scene {\r\n    constructor(document, canvas, background, entities) {\r\n        this._objects = [];\r\n        this._controls = [];\r\n        this._player = null;\r\n        this._obstacles = [];\r\n        this._shots = [];\r\n        this._lastUpdate = 0;\r\n        this._fistUpdate = null;\r\n        this._canvas = canvas;\r\n        this._background = background;\r\n        this._document = document;\r\n        this._eventsListeners = [];\r\n        for (let i = 0; i < entities.length; i++)\r\n            this.mapObject(entities[i]);\r\n    }\r\n    mapObject(object) {\r\n        if (object instanceof control_1.Control)\r\n            this._controls.push(object);\r\n        else if (object instanceof gameObject_1.GameObject)\r\n            this._objects.push(object);\r\n        if (object instanceof shot_1.Shot)\r\n            this._shots.push(object);\r\n        else if (object instanceof player_1.Player)\r\n            this._player = object;\r\n        else if (object instanceof obstacle_1.Obstacle)\r\n            this._obstacles.push(object);\r\n    }\r\n    play(newTime) {\r\n        if (this._fistUpdate === null)\r\n            this._fistUpdate = newTime;\r\n        newTime = newTime - this._fistUpdate;\r\n        if (newTime - this._lastUpdate > (1000 / world_1.World.FPS)) {\r\n            //Game objects position updating\r\n            for (let i = 0; i < this._objects.length; i++)\r\n                if (!(this._objects[i] instanceof player_1.Player))\r\n                    this._objects[i].update(newTime);\r\n            //Player updating\r\n            if (this._player)\r\n                this._player.update(newTime, this.getCollisions(newTime, this._player));\r\n            //Drawing the objects\r\n            this._canvas.clear(this._background);\r\n            this._canvas.context.save();\r\n            for (let i = 0; i < this._objects.length; i++)\r\n                this._objects[i].drawObject(newTime, this._canvas.context);\r\n            for (let i = 0; i < this._controls.length; i++)\r\n                this._controls[i].drawControl(this._canvas.context);\r\n            this._canvas.context.restore();\r\n            this._lastUpdate = newTime;\r\n        }\r\n    }\r\n    initialize() {\r\n        this._lastUpdate = 0;\r\n        this._fistUpdate = null;\r\n        for (let i = 0; i < this._objects.length; i++)\r\n            this._eventsListeners = this._eventsListeners.concat(this._objects[i].inputAttach(this._document));\r\n        for (let i = 0; i < this._controls.length; i++)\r\n            this._eventsListeners = this._eventsListeners.concat(this._controls[i].inputAttach(this._document));\r\n        for (let o of this._objects)\r\n            o.reset();\r\n    }\r\n    finalize() {\r\n        for (let i = 0; i < this._eventsListeners.length; i++)\r\n            this._document.removeEventListener(this._eventsListeners[i].type, this._eventsListeners[i].callback);\r\n    }\r\n    getCollisions(time, object) {\r\n        const colliding = [];\r\n        if (object) {\r\n            for (let obj of this._objects)\r\n                if (object !== obj) {\r\n                    let direction = object.isColliding(time, obj);\r\n                    if (direction !== null)\r\n                        colliding.push({\r\n                            collider: obj,\r\n                            side: direction\r\n                        });\r\n                }\r\n        }\r\n        return colliding;\r\n    }\r\n}\r\nexports.Scene = Scene;\r\n\n\n//# sourceURL=webpack:///./src/js/game/scene/scene.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vec2_1 = __webpack_require__(/*! ./../physics/vec2 */ \"./src/js/physics/vec2.ts\");\r\nconst gameObject_1 = __webpack_require__(/*! ./../physics/gameObject */ \"./src/js/physics/gameObject.ts\");\r\nconst staticSprite_1 = __webpack_require__(/*! ../graphics/representations/staticSprite */ \"./src/js/graphics/representations/staticSprite.ts\");\r\nclass Shot extends gameObject_1.GameObject {\r\n    constructor(initPosition, resourceManager, firstUpdate) {\r\n        super(initPosition, new vec2_1.Vec2(1, 0), resourceManager, firstUpdate);\r\n        this._image = new staticSprite_1.StaticSprite(resourceManager.getResource('shot'));\r\n    }\r\n}\r\nexports.Shot = Shot;\r\n\n\n//# sourceURL=webpack:///./src/js/game/shot.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Control {\r\n    constructor(position, width, height) {\r\n        this._position = position;\r\n        this._width = width;\r\n        this._height = height;\r\n        this._inputHandlers = [];\r\n    }\r\n    drawControl(context) {\r\n        throw new Error(`Method not implemented yet`);\r\n    }\r\n    get width() {\r\n        return this._width;\r\n    }\r\n    get height() {\r\n        return this._height;\r\n    }\r\n    isIn(x, y) {\r\n        return this._position.x < x &&\r\n            x < this._position.x + this._width &&\r\n            this._position.y < y &&\r\n            y < this._position.y + this._height;\r\n    }\r\n    inputAttach(documentReference) {\r\n        return [];\r\n    }\r\n    inputDetach(documentReference) { }\r\n}\r\nexports.Control = Control;\r\nclass DrawableControl extends Control {\r\n    constructor(position, representation) {\r\n        super(position, representation.width, representation.height);\r\n        this._image = representation;\r\n    }\r\n    drawControl(context) {\r\n        this._image.draw(context, this._position.x, this._position.y, false);\r\n    }\r\n    changeRepresentation(newRepresentation) {\r\n        this._image = newRepresentation;\r\n    }\r\n}\r\nexports.DrawableControl = DrawableControl;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/controls/control.ts?");

/***/ }),

/***/ "./src/js/graphics/controls/textBox.ts":
/*!*********************************************!*\
  !*** ./src/js/graphics/controls/textBox.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst control_1 = __webpack_require__(/*! ./control */ \"./src/js/graphics/controls/control.ts\");\r\nclass TextControl extends control_1.Control {\r\n    constructor(position, width, height, text, background) {\r\n        super(position, width, height);\r\n        this._fontSize = 0;\r\n        this._font = 'ethnocentricregular';\r\n        this._text = text;\r\n        this._fontColor = 'white';\r\n        this._align = 'center';\r\n        this._background = background || null;\r\n    }\r\n    drawControl(context) {\r\n        context.save();\r\n        this.balanceTextSize(context);\r\n        if (this._background !== null) {\r\n            if (this._background instanceof HTMLImageElement)\r\n                context.drawImage(this._background, this._position.x, this._position.y, this.width, this.height);\r\n            else {\r\n                context.fillStyle = this._background;\r\n                context.fillRect(this._position.x, this._position.y, this.width, this.height);\r\n            }\r\n        }\r\n        this.adjustEveryThing(context);\r\n        context.fillText(this._text, this._position.x + this.width * 0.5, this._position.y + this.height * 0.5);\r\n        context.restore();\r\n    }\r\n    changeText(text) {\r\n        this._text = text;\r\n    }\r\n    get align() {\r\n        return this._align;\r\n    }\r\n    get color() {\r\n        return this._fontColor;\r\n    }\r\n    set align(alignment) {\r\n        this._align = alignment;\r\n    }\r\n    set color(color) {\r\n        this._fontColor = color;\r\n    }\r\n    balanceTextSize(context) {\r\n        let textSize = 0;\r\n        context.font = `${textSize}pt ${this._font}`;\r\n        let measuredWidth = context.measureText(this._text).width;\r\n        while (measuredWidth < this._width) {\r\n            textSize += 1;\r\n            context.font = `${textSize}pt ${this._font}`;\r\n            measuredWidth = context.measureText(this._text).width;\r\n        }\r\n        this._fontSize = textSize - 10;\r\n        context.font = `${this._fontSize}pt ${this._font}`;\r\n    }\r\n    adjustEveryThing(context) {\r\n        context.fillStyle = this._fontColor;\r\n        context.textAlign = this._align;\r\n        context.textBaseline = \"middle\";\r\n        context.font = `${this._fontSize}pt ${this._font}`;\r\n    }\r\n}\r\nexports.TextControl = TextControl;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/controls/textBox.ts?");

/***/ }),

/***/ "./src/js/graphics/representations/animation.ts":
/*!******************************************************!*\
  !*** ./src/js/graphics/representations/animation.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Animation {\r\n    constructor(resource, framesNumber, scaleFactor, speedFactor) {\r\n        this._spritesheet = resource;\r\n        this._height = resource.content.height;\r\n        this._width = resource.content.width / framesNumber;\r\n        this._framesNumber = framesNumber;\r\n        this._tickCounter = 0;\r\n        this._scaleFactor = scaleFactor || 0.4;\r\n        this._speedFactor = speedFactor ? this.normSpeedFactor(speedFactor) : this._scaleFactor;\r\n    }\r\n    draw(context, x, y, inversion) {\r\n        this._tickCounter = (this._tickCounter + this._speedFactor) % this._framesNumber;\r\n        context.save();\r\n        context.translate(x + 0.5 * this.width, y + 0.5 * this.height);\r\n        if (inversion)\r\n            context.scale(-1, 1);\r\n        context.drawImage(this._spritesheet.content, Math.trunc(this._tickCounter) * this._width, 0, this._width, this._height, -this.width / 2, -this.height / 2, this.width, this.height);\r\n        context.restore();\r\n    }\r\n    get width() {\r\n        return this._width * this._scaleFactor;\r\n    }\r\n    get height() {\r\n        return this._height * this._scaleFactor;\r\n    }\r\n    set speed(newVelocity) {\r\n        this._speedFactor = this.normSpeedFactor(newVelocity);\r\n    }\r\n    normSpeedFactor(factor) {\r\n        return Math.abs(factor % 1);\r\n    }\r\n    reset() {\r\n        this._tickCounter = 0;\r\n    }\r\n}\r\nexports.Animation = Animation;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/representations/animation.ts?");

/***/ }),

/***/ "./src/js/graphics/representations/oneShotAnimation.ts":
/*!*************************************************************!*\
  !*** ./src/js/graphics/representations/oneShotAnimation.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst animation_1 = __webpack_require__(/*! ./animation */ \"./src/js/graphics/representations/animation.ts\");\r\nclass OneShotAnimation extends animation_1.Animation {\r\n    constructor(resource, framesNumber, scaleFactor, speedFactor) {\r\n        super(resource, framesNumber, scaleFactor, speedFactor);\r\n    }\r\n    draw(context, x, y, inversion) {\r\n        if (this._tickCounter < this._framesNumber - 1)\r\n            this._tickCounter = this._tickCounter + this._speedFactor;\r\n        context.save();\r\n        context.translate(x + 0.5 * this.width, y + 0.5 * this.height);\r\n        if (inversion)\r\n            context.scale(-1, 1);\r\n        context.drawImage(this._spritesheet.content, Math.trunc(this._tickCounter) * this._width, 0, this._width, this._height, -this.width / 2, -this.height / 2, this.width, this.height);\r\n        context.restore();\r\n    }\r\n}\r\nexports.OneShotAnimation = OneShotAnimation;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/representations/oneShotAnimation.ts?");

/***/ }),

/***/ "./src/js/graphics/representations/staticSprite.ts":
/*!*********************************************************!*\
  !*** ./src/js/graphics/representations/staticSprite.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass StaticSprite {\r\n    constructor(resource, scaleFactor) {\r\n        this._spritesheet = resource;\r\n        this._height = resource.content.height;\r\n        this._width = resource.content.width;\r\n        this._scaleFactor = scaleFactor || 0.8;\r\n    }\r\n    draw(context, x, y, _) {\r\n        context.save();\r\n        context.drawImage(this._spritesheet.content, 0, 0, this._width, this._height, x, y, this.width, this.height);\r\n        context.restore();\r\n    }\r\n    get width() {\r\n        return this._width * this._scaleFactor;\r\n    }\r\n    get height() {\r\n        return this._height * this._scaleFactor;\r\n    }\r\n}\r\nexports.StaticSprite = StaticSprite;\r\n\n\n//# sourceURL=webpack:///./src/js/graphics/representations/staticSprite.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst winScene_1 = __webpack_require__(/*! ./game/gui/winScene */ \"./src/js/game/gui/winScene.ts\");\r\nconst gameOverScene_1 = __webpack_require__(/*! ./game/gui/gameOverScene */ \"./src/js/game/gui/gameOverScene.ts\");\r\nconst playScene_1 = __webpack_require__(/*! ./game/gui/playScene */ \"./src/js/game/gui/playScene.ts\");\r\nconst sceneManager_1 = __webpack_require__(/*! ./game/scene/sceneManager */ \"./src/js/game/scene/sceneManager.ts\");\r\nconst resourceLoader_1 = __webpack_require__(/*! ./graphics/resourceLoader */ \"./src/js/graphics/resourceLoader.ts\");\r\nconst canvas_1 = __webpack_require__(/*! ./graphics/canvas */ \"./src/js/graphics/canvas.ts\");\r\nconst startScene_1 = __webpack_require__(/*! ./game/gui/startScene */ \"./src/js/game/gui/startScene.ts\");\r\n//Resource Targeting\r\nconst resourceManager = new resourceLoader_1.ResourceManager([\r\n    'player/idle', 'player/run', 'player/jump', 'player/dead', 'shot',\r\n    'background', 'menu_background',\r\n    'red_barrel', 'goal',\r\n    'gui/play_button_1', 'gui/play_button_2', 'gui/start_button',\r\n    'gui/menu_button_1', 'gui/menu_button_2',\r\n    'gui/replay_button_1', 'gui/replay_button_2',\r\n    'gui/time_background', 'block',\r\n    'obstacles/bombs/one', 'obstacles/bombs/two', 'obstacles/missile_one'\r\n]);\r\n//Resource Prefetching\r\nresourceManager.resourcesPrefetch().then(() => {\r\n    console.log('Resource loaded');\r\n    const canvas = new canvas_1.Canvas('scene');\r\n    let sceneManager = new sceneManager_1.SceneManager();\r\n    sceneManager.addScene({\r\n        name: 'start', scene: new startScene_1.StartScene(document, canvas, resourceManager, sceneManager)\r\n    }).addScene({\r\n        name: 'play', scene: new playScene_1.PlayScene(document, canvas, resourceManager, sceneManager)\r\n    }).addScene({\r\n        name: 'gameover', scene: new gameOverScene_1.GameOverScene(document, canvas, resourceManager, sceneManager)\r\n    }).addScene({\r\n        name: 'win', scene: new winScene_1.WinScene(document, canvas, resourceManager, sceneManager)\r\n    });\r\n    sceneManager.setScene('start');\r\n    sceneManager.start();\r\n}).catch((e) => alert(`Error during resources prefetching: ${e.stack}`));\r\n\n\n//# sourceURL=webpack:///./src/js/main.ts?");

/***/ }),

/***/ "./src/js/physics/fallingObject.ts":
/*!*****************************************!*\
  !*** ./src/js/physics/fallingObject.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst gameObject_1 = __webpack_require__(/*! ./gameObject */ \"./src/js/physics/gameObject.ts\");\r\nclass FallingObject extends gameObject_1.GameObject {\r\n    constructor(initosition, initVelocity, resourceManager, firstUpdate) {\r\n        super(initosition, initVelocity, resourceManager, firstUpdate);\r\n        this._isFloating = true;\r\n    }\r\n    update(time) {\r\n        this.updateVelocity(time);\r\n        super.update(time);\r\n    }\r\n    updateVelocity(time) {\r\n        if (this._isFloating) {\r\n            let dt = time - this._firstUpdate;\r\n            let vy = this._velocity.y + dt * FallingObject.GRAVITY_ACELERATION;\r\n            this.setVelocity(time, this._velocity.x, vy);\r\n        }\r\n    }\r\n}\r\nexports.FallingObject = FallingObject;\r\nFallingObject.GRAVITY_ACELERATION = 0.016; //9.8;\r\n\n\n//# sourceURL=webpack:///./src/js/physics/fallingObject.ts?");

/***/ }),

/***/ "./src/js/physics/gameObject.ts":
/*!**************************************!*\
  !*** ./src/js/physics/gameObject.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst vec2_1 = __webpack_require__(/*! ./vec2 */ \"./src/js/physics/vec2.ts\");\r\n;\r\nvar Direction;\r\n(function (Direction) {\r\n    Direction[Direction[\"LEFT\"] = 0] = \"LEFT\";\r\n    Direction[Direction[\"RIGHT\"] = 1] = \"RIGHT\";\r\n    Direction[Direction[\"TOP\"] = 2] = \"TOP\";\r\n    Direction[Direction[\"BOTTOM\"] = 3] = \"BOTTOM\";\r\n})(Direction = exports.Direction || (exports.Direction = {}));\r\n;\r\nclass GameObject {\r\n    constructor(initPosition, initVelocity, resourceManager, firstUpdate, playerCollisionCallback) {\r\n        this._originalPosition = new vec2_1.Vec2(initPosition.x, initPosition.y);\r\n        this._initPosition = initPosition;\r\n        this._originalVelocity = new vec2_1.Vec2(initVelocity.x, initVelocity.y);\r\n        this._velocity = initVelocity;\r\n        this._image = null;\r\n        this._resourceManager = resourceManager;\r\n        this._firstUpdate = firstUpdate;\r\n        this._playerCollisionCallback = playerCollisionCallback || (() => { });\r\n        this._inputHandlers = [];\r\n    }\r\n    //Velocity Management\r\n    getVelocity() {\r\n        return this._velocity;\r\n    }\r\n    setVelocity(time, nx, ny) {\r\n        if (this._velocity.x !== nx || this._velocity.y !== ny) {\r\n            this._initPosition.x = this.getPosition(time).x;\r\n            this._initPosition.y = this.getPosition(time).y;\r\n            this._firstUpdate = time;\r\n            this._velocity.x = nx;\r\n            this._velocity.y = ny;\r\n        }\r\n    }\r\n    setPosition(time, nx, ny) {\r\n        this._firstUpdate = time;\r\n        this._initPosition.x = nx;\r\n        this._initPosition.y = ny;\r\n    }\r\n    //Game Logic Management\r\n    update(time) {\r\n        if (this._firstUpdate === null)\r\n            this._firstUpdate = time;\r\n    }\r\n    drawObject(time, context) {\r\n        let position = this.getPosition(time);\r\n        context.save();\r\n        context.fillStyle = \"#32a852\";\r\n        context.fillRect(position.x, position.y, this.width, this.height);\r\n        if (this._image)\r\n            this._image.draw(context, position.x - Math.abs((this._image.width - this.width) * 0.5), position.y - Math.abs((this._image.height - this.height) * 0.5), this._velocity.x < 0);\r\n        context.restore();\r\n    }\r\n    getPosition(time) {\r\n        let dt = time - this._firstUpdate;\r\n        let px = this._initPosition.x + dt * this._velocity.x;\r\n        let py = this._initPosition.y + dt * this._velocity.y;\r\n        return new vec2_1.Vec2(px, py);\r\n    }\r\n    isIn(time, x, y) {\r\n        let position = this.getPosition(time);\r\n        return position.x < x &&\r\n            x < position.x + this._image.width &&\r\n            position.y < y &&\r\n            y < position.y + this._image.height;\r\n    }\r\n    inputAttach(documentReference) {\r\n        return [];\r\n    }\r\n    reset() {\r\n        this._firstUpdate = null;\r\n        this._initPosition.x = this._originalPosition.x;\r\n        this._initPosition.y = this._originalPosition.y;\r\n        this._velocity.x = this._originalVelocity.x;\r\n        this._velocity.y = this._originalVelocity.y;\r\n    }\r\n    //Representation Management\r\n    changeRepresentation(newRepresentation) {\r\n        this._image = newRepresentation;\r\n    }\r\n    get width() {\r\n        return this._image.width || 0;\r\n    }\r\n    get height() {\r\n        return this._image.height || 0;\r\n    }\r\n    //Collision Detection\r\n    isColliding(time, object) {\r\n        let thisPosition = this.getPosition(time);\r\n        let objectPosition = object.getPosition(time);\r\n        if (thisPosition.x < objectPosition.x + object.width &&\r\n            thisPosition.x + this.width > objectPosition.x &&\r\n            thisPosition.y < objectPosition.y + object.height &&\r\n            thisPosition.y + this.height > objectPosition.y) {\r\n            let h = (this.height + object.height) * 0.5;\r\n            let w = (this.width + object.width) * 0.5;\r\n            let tcx = thisPosition.x + this.width * 0.5;\r\n            let tcy = thisPosition.y + this.height * 0.5;\r\n            let ocx = objectPosition.x + object.width * 0.5;\r\n            let ocy = objectPosition.y + object.height * 0.5;\r\n            let dx = tcx - ocx;\r\n            let dy = tcy - ocy;\r\n            //console.debug(`h: ${h}\\nw: ${w}\\ntcx: ${tcx}\\ntcy: ${tcy}\\nocx: ${ocx}\\nocy: ${ocy}\\ndx: ${dx}\\ndy: ${dy}\\nexp: ${Math.abs(dx / w) > Math.abs(dy / h)}`);\r\n            if (Math.abs(dx / w) > Math.abs(dy / h)) {\r\n                return dx < 0 ? Direction.RIGHT : Direction.LEFT;\r\n            }\r\n            else {\r\n                return dy > 0 ? Direction.TOP : Direction.BOTTOM;\r\n            }\r\n        }\r\n        return null;\r\n    }\r\n}\r\nexports.GameObject = GameObject;\r\n\n\n//# sourceURL=webpack:///./src/js/physics/gameObject.ts?");

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