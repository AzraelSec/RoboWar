import { JSONGameObject } from './../../physics/gameObject';
import { World } from './../world';
import { Level } from './level';
import { LongBlock, Box } from './../obstacles/block';
import { Player } from './../player';
import { Canvas } from './../../graphics/canvas';
import { Goal } from './../goal';
import { Bomb, Missile, Mine } from './../obstacles/obstacle';
import { ResourceManager } from './../../graphics/resourceLoader';
import { GameObject } from '../../physics/gameObject';
import { Block } from '../obstacles/block';
import { Vec2 } from '../../physics/vec2';

export enum JSONObjectType {
    PLAYER, 
    MISSILE, BOMB, MINE,
    BLOCK, LONG_BLOCK, BOX,
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

    constructor(resourceManager: ResourceManager) {
        this._resourceManager = resourceManager;
    }

    public parseLevel(JSONObject: LevelJSON): Level {
        const levelObjects: GameObject[] = [];
        
        for(let object of JSONObject.objects) {
            //object.position.y = (World.VIEW_HEIGHT - object.position.y)
            if(object.type === JSONObjectType.BLOCK)
                levelObjects.push(new Block(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.LONG_BLOCK)
                levelObjects.push(new LongBlock(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.BOX)
                levelObjects.push(new Box(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.BOMB)
                levelObjects.push(new Bomb(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.MINE)
                levelObjects.push(new Mine(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.GOAL)
                levelObjects.push(new Goal(new Vec2(object.position.x, object.position.y), this._resourceManager));
            else if(object.type === JSONObjectType.MISSILE)
                levelObjects.push(new Missile(World.VIEW_WIDTH, object.position.y, this._resourceManager));
            else if(object.type === JSONObjectType.PLAYER)
                levelObjects.push(new Player(new Vec2(object.position.x, object.position.y), this._resourceManager))
        }
        return Level.createLevel(levelObjects);
    }

    public static parseObjectType(object: GameObject): JSONObjectType {
        if(object instanceof Missile) return JSONObjectType.MISSILE;
        else if (object instanceof Bomb) return JSONObjectType.BOMB;
        else if(object instanceof Block) return JSONObjectType.BLOCK;
        else if(object instanceof LongBlock) return JSONObjectType.LONG_BLOCK;
        else if(object instanceof Box) return JSONObjectType.BOX;
        else if(object instanceof Mine) return JSONObjectType.MINE;
        else if(object instanceof Player) return JSONObjectType.PLAYER; 
        else if(object instanceof Goal) return JSONObjectType.GOAL;
        
    }
}