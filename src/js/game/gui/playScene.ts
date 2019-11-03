import { Goal } from './../goal';
import { GameObject } from './../../physics/gameObject';
import { Bomb, Missile } from './../obstacles/obstacle'; 
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

    protected timeText: TextControl;
    protected lifeCountText: TextControl;
    protected lifeCount: number;
    protected shotsRequests: Vec2[];

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let timeText = new TextControl(new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        super(document, canvas, resourceManager.getDrawable('menu_background'), [timeText]);
        
        const shotsRequests: Vec2[] = [];

        const player: Player = new Player(new Vec2(0, 100), resourceManager, 0, canvas.width, canvas.height, () => sceneManager.setScene('gameover'), () => this.nextLevel());

        const blocks = [
            new Block(new Vec2(400, canvas.height - 300), resourceManager),
            new Block(new Vec2(600, canvas.height - 600), resourceManager),
            new Block(new Vec2(900, canvas.height - 500), resourceManager),
        ]
        const goal = new Goal(new Vec2(canvas.width - 200, canvas.height  - 300), resourceManager);
        
        let bomb1 = new Bomb(new Vec2(800, canvas.height - 300), resourceManager);
        let missile = new Missile(canvas.width, canvas.height  - 500, resourceManager);

        this.presentLevel = -1;
        this.levelScenePool = []
        this.levelScenePool.push([player, /*bomb1, missile,*/ goal].concat(blocks));
        this.levelScenePool.push([
            new Player(new Vec2(400, 100), resourceManager, 0, canvas.width, canvas.height, () => sceneManager.setScene('gameover'), () => this.nextLevel()),
            new Block(new Vec2(598, canvas.height - 300), resourceManager),
            new Bomb(new Vec2(800, canvas.height - 300), resourceManager),
            new Goal(new Vec2(700, 700), resourceManager)
        ]);
        this.levelScenePool.push([
            new Player(new Vec2(700, 100), resourceManager, 0, canvas.width, canvas.height, () => sceneManager.setScene('gameover'), () => this.nextLevel()),
            new Block(new Vec2(598, canvas.height - 300), resourceManager),
            new Block(new Vec2(890, canvas.height - 300), resourceManager),
            new Goal(new Vec2(700, 700), resourceManager)
        ]);
        
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
        this._objects = []
        for(let ent of this.levelScenePool[this.presentLevel]) this.mapObject(ent);
    }
}