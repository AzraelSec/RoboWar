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
        this._scaleFactor = scaleFactor || 1;
        this._width = resource.content.width;
        this._height = resource.content.height;
    }

    public draw(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, _: boolean): void {
        context.save();
        context.translate(
            x + 0.5 * w,
            y + 0.5 * h
        );
        context.scale(this._scaleFactor, this._scaleFactor);
        context.drawImage(
            this._spritesheet.content,
            0,
            0,
            this._width,
            this._height,
            - w / 2,
            - h / 2,
            w,
            h
        );
        context.restore();
    }

    public get spritesheet(): HTMLImageElement {
        return this._spritesheet.content;
    }
}