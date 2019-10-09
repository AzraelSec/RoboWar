import { Animation } from './../graphics/animation';
import { GameObject } from './../physics/object';
import { Vec2 } from '../physics/vec2';


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

export class Player extends GameObject {
    private _playerStatesResources: PlayerStatesResources;
    private _actualResource: Animation;
    private _playerState: PlayerStates;

    constructor(initPosition: Vec2, statesResources: PlayerStatesResources, firstUpdate: number) {
        super(initPosition, Vec2.Zero(), statesResources.idling, firstUpdate);

        this._playerState = PlayerStates.IDLING;
        this._actualResource = statesResources.idling;
        this._playerStatesResources = statesResources;
    }

    public changeState(newState: PlayerStates) {
        this._playerState = newState;
        this._actualResource.reset();
        this._actualResource = this._playerStatesResources.getRelatedAnimation(newState);
        this.changeRepresentation(this._actualResource);
    }
}