import { FallingObject } from './../physics/fallingObject';
import { Animation } from '../graphics/representations/animation';
import { Vec2, Axis } from '../physics/vec2';

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

    public update(time: number): void {
        this.manageInputRequests(time);
        super.update(time);
        this.boundsAdjustPosition(time);
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

    private boundsAdjustPosition(time: number): void {
        if(this._actualPosition.x < 0) {
            this._actualPosition.x = 0;
            this.setVelocity(time, 0, 0);
        }
        if(this._actualPosition.y < 0) {
            this._actualPosition.y = 0;
            this.setVelocity(time, this._velocity.x, 0);
        }
        if(this._actualPosition.x + this.width > this._worldBounds.width) {
            this._actualPosition.x = this._worldBounds.width - this.width;
            this.setVelocity(time, 0, 0);
        }
        if(this._actualPosition.y + this.height > this._worldBounds.height) {
            this._actualPosition.y = this._worldBounds.height - this.height;
            this.setVelocity(time, this._velocity.x, 0);
            this.bottomBoundsHitHandling();
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
            this.changeState(PlayerStates.IDLING);
            this.setVelocity(time, 0, 0);
        }
    }

    public inputAttach(documentReference: Document): void {
        documentReference.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case MovementKeys.RIGHT: this._playerMovementRequest.right = true; break;
                case MovementKeys.LEFT: this._playerMovementRequest.left = true; break;
                case MovementKeys.JUMP: this._playerMovementRequest.jump = true; break;
                case MovementKeys.SHOT: this._playerMovementRequest.shot = true; break;
            }
        });
        documentReference.addEventListener('keyup', (event) => {
            if(event.keyCode === MovementKeys.LEFT)
                this._playerActualMovement.left = this._playerMovementRequest.left = false;
            else if(event.keyCode === MovementKeys.RIGHT)
                this._playerActualMovement.right = this._playerMovementRequest.right = false;
            else if(event.keyCode === MovementKeys.SHOT)
                this._playerActualMovement.shot = false;
        });
    }
}