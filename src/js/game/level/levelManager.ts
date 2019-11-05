import { LevelParser } from './levelParser';
import { Level } from './level';

export class LevelsManager {
    protected _levelsPool: Level[];
    protected _presentLevel: number;
    protected _storage: Storage;

    constructor() {
        this._levelsPool = [];
        this._storage = window.localStorage;
    }

    public addLevel(level: Level): void {
        this._levelsPool.push(level);
    }

    public getLevel(id: number) {
        return this._levelsPool[id];
    }

    public get levelsNumber(): number {
        return this._levelsPool.length;
    }

    public setBestTime(index:number, time: number): void {
        const level: Level = this.getLevel(index);
        level.bestTime = time;
    }
}