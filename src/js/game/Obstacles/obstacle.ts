import { IDrawable } from './../../graphics/representations/drawable';
import { Animation } from './../../graphics/representations/animation';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { Vec2 } from '../../physics/vec2';
import { GameObject } from '../../physics/gameObject';

export class Obstacle extends GameObject {
    protected _deadly: boolean;

    constructor(initPosition: Vec2, initVelocity: Vec2, representation: IDrawable, firstUpdate: number, deadly: boolean) {
        super(initPosition, initVelocity, representation, firstUpdate);
        this._deadly = deadly;
    }

    public get deadly() {
        return this._deadly;
    }
}

export class Bomb extends Obstacle {
    public static BOMB_VELOCITY: number = 0.2;
    constructor(initPosition: Vec2, representation: Animation, firstUpdate: number) {
        super(initPosition, new Vec2(0, Bomb.BOMB_VELOCITY), representation, firstUpdate, true);
    }

    public update(time: number): void {
        const position = this.getPosition(time);
        const goingUp: boolean = this.getVelocity().y < 0;
        if(Math.abs(position.y - this._initPosition.y) > 100)
            this.setVelocity(time, this.getVelocity().x, goingUp ? Bomb.BOMB_VELOCITY : -Bomb.BOMB_VELOCITY);
    }
}