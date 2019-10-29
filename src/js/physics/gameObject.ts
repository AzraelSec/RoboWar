import { Obstacle } from './../game/obstacles/obstacle';
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

export interface CollisionScaffold  {
    collider: Obstacle;
    side: Direction
};

export enum Direction {
    LEFT, RIGHT, TOP, BOTTOM
};

export class GameObject implements IPhysical, InputHandler {
    protected _originalPosition: Vec2;
    protected _originalVelocity: Vec2;
    protected _firstUpdate: number;
    protected _initPosition: Vec2;
    protected _velocity: Vec2;
    protected _image: IDrawable;
    protected _playerCollisionCallback: PlayerCollisionCallback;
    protected _inputHandlers: InputHandlerTrack[];

    constructor(initPosition: Vec2, initVelocity: Vec2, representation: IDrawable, firstUpdate: number, playerCollisionCallback?: PlayerCollisionCallback) {
        this._originalPosition = new Vec2(initPosition.x, initPosition.y);
        this._initPosition= initPosition;

        this._originalVelocity = new Vec2(initVelocity.x, initVelocity.y);
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
            this._initPosition.x = this.getPosition(time).x;
            this._initPosition.y = this.getPosition(time).y;
            this._firstUpdate = time;
            this._velocity.x = nx;
            this._velocity.y = ny;
        }
    }
    
    public setPosition(time: number, nx: number, ny: number): void {
        this._firstUpdate = time;
        this._initPosition.x = nx;
        this._initPosition.y = ny;
    }

    //Game Logic Management
    
    public update(time: number): void {
        if(this._firstUpdate === null) this._firstUpdate = time;
    }

    public drawObject(time: number, context: CanvasRenderingContext2D): void {
        context.fillRect(this.getPosition(time).x, this.getPosition(time).y, this.width, this.height);
        this._image.draw(context, this.getPosition(time).x, this.getPosition(time).y, this._velocity.x < 0);
    }

    public getPosition(time: number): Vec2 {
        let dt = time - this._firstUpdate;
        let px = this._initPosition.x + dt * this._velocity.x;
        let py = this._initPosition.y + dt * this._velocity.y;
        return new Vec2(px, py);
    }

    protected isIn(time:number, x: number, y: number): boolean {
        return this.getPosition(time).x < x  && 
        x < this.getPosition(time).x + this._image.width && 
        this.getPosition(time).y < y &&
        y < this.getPosition(time).y + this._image.height;
    }
    
    public inputAttach(documentReference: Document): InputHandlerTrack[] {
        return [];
    }

    public reset(): void {
        this._firstUpdate = null;
        this._initPosition.x = this._originalPosition.x;
        this._initPosition.y = this._originalPosition.y;
        this._velocity.x = this._originalVelocity.x;
        this._velocity.y = this._originalVelocity.y;
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

    //Collision Detection
    public isColliding(time: number, object: GameObject): Direction {
        if(this.getPosition(time).x < object.getPosition(time).x + object.width &&
            this.getPosition(time).x + this.width > object.getPosition(time).x &&
            this.getPosition(time).y < object.getPosition(time).y + object.height &&
            this.getPosition(time).y + this.height > object.getPosition(time).y) {
                let h: number = (this.height + object.height) * 0.5;
                let w: number = (this.width + object.width) * 0.5;
                let tcx: number = this.getPosition(time).x + this.width * 0.5;
                let tcy: number = this.getPosition(time).y + this.height * 0.5;
                let ocx: number = object.getPosition(time).x + object.width * 0.5;
                let ocy: number = object.getPosition(time).y + object.height * 0.5;
                let dx: number = tcx - ocx;
                let dy: number = tcy - ocy;
                
                //console.debug(`h: ${h}\nw: ${w}\ntcx: ${tcx}\ntcy: ${tcy}\nocx: ${ocx}\nocy: ${ocy}\ndx: ${dx}\ndy: ${dy}\nexp: ${Math.abs(dx / w) > Math.abs(dy / h)}`);

                if(Math.abs(dx / w) > Math.abs(dy / h)) {
                    return dx < 0 ? Direction.RIGHT : Direction.LEFT;
                }
                else {
                    return dy > 0 ? Direction.TOP : Direction.BOTTOM;
                }
            }
        return null;
    }


}