import { ResourceManager } from './../../graphics/resourceLoader';
import { Animation } from './../../graphics/representations/animation';
import { Vec2 } from '../../physics/vec2';
import { GameObject } from '../../physics/gameObject';

export class Obstacle extends GameObject {
    public static SCALE: number = 0.4;
    protected _deadly: boolean;

    constructor(initPosition: Vec2, width: number, height: number, initVelocity: Vec2, resourceManager: ResourceManager, deadly: boolean) {
        super(initPosition, width, height, initVelocity, resourceManager, 0);
        this._deadly = deadly;
    }

    public get deadly() {
        return this._deadly;
    }
}

export class Bomb extends Obstacle {
    public static BOMB_VELOCITY: number = 0.2;
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, 5, 5, new Vec2(-Bomb.BOMB_VELOCITY, Bomb.BOMB_VELOCITY), resourceManager, true);
        this._image = new Animation(resourceManager.getResource('bomb'), 10, Bomb.SCALE);
    }

    public update(time: number): void {
        const position = this.getPosition(time);
        const goingUp: boolean = this.getVelocity().y < 0;
        if(Math.abs(position.y - this._initPosition.y) > 100)
            this.setVelocity(time, this.getVelocity().x, goingUp ? Bomb.BOMB_VELOCITY : -Bomb.BOMB_VELOCITY);
        if(Math.abs(position.x - this._initPosition.x) > 50)
            this.setVelocity(time, goingUp ? Bomb.BOMB_VELOCITY : -Bomb.BOMB_VELOCITY, this.getVelocity().y);
        
    }
}

export class Mine extends Obstacle {
    public static BOMB_VELOCITY: number = 0.2;
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, 5, 5, new Vec2(0, Bomb.BOMB_VELOCITY), resourceManager, true);
        this._image = new Animation(resourceManager.getResource('mine'), 10, Mine.SCALE);
    }

    public update(time: number): void {
        const position = this.getPosition(time);
        const goingUp: boolean = this.getVelocity().y < 0;
        if(Math.abs(position.y - this._initPosition.y) > 200)
            this.setVelocity(time, this.getVelocity().x, goingUp ? Bomb.BOMB_VELOCITY : -Bomb.BOMB_VELOCITY);
    }

    public get width() {
        return this._width;
    }
}

export class Missile extends Obstacle {
    public static MISSILE_VELOCITY: number = 1;
    constructor(worldWidth: number, initHeight: number, resourceManager: ResourceManager) {
        super(new Vec2(worldWidth + 100, initHeight ), 5, 5,  new Vec2(-Missile.MISSILE_VELOCITY, 0), resourceManager, true);
        this._image = new Animation(resourceManager.getResource('missile'), 9, Missile.SCALE);
    }

    public update(time: number): void {
        const position = this.getPosition(time);
        if(position.x < -this.width) this.setPosition(time, this._originalPosition.x, this._originalPosition.y);
    }
}