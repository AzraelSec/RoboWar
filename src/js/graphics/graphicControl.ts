import { IDrawable } from './representations/drawable';
import { Vec2 } from '../physics/vec2';

export class GraphicControl {
    /**
     * Sostituirà probabilmente GameObject per evitare di assegnare ad un controllo logico le caratteristiche di un oggetto fisico
     */
    
    protected _position: Vec2;
    protected _image: IDrawable;

    constructor(position: Vec2, representation: IDrawable) {
        this._position = position;
        this._image = representation;
    }

    public drawControl(): void {
        this._image.draw(this._position.x, this._position.y, false);
    }

    protected changeRepresentation(newRepresentation: IDrawable): void {
        this._image = newRepresentation;
    }

    public get width(): number {
        return this._image.width;
    }

    public get height(): number {
        return this._image.height;
    }

    protected isIn(x: number, y: number): boolean {
        return this._position.x < x  && 
        x < this._position.x + this._image.width && 
        this._position.y < y &&
        y < this._position.y + this._image.height;
    }
}