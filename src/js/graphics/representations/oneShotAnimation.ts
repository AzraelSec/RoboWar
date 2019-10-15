import { Resource } from '../resourceLoader';
import { Animation } from './animation';

export class OneShotAnimation extends Animation {
    constructor(context: CanvasRenderingContext2D, resource: Resource, framesNumber: number, scaleFactor?: number, speedFactor?: number) {
        super(context, resource, framesNumber, scaleFactor, speedFactor);
    }

    public draw(x: number, y: number, inversion: boolean): void {
        if(this._tickCounter < this._framesNumber - 1)
            this._tickCounter = this._tickCounter + this._speedFactor;
        this._context.save();
        this._context.translate(
            x + 0.5 * this.width,
            y + 0.5 * this.height
        );
        if(inversion) this._context.scale(-1, 1);
        this._context.drawImage(
            this._spritesheet.content,
            Math.trunc(this._tickCounter) * this._width,
            0,
            this._width,
            this._height,
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height);
        this._context.restore();
    }
}