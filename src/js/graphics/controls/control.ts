import { InputHandler, InputHandlerTrack } from './../../game/inputHandler';
import { SceneManager } from '../../game/scene/sceneManager';
import { IDrawable } from '../representations/drawable';
import { Vec2 } from '../../physics/vec2';

export class Control implements InputHandler {    
    protected _position: Vec2;
    protected _width: number;
    protected _height: number;
    protected _inputHandlers: EventListener[];

    constructor(position: Vec2, width: number, height: number) {
        this._position = position;
        this._width = width;
        this._height = height;
        this._inputHandlers = [];
    }

    public drawControl(context: CanvasRenderingContext2D): void {
        throw new Error(`Method not implemented yet`);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public resize(width: number, height: number): void {
        this._width = width;
        this._height = height;
    }

    protected isIn(x: number, y: number): boolean {
        return this._position.x < x  && 
        x < this._position.x + this._width && 
        this._position.y < y &&
        y < this._position.y + this._height;
    }

    public inputAttach(documentReference: Document): InputHandlerTrack[] {
        return [];
    }

    public set position(position: Vec2) {
        this._position.x = position.x;
        this._position.y = position.y;
    }
}

export class DrawableControl extends Control {
    protected _image: IDrawable;

    constructor(position: Vec2, representation: IDrawable) {
        super(position, representation.width, representation.height);
        this._image = representation;
    }

    public drawControl(context: CanvasRenderingContext2D): void {
        context.save();
        context.translate(this._position.x, this._position.y)
        context.scale(this._width / this._image.width, this._height / this._image.height);
        this._image.draw(context, 0/*this._position.x*/, 0/*this._position.y*/, false);
        context.restore();
    }

    protected changeRepresentation(newRepresentation: IDrawable): void {
        this._image = newRepresentation;
    }
}