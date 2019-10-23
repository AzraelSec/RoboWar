import { Scene } from './scene';

export type SceneFrame = {
    name: string;
    scene: Scene;
}

export class SceneManager {
    private _scenes: SceneFrame[];
    public _actualScene: number;
    private _lastUpdate: number;
    private _started: boolean;

    constructor(scenes?: SceneFrame[]) {
        this._scenes = scenes || [];
        this._actualScene = -1;
        this._lastUpdate = 0;
        this._started = false;
    }

    public setScene(name: string): boolean {
        let index: number;
        let found: boolean = (index = this.lookForScene(name)) !== -1;
        if(found) {
            if(this._actualScene !== -1) this._scenes[this._actualScene].scene.finalize();
            this._actualScene = index;
            this._scenes[this._actualScene].scene.initialize();
        }
        return found;
    }

    public addScene(scene: SceneFrame): SceneManager {
        this._scenes.push(scene);
        return this;
    }

    public start(): void {
        this._started = true;
        requestAnimationFrame(this.tick.bind(this));
    }

    public stop(): void {
        this._started = false;
    }

    public tick(clock: number): void {
        if(this._started) {
            if(this._actualScene !== -1)
                this._scenes[this._actualScene].scene.play(clock);
            requestAnimationFrame(this.tick.bind(this));
        }
    }

    private lookForScene(name: string): number {
        let index = -1;
        for(let i = 0; i < this._scenes.length && index === -1; i++)
            if(this._scenes[i].name === name)
                index = i;
        return index;
    }
}