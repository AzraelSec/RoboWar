import { ResourceManager } from './../../graphics/resourceLoader';
import { LevelParser, LevelJSON } from './levelParser';
import { Level } from './level';

export class LevelsManager {
    protected _levelsPool: Level[];
    protected _presentLevel: number;
    protected _levelParser: LevelParser;

    constructor(resourceManager: ResourceManager) {
        this._levelsPool = [];
        this._levelParser = new LevelParser(resourceManager);
    }

    public addLevel(level: Level | LevelJSON): void {
        if(level instanceof Level) this._levelsPool.push(level);
        else this._levelsPool.push(this._levelParser.parseLevel(level));
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