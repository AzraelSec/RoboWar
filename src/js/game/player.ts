import { CollisionScaffold } from './../physics/gameObject';
import { Obstacle } from './obstacles/obstacle';
import { InputHandler, InputHandlerTrack } from './inputHandler';
import { FallingObject } from './../physics/fallingObject';
import { Animation } from '../graphics/representations/animation';
import { Vec2, Axis } from '../physics/vec2';
import { Direction } from '../physics/gameObject';



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
    public static RUNNING_VERTICAL_VELOCITY: number = 5;

    private _playerStatesResources: PlayerStatesResources;
    private _actualResource: Animation;
    private _playerState: PlayerStates;
    private _playerActualMovement: MovementRequestState;
    private _playerMovementRequest: MovementRequestState;

    private _worldBounds: any;
    protected _shotRequests: Vec2[];

    constructor(initPosition: Vec2, statesResources: PlayerStatesResources, firstUpdate: number, maxWidth: number, maxHeight: number, shotRequests) {
        super(initPosition, Vec2.Zero(), statesResources.idling, firstUpdate);
        this._playerState = PlayerStates.IDLING;
        this._actualResource = statesResources.idling;
        this._playerStatesResources = statesResources;
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
        this._shotRequests = [];
    }

    public update(time: number, colliding?: CollisionScaffold[]): void {
        let lastPosition = this.getPosition(time);
        let oldX = lastPosition.x;
        let oldY = lastPosition.y;
        let oldVX = this._velocity.x;
        let oldVY = this._velocity.y;

        let floaing = undefined === colliding.find( obj => obj.side === Direction.BOTTOM && oldVY > 0)
        if (this._isFloating && !floaing){
            console.log('watch this: ', colliding.filter( obj => obj.side === Direction.BOTTOM && oldVY > 0))
            this._isFloating = false;
            this.bottomBoundsHitHandling();
        }
        
        super.update(time);
        let wishedPosition = this.getPosition(time);
        for(let col of colliding) {
            if(col.side === Direction.RIGHT && oldVX > 0) {
                this.setPosition(time, oldX, lastPosition.y);
                this.setVelocity(time, 0, this._velocity.y);
            } else if(col.side === Direction.LEFT && oldVX < 0) {
                this.setPosition(time, oldX, lastPosition.y);
                this.setVelocity(time, 0, this._velocity.y);
            } else if(col.side === Direction.TOP && oldVY < 0) {
                this.setPosition(time, wishedPosition.x, oldY);
                this.setVelocity(time, this._velocity.x, 0);
            } else if(col.side === Direction.BOTTOM && oldVY > 0) {
                this.setPosition(time, wishedPosition.x, col.collider.getPosition(time).y - this.height);
                this.setVelocity(time, 0, 0);
            }
        }

        this.boundsAdjustPosition(time);
        this.manageInputRequests(time);
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
        //this._shotRequests.push(new Vec2(this._actualPosition.x, this._actualPosition.y));
    }

    // BOUNDS COLLISION HANDLING
    private boundsAdjustPosition(time: number, colliding?: CollisionScaffold[]): void {
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
        lastPosition = this.getPosition(time);

        if(lastPosition.x < 0) leftBounce(0);
        else if(lastPosition.y < 0) topBounce(0);
        else if(lastPosition.x + this.width > this._worldBounds.width) rightBounce(this._worldBounds.width);
        else if(lastPosition.y + this.height > this._worldBounds.height) bottomBounce(this._worldBounds.height);
    }

    private bottomBoundsHitHandling(): void {
        this._isFloating = false;
        this._playerActualMovement.jump = false;
        if(this._velocity.x !== 0) this.changeState(PlayerStates.RUNNING);
        else this.changeState(PlayerStates.IDLING);
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
            this.changeState(this._isFloating ? PlayerStates.JUMPING : PlayerStates.IDLING);
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