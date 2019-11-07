import { Resource } from '../resourceLoader';
import { Animation } from './animation';

export class OneShotAnimation extends Animation {
    constructor(resource: Resource, framesNumber: number, scaleFactor?: number) {
        super(resource, framesNumber, scaleFactor);
    }

    public draw(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, inversion: boolean): void {
        if(this._tickCounter < this._framesNumber - 1)
            this._tickCounter = Math.min(this._tickCounter + 0.4, this._framesNumber - 1);
        context.save();
        context.translate(
            x + 0.5 * w,
            y + 0.5 * h
        );
        if(inversion) context.scale(-1, 1);
        context.scale(this._scaleFactor, this._scaleFactor)
        context.drawImage(
            this._spritesheet.content,
            Math.trunc(this._tickCounter) * this._width,
            0,
            this._width,
            this._height,
            - w / 2,
            - h / 2,
            w,
            h);
        context.restore();
    }
}