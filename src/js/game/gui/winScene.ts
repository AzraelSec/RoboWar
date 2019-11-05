import { GameObject } from './../../physics/gameObject';
import { Animation } from './../../graphics/representations/animation';
import { DrawableControl } from './../../graphics/controls/control';
import { OneShotAnimation } from './../../graphics/representations/oneShotAnimation';
import { TextControl } from './../../graphics/controls/textBox';
import { StaticSprite } from './../../graphics/representations/staticSprite';
import { TwoWayButton, ButtonResource, TextButton } from './../../graphics/controls/button';
import { SceneManager } from './../scene/sceneManager';
import { ResourceManager } from './../../graphics/resourceLoader';
import { Scene } from './../scene/scene';
import { Canvas } from '../../graphics/canvas';
import { Vec2 } from '../../physics/vec2';

export class WinScene extends Scene {
    private _robotAnimation: OneShotAnimation;

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let button_background = resourceManager.getResource('time_background');
        let sprite_normal = new StaticSprite(button_background);

        let robotSprite = new Animation(resourceManager.getResource('idle'), 9, 1.2, 0.3);
        let deadRobot = new DrawableControl(new Vec2(canvas.width - robotSprite.width, canvas.height - robotSprite.height), robotSprite);

        let textboxWidth = 500;
        let textboxHeight = 400;
        
        const starSprite = new StaticSprite(resourceManager.getResource('goal'), 0.3);

        super(document, canvas, resourceManager.getDrawable('menu_background'), [
            new TextButton(new Vec2((canvas.width - sprite_normal.width) * 0.5, (canvas.height - sprite_normal.height) * 0.5 - 300), sprite_normal, 'Menu', () => {
                sceneManager.setScene('start')
            }),
            deadRobot,
            new TextControl(new Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5), textboxWidth, textboxHeight, 'You Win!')
        ],);
        this._robotAnimation = robotSprite;
    }

    public finalize(): void {
        super.finalize();
        this._robotAnimation.reset();
    }
}