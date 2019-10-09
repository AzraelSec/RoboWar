import { drawable } from './drawable';
import { Resource } from './resourceLoader';

export class Animation implements drawable{
    private _spritesheet:Resource;
    private _width:number;
    private _height:number;
    private _context:CanvasRenderingContext2D;
    private _framesNumber:number;
    private _tickCounter:number;
    private _scaleFactor:number;
    private _speedFactor:number;

    constructor(context:CanvasRenderingContext2D, resource:Resource, width:number, framesNumber:number, scaleFactor?:number, speedFactor?:number) {
        this._spritesheet = resource;
        this._height = resource.content.height;
        this._width = width;
        this._context = context;
        this._framesNumber = framesNumber;
        this._tickCounter = 0; 
        this._scaleFactor = scaleFactor || 0.4;
        this._speedFactor = speedFactor ? this.normSpeedFactor(speedFactor) : this._scaleFactor;
    }

    public draw(x:number, y:number): void {
        this._tickCounter = (this._tickCounter + this._speedFactor) % this._framesNumber;
        this._context.save();
        this._context.drawImage(
            this._spritesheet.content,
            Math.trunc(this._tickCounter) * this._width,
            0,
            this._width,
            this._height,
            x,
            y - this.height,
            this.width,
            this.height);
        this._context.restore();
    }

    public get width(): number {
        return this._width * this._scaleFactor;
    }

    public get height(): number {
        return this._height * this._scaleFactor;
    }

    public set speed(newVelocity) {
        this._speedFactor = this.normSpeedFactor(newVelocity);
    }

    private normSpeedFactor(factor:number): number {
        return Math.abs(factor % 1);
    }

    public reset(): void {
        this._tickCounter = 0;
    }
}