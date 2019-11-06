import { ResourceManager } from './../graphics/resourceLoader';
import { Goal } from './goal';
import { Block } from './obstacles/block';
import { CollisionScaffold, GameObject } from './../physics/gameObject';
import { Obstacle } from './obstacles/obstacle';
import { InputHandler, InputHandlerTrack } from './inputHandler';
import { FallingObject } from './../physics/fallingObject';
import { Animation } from '../graphics/representations/animation';
import { Vec2, Axis } from '../physics/vec2';
import { Direction } from '../physics/gameObject';
import { OneShotAnimation } from '../graphics/representations/oneShotAnimation';


enum MovementKeys {
    LEFT = 37,
    RIGHT = 39,
    JUMP = 32,
    SHOT = 17
};

interface MovementRequestState {
    left: boolean,
    right: boolean,
    jump: boolean,
    shot: boolean
}

type WorldBounds = {
    width: number;
    height: number;
}

export enum PlayerStates {
    RUNNING,
    IDLING,
    JUMPING
};

export class PlayerStatesResources {
    private _runningState: Animation;
    private _idlingState: Animation;
    private _jumpingState: Animation;

    constructor(runningState: Animation, idlingState: Animation, jumpingState: Animation) {
        this._runningState = runningState;
        this._idlingState = idlingState,
        this._jumpingState = jumpingState;
    }

    public getRelatedAnimation(state: PlayerStates): Animation {
        switch(state) {
            case PlayerStates.IDLING: return this._idlingState;
            case PlayerStates.JUMPING: return this._jumpingState;
            case PlayerStates.RUNNING: return this._runningState;
            default: return this._idlingState;
        }
    }

    get running(): Animation {
        return this._runningState;
    }

    get jumping(): Animation {
        return this._jumpingState;
    }

    get idling(): Animation {
        return this._idlingState;
    }
};

export class Player extends FallingObject {
    public static RUNNING_HORIZONTAL_VELOCITY: number = 0.5;
    public static RUNNING_VERTICAL_VELOCITY: number = 3.5;
    public static SCALE: number = 0.3;

    private _playerStatesResources: PlayerStatesResources;
    private _actualResource: Animation;
    private _playerState: PlayerStates;
    private _playerActualMovement: MovementRequestState;
    private _playerMovementRequest: MovementRequestState;

    private _dyingAction: () => void;
    private _winningAction: () => void;
    private _worldBounds: WorldBounds;

    constructor(initPosition: Vec2, resourceManager: ResourceManager, firstUpdate: number, maxWidth: number, maxHeight: number, dyingAction: () => void, winningAction: () => void) {
        super(initPosition, Vec2.Zero(), resourceManager, firstUpdate);
        this._playerState = PlayerStates.IDLING;
        this._playerStatesResources = new PlayerStatesResources(
            new Animation(resourceManager.getResource('run'), 9, Player.SCALE),
            new Animation(resourceManager.getResource('idle'), 9, Player.SCALE),
            new OneShotAnimation(resourceManager.getResource('jump'), 9, Player.SCALE)
        );
        this._actualResource = this._playerStatesResources.idling;
        this._playerActualMovement = <MovementRequestState> {
            left: false, right: false,
            jump: false, shot: false
        };
        this._playerMovementRequest = <MovementRequestState> {
            left: false, right: false,
            jump: false, shot: false
        };
        this._worldBounds = {
            width: maxWidth,
            height: maxHeight
        }
        this._dyingAction = dyingAction;
        this._winningAction = winningAction;
    }

    public update(time: number, colliding?: CollisionScaffold[]): void {
        const oldPosition = this.getPosition(time);
        const oldVelocity = this.getVelocity();

        let onABrick = undefined !== colliding.find( obj => obj.side === Direction.BOTTOM && oldVelocity.y > 0)
        if (this._isFloating && onABrick) 
            this.bottomBoundsHitHandling();
        else if(oldPosition.y < this._worldBounds.height - this.height) this._isFloating = true;
        
        super.update(time);
        
        if(colliding.some(object => object.collider.deadly))
            this._dyingAction();
        else if(colliding.some(object => object.collider instanceof Goal))
            this._winningAction();
        else {
            this.collidingsHandling(time, colliding, oldPosition, oldVelocity);
            this.boundsAdjustPosition(time);
            this.manageInputRequests(time);
        }
    }

    private changeState(newState: PlayerStates): void {
        if(newState != this._playerState) {
            this._playerState = newState;
            this._actualResource.reset();
            this._actualResource = this._playerStatesResources.getRelatedAnimation(newState);
            this.changeRepresentation(this._actualResource);
        }
    }

    private shotHandling(): void {
    }

    public reset() {
        super.reset();
        this._playerState = PlayerStates.IDLING;
        this._actualResource = this._playerStatesResources.idling;
        this.changeRepresentation(this._actualResource)
        this._playerActualMovement = <MovementRequestState> {
            left: false, right: false,
            jump: false, shot: false
        };
        this._playerMovementRequest = <MovementRequestState> {
            left: false, right: false,
            jump: false, shot: false
        };
    }

