import { InputHandler, InputHandlerTrack } from './../game/inputHandler';
import { Vec2 } from './vec2';
import { IDrawable } from '../graphics/representations/drawable';

export interface IPhysical {
    setVelocity(time:number, newX: number, newY: number): void;
    getVelocity():Vec2;
    getPosition(time:number):Vec2;
    update(time:number):void;
}

type PlayerCollisionCallback = () => void;

export class GameObject implements IPhysical, InputHandler {
    protected _firstUpdate:number;
    protected _initPosition:Vec2;
    protected _actualPosition:Vec2;
    protected _velocity: Vec2;
    protected _image: IDrawable;
    protected _playerCollisionCallback: PlayerCollisionCallback;
    protected _inputHandlers: InputHandlerTrack[];

    constructor(initPosition: Vec2, initVelocity: Vec2, representation: IDrawable, firstUpdate: number, playerCollisionCallback?: PlayerCollisionCallback) {
        this._initPosition = initPosition;
        this._actualPosition = initPosition;
        this._velocity = initVelocity;
        this._image = representation;
        this._firstUpdate = firstUpdate;
        this._playerCollisionCallback = playerCollisionCallback || (() => {});
        this._inputHandlers = [];
    }

    //Velocity Management

    public getVelocity(): Vec2 {
        return this._velocity;
    }

    public setVelocity(time: number, nx: number, ny: number): void {
        if(this._velocity.x !== nx || this._velocity.y !== ny) {
            this._initPosition = this._actualPosition;
            this._firstUpdate = time;
            this._velocity.x = nx;
            this._velocity.y = ny;
        }
    }

    //Game Logic Management

    public update(time: number): void {
        this._actualPosition = this.getPosition(time);
    }

    public drawObject(): void {
        this._image.draw(this._actualPosition.x, this._actualPosition.y, this._velocity.x < 0);
    }

    public getPosition(time: number): Vec2 {
        let dt = time - this._firstUpdate;
        let px = this._initPosition.x + dt * this._velocity.x;
        let py = this._initPosition.y + dt * this._velocity.y;
        return new Vec2(px, py);
    }

    protected isIn(x: number, y: number): boolean {
        return this._actualPosition.x < x  && 
        x < this._actualPosition.x + this._image.width && 
        this._actualPosition.y < y &&
        y < this._actualPosition.y + this._image.height;
    }
    
    //Representation Management

    protected changeRepresentation(newRepresentation: IDrawable): void {
        this._image = newRepresentation;
    }

    public get width() {
        return this._image.width;
    }

    public get height() {
        return this._image.height;
    }

    public inputAttach(documentReference: Document): InputHandlerTrack[] {
        return [];
    }
}