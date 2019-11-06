import { ResourceManager } from './../graphics/resourceLoader';
import { Obstacle } from './obstacles/obstacle';
import { Vec2 } from '../physics/vec2';
import { StaticSprite } from '../graphics/representations/staticSprite';

export class Goal extends Obstacle {
    public static SCALE: number = 0.3
    private static VELOCITY: number = 0.4;
    protected _isMoving: boolean;
    protected _idlingTime: number;
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, new Vec2(0, 0), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('goal'), Goal.SCALE);
        this._isMoving = true;
        this._idlingTime = 0;
    }

    public update(time: number): void {
        //this.updateVelocity(time);
        super.update(time);
    }

    protected updateVelocity(time: number): void {
        let position: Vec2 = this.getPosition(time);
        let velocity: Vec2 = this.getVelocity();
        if(this._isMoving) {
            if(Math.abs(position.y - this._originalPosition.y) > 100)
            {
                this._isMoving = false;
                this.setVelocity(time, 0, 0);
            }
        } else {
            if((time - this._firstUpdate) / 1000 > 3) {
                this._isMoving = true;
                this.setVelocity(time, 0, position.y > this._originalPosition.y ? -Goal.VELOCITY : Goal.VELOCITY);
            }
        }
    }

    public get width() {
        return this._image.width * 0.5;
    }

    public get height() {
        return this._image.height * 0.5;
    }
}