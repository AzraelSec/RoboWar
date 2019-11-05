import { LongBlock, Box } from './../obstacles/block';
import { Player } from './../player';
import { Canvas } from './../../graphics/canvas';
import { Goal } from './../goal';
import { Bomb, Missile } from './../obstacles/obstacle';
import { SceneManager } from './../scene/sceneManager';
import { ResourceManager } from './../../graphics/resourceLoader';
import { GameObject } from '../../physics/gameObject';
import { Block } from '../obstacles/block';
import { Vec2 } from '../../physics/vec2';

export enum JSONObjectType {
    PLAYER, 
    MISSILE, 
    BOMB,
    BLOCK, LONG_BLOCK, MOVING_BOX,
    GOAL, 
}

export interface LevelObjectJSON {
    type: JSONObjectType;
    position: {
        x: number;
        y: number;
    }
}

export interface LevelJSON {
    id: number;
    objects: LevelObjectJSON[];
}

export class LevelParser {
    private _resourceManager: ResourceManager;
    private _sceneManager: SceneManager;
    private _canvas: Canvas;
    private _gameoverAction: () => void;
    private _winAction: () => void;

    constructor(resourceManager: ResourceManager, sceneManager: SceneManager, canvas: Canvas, gameoverAction: () => void, winAction: () => void) {
        this._resourceManager = resourceManager;
        this._sceneManager = sceneManager;
        this._canvas = canvas;
        this._gameoverAction = gameoverAction;
        this._winAction = winAction;
    }

    public parseLevel(rawJSON: string): GameObject[] {
        const levelObjects: GameObject[] = [];
        const data: LevelJSON = <LevelJSON> JSON.parse(rawJSON);
        
        for(let object of data.objects) {
            object.position.y = (this._canvas.height - object.position.y)
            if(object.type === JSONObjectType.BLOCK)
                levelObjects.push(new Block(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.LONG_BLOCK)
                levelObjects.push(new LongBlock(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.MOVING_BOX)
                levelObjects.push(new Box(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.BOMB)
                levelObjects.push(new Bomb(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.GOAL)
                levelObjects.push(new Goal(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.MISSILE)
                levelObjects.push(new Missile(this._canvas.width, object.position.y, this._resourceManager));
            else if(object.type === JSONObjectType.PLAYER)
                levelObjects.push(new Player(new Vec2(object.position.x, object.position.y), this._resourceManager, null, this._canvas.width, this._canvas.height, this._gameoverAction, this._winAction))
        }

        return levelObjects;
    }
}