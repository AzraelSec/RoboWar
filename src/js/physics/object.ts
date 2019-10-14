import { Vec2 } from './vec2';
import { IDrawable } from '../graphics/drawable';

export interface IPhysical {
    setVelocity(time:number, velocity:Vec2): void;
    getVelocity():Vec2;
    getPosition(time:number):Vec2;
    update(time:number):void;
}

export class GameObject implements IPhysical {
    public static FPS:number = 100;

    protected _firstUpdate:number;
    protected _initPosition:Vec2;
    protected _actualPosition:Vec2;
    protected _velocity: Vec2;
    private _image: IDrawable;

    constructor(initPosition: Vec2, initVelocity: Vec2, representation: IDrawable, firstUpdate: number) {
        this._initPosition = initPosition;
        this._actualPosition = initPosition;
        this._velocity = initVelocity;
        this._image = representation;
        this._firstUpdate = firstUpdate;
    }

    public getVelocity(): Vec2 {
        return this._velocity;
    }

    public setVelocity(time: number, v: Vec2): void {
        if(!v.isEqual(this._velocity)) {
            this._initPosition = this._actualPosition;
            this._firstUpdate = time;
            this._velocity = v;
        }
    }

    public setHorizontalVelocity(time: number, vx: number) {
        if(vx !== this._velocity.x) {
            this._initPosition = this._actualPosition;
            this._firstUpdate = time;
            this._velocity.x = vx;
        }
    }
    
    public setVerticalVelocity(time: number, vy: number) {
        if(vy !== this._velocity.y) {
            this._initPosition = this._actualPosition;
            this._firstUpdate = time;
            this._velocity.y = vy;
        }
    }

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
    
    protected changeRepresentation(newRepresentation: IDrawable): void {
        this._image = newRepresentation;
    }
}