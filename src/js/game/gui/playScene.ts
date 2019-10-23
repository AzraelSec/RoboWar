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

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        const robotSprites = new PlayerStatesResources(
            new Animation(canvas.context, resourceManager.getResource('run'), 9),
            new Animation(canvas.context, resourceManager.getResource('idle'), 9),
            new OneShotAnimation(canvas.context, resourceManager.getResource('jump'), 9)
        );

        const player: Player = new Player(new Vec2(0, canvas.height - robotSprites.idling.height), robotSprites, 0, canvas.width, canvas.height);
        
        let timeText = new TextControl(canvas.context, new Vec2(0, 5), 300, 70, `Time: 0`, resourceManager.getDrawable('time_background'));
        let lifeCountText = new TextControl(canvas.context, new Vec2(300, 5), 300, 70, `Lifes: 5`, resourceManager.getDrawable('time_background'));

        super(document, canvas, resourceManager.getDrawable('menu_background'), [ 
            player,
            timeText,
            lifeCountText
         ]);

         this.timeText = timeText;
         this.lifeCountText = lifeCountText;
         this.lifeCount = 5;
    }

    public play(newTime: number): void {
        super.play(newTime);
        this.timeText.changeText(`Time: ${Math.trunc((newTime - this._fistUpdate) / 1000)}`);
        this.lifeCountText.changeText('Lifes: 5');
    }
}