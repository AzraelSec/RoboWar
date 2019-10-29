import { IDrawable } from './drawable';
import { Resource } from '../resourceLoader';

export class Animation implements IDrawable{
    protected _spritesheet: Resource;
    protected _width: number;
    protected _height: number;
    protected _framesNumber: number;
    protected _tickCounter: number;
    protected _scaleFactor: number;
    protected _speedFactor: number;

    constructor(resource: Resource, framesNumber: number, scaleFactor?: number, speedFactor?: number) {
        this._spritesheet = resource;
        this._height = resource.content.height;
        this._width = resource.content.width / framesNumber;
        this._framesNumber = framesNumber;
        this._tickCounter = 0; 
        this._scaleFactor = scaleFactor || 0.4;
        this._speedFactor = speedFactor ? this.normSpeedFactor(speedFactor) : this._scaleFactor;
    }

    public draw(context: CanvasRenderingContext2D, x: number, y: number, inversion: boolean): void {
        this._tickCounter = (this._tickCounter + this._speedFactor) % this._framesNumber;
        context.save();
        context.translate(
            x + 0.5 * this.width,
            y + 0.5 * this.height
        );
        if(inversion) context.scale(-1, 1);
        context.drawImage(
            this._spritesheet.content,
            Math.trunc(this._tickCounter) * this._width,
            0,
            this._width,
            this._height,
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height);
        context.restore();
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