import { CollisionScaffold, GameObject, Direction } from './../../physics/gameObject';
import { InputHandlerTrack } from './../inputHandler';
import { Background } from './../../graphics/canvas';
import { Control } from '../../graphics/controls/control';
import { Canvas } from '../../graphics/canvas';
import { World } from '../world';
import { Obstacle } from '../obstacles/obstacle';
import { Player } from '../player';
import { Shot } from '../shot';

export class Scene {
    protected _objects: GameObject[];
    protected _shots: Shot[];
    protected _player: Player;
    protected _obstacles: Obstacle[];
    protected _controls: Control[];

    protected _lastUpdate: number;
    protected _fistUpdate: number;
    protected _canvas: Canvas;
    protected _document: Document;
    protected _background: Background;
    protected _eventsListeners: InputHandlerTrack[];

    constructor(document: Document, canvas: Canvas, background: Background, entities?: (GameObject | Control)[]) {
        this._objects = [];
        this._controls = [];

        this._player = null;
        this._obstacles = [];
        this._shots = [];
        this._lastUpdate = 0;
        this._fistUpdate = null;
        this._canvas = canvas;
        this._background = background;
        this._document = document;
        this._eventsListeners = [];

        for(let i = 0; i < entities.length; i++) this.mapObject(entities[i]);
    }

    protected mapObject(object: GameObject | Control): void {
        if(object instanceof Control) this._controls.push(object);
        else if(object instanceof GameObject) this._objects.push(object);

        if(object instanceof Shot) this._shots.push(object);
        else if(object instanceof Player) this._player = object;
        else if(object instanceof Obstacle) this._obstacles.push(object);
    }

    public play(newTime: number): void {
        if(this._fistUpdate === null) this._fistUpdate = newTime;
        newTime = newTime - this._fistUpdate;
        if(newTime - this._lastUpdate > (1000 / World.FPS)) {
            //Game objects position updating
            for(let i = 0; i < this._objects.length; i++)
                if(!(this._objects[i] instanceof Player))
                    this._objects[i].update(newTime);

            //Player updating
            if(this._player)
                this._player.update(newTime, this.getCollisions(newTime, this._player));
                
            //Drawing the objects
            this._canvas.clear(this._background);
            this._canvas.context.save();
            for(let i = 0; i < this._objects.length; i++)
                this._objects[i].drawObject(newTime);
            for(let i = 0; i < this._controls.length; i++)
                this._controls[i].drawControl();
            this._canvas.context.restore();
            this._lastUpdate = newTime;
        }
    }

    public initialize(): void {
        this._lastUpdate = 0;
        this._fistUpdate = null;
        for(let i = 0; i < this._objects.length; i++)
            this._eventsListeners = this._eventsListeners.concat(this._objects[i].inputAttach(this._document));
        for(let i = 0; i < this._controls.length; i++)
            this._eventsListeners = this._eventsListeners.concat(this._controls[i].inputAttach(this._document));
        for(let o of this._objects) o.reset();
        }

    public finalize(): void {
        for(let i = 0; i < this._eventsListeners.length; i++)
            this._document.removeEventListener(this._eventsListeners[i].type, this._eventsListeners[i].callback);
    }

    protected getCollisions(time: number, object: GameObject): CollisionScaffold[] {
        const colliding: CollisionScaffold[] = [];
        if(object) {
            for(let obj of this._objects)
                if(object !== obj) {
                    let direction: Direction = object.isColliding(time, obj);
                    if(direction !== null)
                        colliding.push(<CollisionScaffold> {
                            collider: obj,
                            side: direction
                        });
                }
        }
        return colliding;
    }

}