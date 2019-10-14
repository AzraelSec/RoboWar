import { FallingObject } from './../physics/fallingObject';
import { Animation } from './../graphics/animation';
import { GameObject } from './../physics/object';
import { Vec2 } from '../physics/vec2';

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

    constructor(initPosition: Vec2, statesResources: PlayerStatesResources, firstUpdate: number) {
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
    }

    public update(time: number): void {
        super.update(time);
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
        //To redefine
        console.log('BANG!');
    }

    // INPUT MANAGEMENT
    private manageInputRequests(time: number): void {
        if(this._playerMovementRequest.left) {
            if(!this._playerActualMovement.right && !this._playerActualMovement.left) {
                console.log('Left Movement Handled');
                if(this._playerState != PlayerStates.JUMPING)
                    this.changeState(PlayerStates.RUNNING);
                this.setHorizontalVelocity(time, -Player.RUNNING_HORIZONTAL_VELOCITY);
                this._playerActualMovement.left = true;
            }
            this._playerMovementRequest.left = false;
        }
        if(this._playerMovementRequest.right) {
            if(!this._playerActualMovement.left && !this._playerActualMovement.right) {
                console.log('Right Movement Handled')
                if(this._playerState != PlayerStates.JUMPING)
                    this.changeState(PlayerStates.RUNNING);
                this.setHorizontalVelocity(time, Player.RUNNING_HORIZONTAL_VELOCITY);
                this._playerActualMovement.right = true;
            }
            this._playerMovementRequest.right = false;
        }
        if(this._playerMovementRequest.jump) {
            console.log('Jump Movement Handled')
            if(!this._playerActualMovement.jump) {
                this.changeState(PlayerStates.JUMPING);
                this.setVerticalVelocity(time, -Player.RUNNING_VERTICAL_VELOCITY);
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
            this.setVelocity(time, Vec2.Zero());
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