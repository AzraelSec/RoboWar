import { LevelParser } from './../level/levelParser';
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

    protected timeText: TextControl;
    protected lifeCountText: TextControl;
    protected lifeCount: number;
    protected shotsRequests: Vec2[];

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let timeText = new TextControl(new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        super(document, canvas, resourceManager.getDrawable('menu_background'), [timeText]);
        
        this.levelParser = new LevelParser(resourceManager, sceneManager, canvas, () => {
            this.reset()
            console.log(`${JSON.stringify(this._objects)}`);
            sceneManager.setScene('gameover');
        }, () => this.nextLevel());

        const shotsRequests: Vec2[] = [];

        this.levelScenePool = []
       this.levelScenePool.push(this.levelParser.parseLevel(`
        {
            "id": 1,
            "objects": [
                {
                    "type": 0,
                    "position": {
                        "x": 200,
                        "y": 200
                    }
                },
                {
                    "type": 4,
                    "position": {
                        "x": 800,
                        "y": 500
                    }
                },
                {
                    "type": 4,
                    "position": {
                        "x": 300,
                        "y": 200
                    }
                },
                {
                    "type": 6,
                    "position": {
                        "x": 0,
                        "y": 600
                    }
                }
            ]
        }
       `))
       this.levelScenePool.push(this.levelParser.parseLevel(`
        {
            "id": 2,
            "objects": [
                {
                    "type": 0,
                    "position": {
                        "x": 100,
                        "y": 400
                    }
                },
                {
                    "type": 3,
                    "position": {
                        "x": 800,
                        "y": 300
                    }
                },
                {
                    "type": 3,
                    "position": {
                        "x": 100,
                        "y": 300
                    }
                },
                {
                    "type": 2,
                    "position": {
                        "x": 400,
                        "y": 100
                    }
                },
                {
                    "type": 6,
                    "position": {
                        "x": 700,
                        "y": 300
                    }
                }
            ]
        }
       `))
        
        this.timeText = timeText;
        this.sceneManager = sceneManager;
        this.shotsRequests = shotsRequests;

        this.reset();
    }
    
    public play(newTime: number): void {
        super.play(newTime);
        this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);
    }

    protected nextLevel(): void {
        if(this.presentLevel < this.levelScenePool.length - 1) {
            this.finalize();
            this._objects = [];
            this.presentLevel++;
            for(let ent of this.levelScenePool[this.presentLevel]) {
                this.mapObject(ent);
            }
            this.initialize();
        } else {
            this.reset();
            this.sceneManager.setScene('win');
        }
    }

    protected reset(): void {
        this.presentLevel = 0;
        this._objects = [];
        for(let ent of this.levelScenePool[this.presentLevel]) this.mapObject(ent);
    }
}