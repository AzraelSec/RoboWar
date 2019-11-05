import { Goal } from './../goal';
import { Player } from './../player';
import { Block } from './../obstacles/block';
import { Missile, Bomb } from './../obstacles/obstacle';
import { GameObject, JSONGameObject } from './../../physics/gameObject';
import { JSONObjectType } from './levelParser';

/*
{
    "objects": [
        {
            "type": 1,
            "position": {
                "x": 45.87,
                "y": 98
            }
        },
        {
            "type": 0,
            "position": {
                "x": 412.9,
                "y": 198
            }
        }
    ]
}
*/

export class Level {
    protected _objects: JSONGameObject[];
    protected _succeeded: boolean;
    protected _id: number;

    constructor(objects: JSONGameObject[], succeeded: boolean, id: number) {
        this._objects = objects;
        this._succeeded = succeeded;
        this._id = id;
    }

    /*public static parse(rawJSON: string): Level {
        let level: any = JSON.parse(rawJSON);

    }*/

    public static parseObjectType(object: GameObject): JSONObjectType {
        if(object instanceof Missile) return JSONObjectType.MISSILE;
        else if (object instanceof Bomb) return JSONObjectType.BOMB;
        else if(object instanceof Block) return JSONObjectType.BLOCK;
        else if(object instanceof Player) return JSONObjectType.PLAYER; 
        else if(object instanceof Goal) return JSONObjectType.GOAL;
    }
}