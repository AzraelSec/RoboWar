import { LevelsManager } from './../level/levelManager';
import { LevelParser, JSONObjectType } from './../level/levelParser';
import { Goal } from './../goal';
import { GameObject } from './../../physics/gameObject';
import { Bomb, Missile, Mine } from './../obstacles/obstacle'; 
import { Block } from './../obstacles/block';
import { TextControl } from './../../graphics/controls/textBox';
import { Player } from './../player';
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
    protected shotsRequests: Vec2[];

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let timeText = new TextControl(new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        let bestTimeText = new TextControl(new Vec2(timeText.width, 5), 300, 70, `Best: -`, resourceManager.getDrawable('time_background'));
        super(document, canvas, resourceManager.getDrawable('menu_background'), [timeText, bestTimeText]);
        
        this.levelParser = new LevelParser(resourceManager, sceneManager, canvas, () => {
            this.reset()
            console.log(`${JSON.stringify(this._objects)}`);
            sceneManager.setScene('gameover');
        }, () => this.nextLevel());

        this.levelManager = new LevelsManager(this.levelParser);
        const shotsRequests: Vec2[] = [];

       this.levelManager.addLevel(`
        {
            "id": 1,
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
                }
            ]
        }
       `);
        
        this.timeText = timeText;
        this.sceneManager = sceneManager;
        this.bestTimeText = bestTimeText;
        this.shotsRequests = shotsRequests;
        this.timeCounter = 0;
        
        this.reset();
    }
    
    public play(newTime: number): void {
        super.play(newTime);
        this.timeCounter = Math.round((newTime - this._fistUpdate) / 1000 * 100) / 100;
        this.timeText.changeText(`Time: ${Math.trunc(this.timeCounter)}`);
        this.bestTimeText.changeText(`Best: ${this.levelManager.playingLevel.bestTime < Number.MAX_VALUE ? this.levelManager.playingLevel.bestTime : '-'}`)
    }

    protected nextLevel(): void {
        if(this.timeCounter < this.levelManager.playingLevel.bestTime)
            this.levelManager.setBestTime(this.timeCounter);
        console.log(`Best Time: ${this.levelManager.playingLevel.bestTime}`)
        if(this.levelManager.actualLevel < this.levelManager.levelsNumber - 1) {
            this.finalize();
            this._objects = [];
            this.levelManager.actualLevel++;
            for(let ent of this.levelManager.playingLevel.objects)
                this.mapObject(ent);
            this.initialize();
        } else {
            this.reset();
            this.sceneManager.setScene('win');
        }
    }

    protected reset(): void {
        this.levelManager.actualLevel = 0;
        this._objects = [];
        for(let ent of this.levelManager.playingLevel.objects) this.mapObject(ent);
    }
}