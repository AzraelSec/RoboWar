import { StaticSprite } from './../../graphics/representations/staticSprite';
import { Vec2 } from './../../physics/vec2';
import { GameObject } from './../../physics/gameObject';

export class Obstacle extends GameObject {
    protected _deadly: boolean;

    constructor(initPosition: Vec2, initVelocity: Vec2, representation: StaticSprite, firstUpdate: number, deadly: boolean) {
        super(initPosition, initVelocity, representation, firstUpdate);
        this._deadly = deadly;
    }
}