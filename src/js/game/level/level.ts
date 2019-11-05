import { GameObject } from './../../physics/gameObject';

export class Level {
    protected static AVAILABLE_ID: number = 1;
    protected _objects: GameObject[];
    private _bestTime: number;
    protected _id: number;
    
    constructor(objects: GameObject[], id: number) {
        this._objects = objects;
        this._bestTime = Number.MAX_VALUE;
        this._id = id;
    }

    public static createLevel(objects: GameObject[]): Level {
        let newID: number = Level.AVAILABLE_ID;
        Level.AVAILABLE_ID++;
        return new Level(objects, newID);
    }

    public get bestTime(): number {
        return this._bestTime;
    }

    public set bestTime(value: number) {
        this._bestTime = value;
    }

    public get id() {
        return this._id;
    }

    public get objects(): GameObject[] {
        return this._objects;
    }

    /*public toJSON(): string {
        const data: LevelJSON = <LevelJSON> {
            id: this._id,
            objects: this._objects.map((object) => object.toJSON())
        }
        return JSON.stringify(data);
    }*/
}