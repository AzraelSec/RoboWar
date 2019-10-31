import { ResourceManager } from './../../graphics/resourceLoader';
import { Animation } from './../../graphics/representations/animation';
import { Vec2 } from '../../physics/vec2';
import { GameObject } from '../../physics/gameObject';

export class Obstacle extends GameObject {
    protected _deadly: boolean;

    constructor(initPosition: Vec2, initVelocity: Vec2, resourceManager: ResourceManager, deadly: boolean) {
        super(initPosition, initVelocity, resourceManager, 0);
        this._deadly = deadly;
    }

    public get deadly() {
        return this._deadly;
    }
}

export class Bomb extends Obstacle {
    public static BOMB_VELOCITY: number = 0.2;
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, new Vec2(0, Bomb.BOMB_VELOCITY), resourceManager, true);
        this._image = new Animation(resourceManager.getResource('one'), 10);
    }

    public update(time: number): void {
        const position = this.getPosition(time);
        const goingUp: boolean = this.getVelocity().y < 0;
        if(Math.abs(position.y - this._initPosition.y) > 100)
            this.setVelocity(time, this.getVelocity().x, goingUp ? Bomb.BOMB_VELOCITY : -Bomb.BOMB_VELOCITY);
    }

    public get width() {
        return this._image.width * 0.6;
    }
}

export class Missile extends Obstacle {
    public static MISSILE_VELOCITY: number = 1;
    constructor(worldWidth: number, initHeight: number, resourceManager: ResourceManager) {
        super(new Vec2(worldWidth + 100, initHeight ), new Vec2(-Missile.MISSILE_VELOCITY, 0), resourceManager, true);
        this._image = new Animation(resourceManager.getResource('missile_one'), 9);
    }

    public update(time: number): void {
        const position = this.getPosition(time);
        if(position.x < -this.width) this.setPosition(time, this._originalPosition.x, this._originalPosition.y);
    }

    public get width() {
        return this._image.width * 0.7;
    }

    public get height() {
        return this._image.height * 0.5;
    }
}