    // BOUNDS COLLISION HANDLING
    private boundsAdjustPosition(time: number): void {
        let lastPosition = this.getPosition(time);
        let leftBounce = (x: number) => {
            this.setPosition(time, x, lastPosition.y);
            this.setVelocity(time, 0, 0);
        };
        
        let rightBounce = (max: number) => {
            this.setPosition(time, max - this.width, lastPosition.y);
            this.setVelocity(time, 0, 0);
        };

        let topBounce = (y: number) => {
            this.setPosition(time, lastPosition.x, y);
            this.setVelocity(time, this._velocity.x, 0);
        };

        let bottomBounce = (max: number) => {
            this.setPosition(time, lastPosition.x, max - this.height);
            this.setVelocity(time, this._velocity.x, 0);
            this.bottomBoundsHitHandling();
        }
        if(lastPosition.x < 0) leftBounce(0);
        else if(lastPosition.y < 0) topBounce(0);
        else if(lastPosition.x + this.width > this._worldBounds.width) rightBounce(this._worldBounds.width);
        else if(lastPosition.y + this.height > this._worldBounds.height) bottomBounce(this._worldBounds.height);
    }

    private bottomBoundsHitHandling(): void {
        this._isFloating = false;
        this._playerActualMovement.jump = false;
        if(this.getVelocity().x !== 0) this.changeState(PlayerStates.RUNNING);
        else this.changeState(PlayerStates.IDLING)
    }

    private collidingsHandling(time: number, colliding: CollisionScaffold[], oldPosition: Vec2, oldVelocity: Vec2): void {
        const wishedPosition = this.getPosition(time);
        for(let col of colliding) {
            if(col.side === Direction.RIGHT && oldVelocity.x > 0) {
                this.setPosition(time, col.collider.getPosition(time).x - this.width, oldPosition.y);
                this.setVelocity(time, 0, this._velocity.y);
            } else if(col.side === Direction.LEFT && oldVelocity.x < 0) {
                this.setPosition(time, col.collider.getPosition(time).x + col.collider.width, oldPosition.y);
                this.setVelocity(time, 0, this._velocity.y);
            } else if(col.side === Direction.TOP && oldVelocity.y < 0) {
                this.setPosition(time, wishedPosition.x, col.collider.getPosition(time).y + col.collider.height);
                this.setVelocity(time, this._velocity.x, 0);
            } else if(col.side === Direction.BOTTOM && oldVelocity.y > 0) {
                this.setPosition(time, wishedPosition.x, col.collider.getPosition(time).y - this.height);
                this.setVelocity(time, this._velocity.x, 0);
            }
        }
    }

    public get width() {
        return this._image.width * 0.5;
    }

    public get height() {
        return this._image.height * 0.9;
    }

    // INPUT MANAGEMENT
    private manageInputRequests(time: number): void {
        if(this._playerMovementRequest.left && !this._playerMovementRequest.right) {
            if(!this._playerActualMovement.left) {
                if(!this._isFloating) this.changeState(PlayerStates.RUNNING);
                this.setVelocity(time, -Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);
                this._playerActualMovement.left = true;
            }
            this._playerMovementRequest.left = false;
        }
        if(this._playerMovementRequest.right) {
            if(!this._playerActualMovement.right) {
                if(!this._isFloating) this.changeState(PlayerStates.RUNNING);
                this.setVelocity(time, Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);
                this._playerActualMovement.right = true;
            }
            this._playerMovementRequest.right = false;
        }
        if(this._playerMovementRequest.jump) {
            if(!this._playerActualMovement.jump) {
                this.changeState(PlayerStates.JUMPING);
                this.setVelocity(time, this._velocity.x, -Player.RUNNING_VERTICAL_VELOCITY);
                this._playerActualMovement.jump = true;
                this._isFloating = true;
            }
            this._playerMovementRequest.jump = false;
        }
        if(this._playerMovementRequest.shot) {
            if(!this._playerActualMovement.shot) {
                this._playerActualMovement.shot = true;
                this.shotHandling();
            }
            this._playerMovementRequest.shot = false;
        }

        if(!this._playerActualMovement.jump && !this._playerActualMovement.shot &&
            !this._playerActualMovement.left && !this._playerActualMovement.right) {
                this.setVelocity(time, 0, this._velocity.y);
            this.changeState(this._isFloating && this._playerActualMovement.jump ? PlayerStates.JUMPING : PlayerStates.IDLING);
        }
    }

    public inputAttach(documentReference: Document): InputHandlerTrack[] {
        const references: InputHandlerTrack[] = [
            { type: 'keydown', callback: this.keyDownHandling.bind(this) },
            { type: 'keyup', callback: this.keyUpHandling.bind(this) }
        ];
        
        for(let i = 0; i < references.length; i++)
            documentReference.addEventListener(references[i].type, references[i].callback);
        
        return references;
    }

    private keyDownHandling(event: KeyboardEvent): void {
        switch(event.keyCode) {
            case MovementKeys.RIGHT: this._playerMovementRequest.right = true; break;
            case MovementKeys.LEFT: this._playerMovementRequest.left = true; break;
            case MovementKeys.JUMP: this._playerMovementRequest.jump = true; break;
            case MovementKeys.SHOT: this._playerMovementRequest.shot = true; break;
        }
    }

    private keyUpHandling(event: KeyboardEvent): void {
        switch(event.keyCode) {
            case MovementKeys.LEFT: this._playerActualMovement.left = this._playerMovementRequest.left = false; break;
            case MovementKeys.RIGHT: this._playerActualMovement.right = this._playerMovementRequest.right = false; break;
            case MovementKeys.SHOT: this._playerActualMovement.shot = false; break;
        }
    }
}