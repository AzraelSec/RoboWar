import { LevelsManager } from './../level/levelManager';
import { LevelParser, JSONObjectType } from './../level/levelParser';
import { GameObject } from './../../physics/gameObject';
import { TextControl } from './../../graphics/controls/textBox';
import { ResourceManager } from '../../graphics/resourceLoader';
import { Scene } from '../scene/scene';
import { Canvas } from '../../graphics/canvas';
import { Vec2 } from '../../physics/vec2';
import { SceneManager } from '../scene/sceneManager';

export class PlayScene extends Scene {
    protected levelScenePool: GameObject[][];
    protected presentLevel: number;
    protected sceneManager: SceneManager;
    protected levelParser: LevelParser;
    protected levelManager: LevelsManager;

    protected timeText: TextControl;
    protected bestTimeText: TextControl;
    protected timeCounter: number;
    protected playingLevel: number;

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager, levelManager: LevelsManager) {
        let timeText = new TextControl(new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        let bestTimeText = new TextControl(new Vec2(timeText.width, 5), 300, 70, `Best: -`, resourceManager.getDrawable('time_background'));
        super(document, canvas, resourceManager.getDrawable('main_background'), [timeText, bestTimeText]);
        
        this.levelParser = new LevelParser(resourceManager, sceneManager, canvas, () => {
            this.reset()
            console.log(`${JSON.stringify(this._objects)}`);
            sceneManager.setScene('gameover');
        }, () => this.nextLevel());

        this.levelManager = levelManager;
       this.levelManager.addLevel(this.levelParser.parseLevel(`
        {
            "id": 2,
            "objects": [
                {
                    "type": ${JSONObjectType.PLAYER},
                    "position": {
                        "x": 200,
                        "y": 200
                    }
                },
                {
                    "type": ${JSONObjectType.GOAL},
                    "position": {
                        "x": 500,
                        "y": 200
                    }
                },
                {
                    "type": ${JSONObjectType.BOMB},
                    "position": {
                        "x": 400,
                        "y": 500
                    }
                }
            ]
        }
       `));

        
        this.timeText = timeText;
        this.sceneManager = sceneManager;
        this.bestTimeText = bestTimeText;
        this.timeCounter = 0;        
        this.reset();
    }
    
    public play(newTime: number): void {
        super.play(newTime);
        this.timeCounter = Math.round((newTime - this._fistUpdate) / 1000 * 100) / 100;
        this.timeText.changeText(`Time: ${Math.trunc(this.timeCounter)}`);
        this.bestTimeText.changeText(`Best: ${this.levelManager.getLevel(this.playingLevel).bestTime < Number.MAX_VALUE ? this.levelManager.getLevel(this.playingLevel).bestTime : '-'}`)
    }

    protected nextLevel(): void {
        this.sceneManager.stop();
        if(this.timeCounter < this.levelManager.getLevel(this.playingLevel).bestTime)
            this.levelManager.getLevel(this.playingLevel).bestTime = this.timeCounter;
        console.log(`Best Time: ${this.levelManager.getLevel(this.playingLevel).bestTime}`)
        if(this.playingLevel < this.levelManager.levelsNumber - 1) {
            this.finalize();
            this._objects = [];
            this.playingLevel++;
            for(let ent of this.levelManager.getLevel(this.playingLevel).objects)
                this.mapObject(ent);
            this.initialize();
        } else {
            this.reset();
            this.sceneManager.setScene('win');
        }
        this.sceneManager.start();
    }

    protected reset(): void {
        this.playingLevel = 0;
        this._objects = [];
        for(let ent of this.levelManager.getLevel(this.playingLevel).objects) this.mapObject(ent);
    }

    public initialize(): void {
        super.initialize();
        if(window.localStorage.length > 0) {
            this.levelManager.addLevel(this.levelParser.parseLevel(`{"objects": ${window.localStorage.getItem('new')}}`))
            window.localStorage.clear();
        }
    }
}