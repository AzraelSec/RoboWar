import { Canvas } from './../graphics/canvas';
import { World } from './world';
import { Button } from './button';
import { Obstacle } from './Obstacles/obstacle';
import { Player } from './player';
import { Shot } from './shot';
import { GameObject } from './../physics/gameObject';

export class Scene {
    protected _entities: GameObject[];
    protected _shots: Shot[];
    protected _player: Player;
    protected _enemies: Obstacle[];
    protected _buttons: Button[];

    protected _lastUpdate: number;
    protected _canvas: Canvas;

    constructor(canvas: Canvas, entities?: GameObject[]) {
        this._entities = entities || [];
        this._player = null;
        this._enemies = [];
        this._buttons = [];
        this._lastUpdate = 0;
        this._canvas = canvas;

        for(let i = 0; i < entities.length; i++) this.mapObject(entities[i]);
    }

    protected mapObject(object: GameObject): void {
        if(object instanceof Shot) this._shots.push(object);
        else if(object instanceof Player) this._player = object;
        else if(object instanceof Obstacle) this._enemies.push(object);
        else if(object instanceof Button) this._buttons.push(object);
    }

    public play(newTime: number): void {
        if(newTime - this._lastUpdate > (1000 / World.FPS)) {
            this._canvas.clear();
            for(let i = 0; i < this._entities.length; i++)
                this._entities[i].update(newTime);
            this._canvas.context.save();
            for(let i = 0; i < this._entities.length; i++)
                this._entities[i].drawObject();
            this._canvas.context.restore();
            this._lastUpdate = newTime;
        }
    }
}