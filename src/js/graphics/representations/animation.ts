import { IDrawable } from './drawable';
import { Resource } from '../resourceLoader';

export class Animation implements IDrawable {
    protected _spritesheet: Resource;
    protected _width: number;
    protected _height: number;
    protected _framesNumber: number;
    protected _tickCounter: number;
    protected _scaleFactor: number;

    constructor(resource: Resource, framesNumber: number, scaleFactor?: number) {
        this._spritesheet = resource;
        this._height = resource.content.height;
        this._width = resource.content.width / framesNumber;
        this._framesNumber = framesNumber;
        this._tickCounter = 0; 
        this._scaleFactor = scaleFactor || 1;
    }

    public draw(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, inversion: boolean): void {
        this._tickCounter = (this._tickCounter + 0.4) % this._framesNumber;
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

    public reset(): void {
        this._tickCounter = 0;
    }
}