import { IDrawable } from '../graphics/representations/drawable';
import { GameObject } from './gameObject';
import { Vec2 } from './vec2';

export class FallingObject extends GameObject {
    public static GRAVITY_ACELERATION: number = 0.02//9.8;
    protected _isFloating: boolean;

    constructor(initosition: Vec2, initVelocity: Vec2, representation: IDrawable, firstUpdate: number) {
        super(initosition, initVelocity, representation, firstUpdate);
        this._isFloating = true;
    }

    public update(time: number): void {
        this.updateVelocity(time);
        super.update(time);
    }

    private updateVelocity(time: number): void {
        if(this._isFloating) {
            let dt = time - this._firstUpdate;
            let vy = this._velocity.y + dt * FallingObject.GRAVITY_ACELERATION;
            this.setVelocity(time, this._velocity.x, vy);
        }
    }
}