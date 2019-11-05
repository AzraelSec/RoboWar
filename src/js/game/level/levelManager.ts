import { LevelParser } from './levelParser';
import { Level } from './level';

export class LevelsManager {
    protected _levelsPool: Level[];
    protected _presentLevel: number;
    protected _levelParser: LevelParser;
    protected _storage: Storage;

    constructor(levelParser: LevelParser) {
        this._levelsPool = [];
        this._presentLevel = 0;
        this._storage = window.localStorage;
        this._levelParser = levelParser;
    }

    public addLevel(level: Level | string): void {
        this._levelsPool.push(typeof level === 'string' ? this._levelParser.parseLevel(level) : level);
        //this._storage.setItem(level.id.toString(), level.toJSON());
    }

    public get playingLevel(): Level {
        return this._levelsPool[this._presentLevel];
    }

    public set actualLevel(value: number) {
        this._presentLevel = value;
    }

    public get levelsNumber(): number {
        return this._levelsPool.length;
    }

    public setBestTime(time: number): void {
        const level: Level = this.playingLevel
        level.bestTime = time;
        //this._storage.setItem(level.id.toString(), level.toJSON());
    }
}