import { Resource } from '../resourceLoader';
import { IDrawable } from './drawable';

export class StaticSprite implements IDrawable {
    private _spritesheet: Resource;
    private _width: number;
    private _height: number;
    private _context: CanvasRenderingContext2D;
    private _scaleFactor: number;

    constructor(
        context: CanvasRenderingContext2D,
        resource: Resource,
        scaleFactor?: number,
    ) {
        this._spritesheet = resource;
        this._height = resource.content.height;
        this._width = resource.content.width;
        this._context = context;
        this._scaleFactor = scaleFactor || 0.8;
    }

    draw(x: number, y: number, _: boolean): void {
        this._context.save();
        this._context.drawImage(
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
        this._context.restore();
    }

    public get width(): number {
        return this._width * this._scaleFactor;
    }

    public get height(): number {
        return this._height * this._scaleFactor;
    }
}