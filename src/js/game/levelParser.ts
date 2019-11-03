import { GameObject } from './../physics/gameObject';
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

export enum ObjectReflection {
    PLAYER, MISSILE, BOMB, BLOCK, GOAL
}

export interface LevelObjectJSON {
    type: ObjectReflection;
    position: {
        x: number;
        y: number;
    }
}

export interface LevelJSON {
    objects: LevelObjectJSON[];
}

export class LevelParser {
    public static parseLevel(rawJSON: string): GameObject[] {
        const levelObjects: GameObject[] = [];
        const data = <LevelJSON []> JSON.parse(rawJSON);

        

        return levelObjects;
    }
}