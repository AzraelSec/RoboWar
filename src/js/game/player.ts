import { Obstacle } from './obstacles/obstacle';
import { InputHandler, InputHandlerTrack } from './inputHandler';
import { FallingObject } from './../physics/fallingObject';
import { Animation } from '../graphics/representations/animation';
import { Vec2, Axis } from '../physics/vec2';
import { CollisionSide } from '../physics/gameObject';



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
    public static RUNNING_VERTICAL_VELOCITY: number = 1;

    private _playerStatesResources: PlayerStatesResources;
    private _actualResource: Animation;
    private _playerState: PlayerStates;
    private _playerActualMovement: MovementRequestState;
    private _playerMovementRequest: MovementRequestState;

    private _worldBounds: any;

    constructor(initPosition: Vec2, statesResources: PlayerStatesResources, firstUpdate: number, maxWidth: number, maxHeight: number) {
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
    }

    public update(time: number, colliding?: Obstacle[]): void {
        super.update(time);
        this.manageInputRequests(time);
        this.boundsAdjustPosition(time, colliding);
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
        //To redefine
        console.log('BANG!');
    }

    // BOUNDS COLLISION HANDLING
    private boundsAdjustPosition(time: number, colliding?: Obstacle[]): void {
        let leftBounce = (x: number) => {
            this._actualPosition.x = x;
            this.setVelocity(time, 0, 0);
        };

        let rightBounce = (max: number) => {
            this._actualPosition.x = max - this.width;
            this.setVelocity(time, 0, 0);
        };

        let topBounce = (y: number) => {
            this._actualPosition.y = y;
            this.setVelocity(time, this._velocity.x, 0);
        };

        let bottomBounce = (max: number) => {
            this._actualPosition.y = max - this.height;
            this.setVelocity(time, this._velocity.x, 0);
            this.bottomBoundsHitHandling();
        }

        if(this._actualPosition.x < 0) leftBounce(0);
        if(this._actualPosition.y < 0) topBounce(0);
        if(this._actualPosition.x + this.width > this._worldBounds.width) rightBounce(this._worldBounds.width);
        if(this._actualPosition.y + this.height > this._worldBounds.height) bottomBounce(this._worldBounds.height);
    
        if(colliding && colliding.length > 0) {
            for(let i = 0; i < colliding.length; i++) {
                let collidingSide: CollisionSide = this.collisionSideDetection(colliding[i]);
                if(collidingSide === CollisionSide.TOP) {
                    console.log(`collision top`)
                    topBounce(colliding[i]._actualPosition.y - colliding[i].height);
                } else if(collidingSide === CollisionSide.BOTTOM) {
                    //NO
                    console.log(`collision bottom`)
                    bottomBounce(colliding[i]._actualPosition.y);
                } else if(collidingSide === CollisionSide.RIGHT) {
                    console.log(`collision right`)
                    rightBounce(colliding[i]._actualPosition.x); 
                } else if(collidingSide === CollisionSide.LEFT) {
                    //NO
                    console.log(`collision left`)
                    leftBounce(colliding[i]._actualPosition.x + colliding[i].width);
                }
            }
        }
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
                console.log('Left Movement Handled');
                if(!this._isFloating) this.changeState(PlayerStates.RUNNING);
                this.setVelocity(time, -Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);
                this._playerActualMovement.left = true;
            }
            this._playerMovementRequest.left = false;
        }
        if(this._playerMovementRequest.right) {
            if(!this._playerActualMovement.right) {
                console.log('Right Movement Handled')
                if(!this._isFloating) this.changeState(PlayerStates.RUNNING);
                this.setVelocity(time, Player.RUNNING_HORIZONTAL_VELOCITY, this._velocity.y);
                this._playerActualMovement.right = true;
            }
            this._playerMovementRequest.right = false;
        }
        if(this._playerMovementRequest.jump) {
            console.log('Jump Movement Handled')
            if(!this._playerActualMovement.jump) {
                this.changeState(PlayerStates.JUMPING);
                this.setVelocity(time, this._velocity.x, -Player.RUNNING_VERTICAL_VELOCITY);
                this._playerActualMovement.jump = true;
                this._isFloating = true;
            }
            this._playerMovementRequest.jump = false;
        }
        if(this._playerMovementRequest.shot) {
            console.log('Shot Movement Handled')
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