import { Goal } from './../goal';
import { GameObject } from './../../physics/gameObject';
import { Bomb, Missile } from './../obstacles/obstacle';
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

        const player: Player = new Player(new Vec2(0, 100), resourceManager, 0, canvas.width, canvas.height, () => sceneManager.setScene('gameover'), () => sceneManager.setScene('win'));

        let timeText = new TextControl(new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        const blocks = [
            new Block(new Vec2(400, canvas.height - 300), resourceManager),
            new Block(new Vec2(600, canvas.height - 600), resourceManager),
            new Block(new Vec2(900, canvas.height - 500), resourceManager),
        ]
        const goal = new Goal(new Vec2(canvas.width - 200, canvas.height  - 300), resourceManager);
        
        let bomb1 = new Bomb(new Vec2(100, canvas.height - 300), resourceManager);
        let missile = new Missile(canvas.width, canvas.height  - 500, resourceManager);
        super(document, canvas, resourceManager.getDrawable('menu_background'), [ 
            player,
            timeText,
            bomb1,
            missile,
            goal
         ].concat(blocks));

         this.timeText = timeText;
         this.shotsRequests = shotsRequests;
    }

    public play(newTime: number): void {
        super.play(newTime);
        this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);
    }
}