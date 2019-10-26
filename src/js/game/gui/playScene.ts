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

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        const shotsRequests: Vec2[] = [];
        const robotSprites = new PlayerStatesResources(
            new Animation(canvas.context, resourceManager.getResource('run'), 9),
            new Animation(canvas.context, resourceManager.getResource('idle'), 9),
            new OneShotAnimation(canvas.context, resourceManager.getResource('jump'), 9)
        );

        const player: Player = new Player(new Vec2(0, canvas.height - robotSprites.idling.height), robotSprites, 0, canvas.width, canvas.height, shotsRequests);

        const blockSprite = new StaticSprite(canvas.context, resourceManager.getResource('block'), 0.4);
        const shotAnimation = new StaticSprite(canvas.context, resourceManager.getResource('shot'));

        let timeText = new TextControl(canvas.context, new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        let lifeCountText = new TextControl(canvas.context, new Vec2(300, 5), 300, 70, `Lifes: 5`, resourceManager.getDrawable('time_background'));
        let block = new Block(new Vec2(400, canvas.height - blockSprite.height - 300), blockSprite, 0);
        super(document, canvas, resourceManager.getDrawable('menu_background'), [ 
            player,
            timeText,
            lifeCountText,
            block
         ]);

         this.timeText = timeText;
         this.lifeCountText = lifeCountText;
         this.lifeCount = 5;
         this.shotsRequests = shotsRequests;
         this.shotAnimation = shotAnimation;
    }

    public play(newTime: number): void {
        super.play(newTime);
        for(let i = 0; i < this._shots.length; i++)
            if(this._shots[i].getPosition(newTime).x > this._canvas.width - this._shots[i].getPosition(newTime).x)
            {
                this._shots.splice(i, 1);
            }
        for(let i = 0; i < this.shotsRequests.length; i++)
            this._shots.push(new Shot(this.shotsRequests[i], this.shotAnimation, newTime));

        this.shotsRequests = [];
        this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);
        this.lifeCountText.changeText('Lifes: 5');
    }
}