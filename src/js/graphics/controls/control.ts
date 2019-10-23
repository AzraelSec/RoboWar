import { InputHandler, InputHandlerTrack } from './../../game/inputHandler';
import { SceneManager } from '../../game/scene/sceneManager';
import { IDrawable } from '../representations/drawable';
import { Vec2 } from '../../physics/vec2';

export class Control implements InputHandler {    
    protected _position: Vec2;
    protected _width: number;
    protected _height: number;
    protected _context: CanvasRenderingContext2D;
    protected _inputHandlers: EventListener[];

    constructor(context: CanvasRenderingContext2D, position: Vec2, width: number, height: number) {
        this._position = position;
        this._width = width;
        this._height = height;
        this._inputHandlers = [];
        this._context = context;
    }

    public drawControl(): void {
        throw new Error(`Method not implemented yet`);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
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
    public inputDetach(documentReference: Document): void {}

    public get context(): CanvasRenderingContext2D {
        return this._context;
    }
}

export class DrawableControl extends Control {
    protected _image: IDrawable;

    constructor(position: Vec2, representation: IDrawable) {
        super(representation.context, position, representation.width, representation.height);
        this._image = representation;
    }

    public drawControl(): void {
        this._image.draw(this._position.x, this._position.y, false);
    }

    protected changeRepresentation(newRepresentation: IDrawable): void {
        this._image = newRepresentation;
    }
}