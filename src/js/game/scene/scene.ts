import { InputHandler, InputHandlerTrack } from './../inputHandler';
import { Background } from './../../graphics/canvas';
import { Control } from '../../graphics/controls/control';
import { Canvas } from '../../graphics/canvas';
import { World } from '../world';
import { Obstacle } from '../Obstacles/obstacle';
import { Player } from '../player';
import { Shot } from '../shot';
import { GameObject } from '../../physics/gameObject';

export class Scene {
    protected _objects: GameObject[];
    protected _shots: Shot[];
    protected _player: Player;
    protected _enemies: Obstacle[];
    protected _controls: Control[];

    protected _lastUpdate: number;
    protected _fistUpdate: number;
    protected _canvas: Canvas;
    protected _document: Document;
    protected _background: Background;
    protected _eventsListeners: InputHandlerTrack[];

    constructor(document: Document, canvas: Canvas, background: Background, entities?: GameObject[] | Control[]) {
        this._objects = [];
        this._controls = [];

        this._player = null;
        this._enemies = [];
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
        else if(object instanceof Obstacle) this._enemies.push(object);
    }

    public play(newTime: number): void {
        if(this._fistUpdate === null) this._fistUpdate = newTime;
        newTime = newTime - this._fistUpdate;
        if(newTime - this._lastUpdate > (1000 / World.FPS)) {
            this._canvas.clear(this._background);
            for(let i = 0; i < this._objects.length; i++)
                this._objects[i].update(newTime);
            this._canvas.context.save();
            for(let i = 0; i < this._objects.length; i++)
                this._objects[i].drawObject();
            for(let i = 0; i < this._controls.length; i++)
                this._controls[i].drawControl();
            this._canvas.context.restore();
            this._lastUpdate = newTime;
        }
    }

    public initialize(): void {
        for(let i = 0; i < this._objects.length; i++)
            this._eventsListeners = this._eventsListeners.concat(this._objects[i].inputAttach(this._document));
        for(let i = 0; i < this._controls.length; i++)
            this._eventsListeners = this._eventsListeners.concat(this._controls[i].inputAttach(this._document));
    }

    public finalize(): void {
        for(let i = 0; i < this._eventsListeners.length; i++)
            this._document.removeEventListener(this._eventsListeners[i].type, this._eventsListeners[i].callback);
    }

}