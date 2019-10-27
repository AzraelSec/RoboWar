import { Bomb } from './../obstacles/obstacle';
import { Shot } from './../shot';
import { Block } from './../obstacles/block';
import { StaticSprite } from './../../graphics/representations/staticSprite';
import { TextControl } from './../../graphics/controls/textBox';
import { ContainerControl } from './../../graphics/controls/container';
import { Player } from './../player';
import { Animation } from './../../graphics/representations/animation';
import { ResourceManager } from '../../graphics/resourceLoader';
import { Scene } from '../scene/scene';
import { Canvas } from '../../graphics/canvas';
import { Vec2 } from '../../physics/vec2';
import { SceneManager } from '../scene/sceneManager';
import { PlayerStatesResources } from '../player';
import { OneShotAnimation } from '../../graphics/representations/oneShotAnimation';

export class PlayScene extends Scene {
    protected timeText: TextControl;
    protected lifeCountText: TextControl;
    protected lifeCount: number;
    protected shotsRequests: Vec2[];
    protected shotAnimation;
    private sceneManager: SceneManager;

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        const shotsRequests: Vec2[] = [];
        const robotSprites = new PlayerStatesResources(
            new Animation(canvas.context, resourceManager.getResource('run'), 9, 0.3),
            new Animation(canvas.context, resourceManager.getResource('idle'), 9, 0.3),
            new OneShotAnimation(canvas.context, resourceManager.getResource('jump'), 9, 0.3)
        );

        const player: Player = new Player(new Vec2(0, canvas.height - robotSprites.idling.height), robotSprites, 0, canvas.width, canvas.height, shotsRequests);

        const blockSprite = new StaticSprite(canvas.context, resourceManager.getResource('block'), 0.3);
        const shotAnimation = new StaticSprite(canvas.context, resourceManager.getResource('shot'));
        const bombSprite = new StaticSprite(canvas.context, resourceManager.getResource('bomb'), 0.4);

        let timeText = new TextControl(canvas.context, new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        let lifeCountText = new TextControl(canvas.context, new Vec2(300, 5), 300, 70, `Lifes: 5`, resourceManager.getDrawable('time_background'));
        let block1 = new Block(new Vec2(400, canvas.height - blockSprite.height - 300), blockSprite, 0);
        let block2 = new Block(new Vec2(400 + blockSprite.width, canvas.height - blockSprite.height - 300), blockSprite, 0);
        let bomb1 = new Bomb(new Vec2(800, canvas.height - blockSprite.height - 300), bombSprite, 0);
        let bomb2 = new Bomb(new Vec2(600, canvas.height - blockSprite.height - 300), bombSprite, 0);
        super(document, canvas, resourceManager.getDrawable('menu_background'), [ 
            player,
            timeText,
            lifeCountText,
            block1, block2, bomb1, bomb2
         ]);

         this.timeText = timeText;
         this.lifeCountText = lifeCountText;
         this.lifeCount = 5;
         this.shotsRequests = shotsRequests;
         this.shotAnimation = shotAnimation;
         this.sceneManager = sceneManager;
    }

    public play(newTime: number): void {
        super.play(newTime);
       if(this._player.life <= 0) this.sceneManager.setScene('gameover')
       else{
           this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);
           this.lifeCountText.changeText(`Lifes: ${this._player.life}`);
       }
    }

    public initialize(): void {
        super.initialize();
        this._player.reset();
    }
}