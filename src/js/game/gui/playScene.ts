import { Goal } from './../goal';
import { GameObject } from './../../physics/gameObject';
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

        const player: Player = new Player(new Vec2(0, canvas.height - robotSprites.idling.height), robotSprites, 0, canvas.width, canvas.height, () => sceneManager.setScene('gameover'), () => sceneManager.setScene('win'));

        const blockSprite = new StaticSprite(canvas.context, resourceManager.getResource('block'), 0.3);
        const shotAnimation = new StaticSprite(canvas.context, resourceManager.getResource('shot'));
        const bombSpriteOne = new Animation(canvas.context, resourceManager.getResource('one'), 10);
        const bombSpriteTwo = new Animation(canvas.context, resourceManager.getResource('two'), 10);
        const starSprite = new StaticSprite(canvas.context, resourceManager.getResource('goal'), 0.3);

        let timeText = new TextControl(canvas.context, new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        const blocks = [
            new Block(new Vec2(400, canvas.height - blockSprite.height - 300), blockSprite, 0),
            new Block(new Vec2(400 + blockSprite.width, canvas.height - blockSprite.height - 300), blockSprite, 0),
            new Block(new Vec2(600 + blockSprite.width, canvas.height - blockSprite.height - 500), blockSprite, 0),
            new Block(new Vec2(700 + blockSprite.width, canvas.height - blockSprite.height - 700), blockSprite, 0),
            new Block(new Vec2(800 + blockSprite.width, canvas.height - blockSprite.height - 600), blockSprite, 0),
        ]
        const goal = new Goal(new Vec2(canvas.width - starSprite.width - 100, canvas.height - starSprite.height - 300), starSprite);
        
        let bomb1 = new Bomb(new Vec2(800, canvas.height - blockSprite.height - 300), bombSpriteOne, 0);
        let bomb2 = new Bomb(new Vec2(600, canvas.height - blockSprite.height - 300), bombSpriteTwo, 0);
        super(document, canvas, resourceManager.getDrawable('menu_background'), [ 
            player,
            timeText,
            bomb1, bomb2,
            goal
         ].concat(blocks));

         this.timeText = timeText;
         this.shotsRequests = shotsRequests;
         this.shotAnimation = shotAnimation;
         this.sceneManager = sceneManager;
    }

    public play(newTime: number): void {
        super.play(newTime);
        this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);
    }
}