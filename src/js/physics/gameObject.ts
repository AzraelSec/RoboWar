import { Level } from './../game/level/level';
import { ResourceManager } from './../graphics/resourceLoader';
import { Obstacle } from './../game/obstacles/obstacle';
import { InputHandler, InputHandlerTrack } from './../game/inputHandler';
import { Vec2 } from './vec2';
import { IDrawable } from '../graphics/representations/drawable';
import { JSONObjectType } from '../game/level/levelParser';

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
    protected _resourceManager: ResourceManager;

    constructor(initPosition: Vec2, initVelocity: Vec2, resourceManager: ResourceManager, firstUpdate: number, playerCollisionCallback?: PlayerCollisionCallback) {
        this._originalPosition = new Vec2(initPosition.x, initPosition.y);
        this._initPosition= initPosition;

        this._originalVelocity = new Vec2(initVelocity.x, initVelocity.y);
        this._velocity = initVelocity;

        this._image = null;
        this._resourceManager = resourceManager;
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
        let position: Vec2 = this.getPosition(time);
        context.save();
        if(this._image)
            this._image.draw(context, position.x - Math.abs((this._image.width - this.width) * 0.5), position.y - Math.abs((this._image.height - this.height) * 0.5), this._velocity.x < 0);
        context.restore();
    }

    public getPosition(time: number): Vec2 {
        let dt = time - this._firstUpdate;
        let px = this._initPosition.x + dt * this._velocity.x;
        let py = this._initPosition.y + dt * this._velocity.y;
        return new Vec2(px, py);
    }

    protected isIn(time:number, x: number, y: number): boolean {
        let position: Vec2 = this.getPosition(time);
        return position.x < x  && 
        x < position.x + this._image.width && 
        position.y < y &&
        y < position.y + this._image.height;
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
        return this._image.width || 0;
    }

    public get height() {
        return this._image.height || 0;
    }

    //Collision Detection
    public isColliding(time: number, object: GameObject): Direction {
        let thisPosition: Vec2 = this.getPosition(time);
        let objectPosition: Vec2 = object.getPosition(time);

        if(thisPosition.x < objectPosition.x + object.width &&
            thisPosition.x + this.width > objectPosition.x &&
            thisPosition.y < objectPosition.y + object.height &&
            thisPosition.y + this.height > objectPosition.y) {
                let h: number = (this.height + object.height) * 0.5;
                let w: number = (this.width + object.width) * 0.5;
                let tcx: number = thisPosition.x + this.width * 0.5;
                let tcy: number = thisPosition.y + this.height * 0.5;
                let ocx: number = objectPosition.x + object.width * 0.5;
                let ocy: number = objectPosition.y + object.height * 0.5;
                let dx: number = tcx - ocx;
                let dy: number = tcy - ocy;
                
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

export interface JSONGameObject {
    type: JSONObjectType;
    position: {
        x: number;
        y: number;
    }
}