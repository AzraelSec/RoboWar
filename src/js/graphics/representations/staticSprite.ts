import { Resource } from '../resourceLoader';
import { IDrawable } from './drawable';

export class StaticSprite implements IDrawable {
    private _spritesheet: Resource;
    private _width: number;
    private _height: number;
    private _scaleFactor: number;

    constructor(
        resource: Resource,
        scaleFactor?: number,
    ) {
        this._spritesheet = resource;
        this._height = resource.content.height;
        this._width = resource.content.width;
        this._scaleFactor = scaleFactor || 0.8;
    }

    public draw(context: CanvasRenderingContext2D, x: number, y: number, _: boolean): void {
        context.save();
        context.drawImage(
            this._spritesheet.content,
            0,
            0,
            this._width,
            this._height,
            x,
            y,
            this.width,
            this.height
        );
        context.restore();
    }

    public get width(): number {
        return this._width * this._scaleFactor;
    }

    public get height(): number {
        return this._height * this._scaleFactor;
    }
}