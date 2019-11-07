import { World } from './../world';
import { DrawableControl } from './../../graphics/controls/control';
import { OneShotAnimation } from './../../graphics/representations/oneShotAnimation';
import { TextControl } from './../../graphics/controls/textBox';
import { StaticSprite } from './../../graphics/representations/staticSprite';
import { TwoWayButton, ButtonResource, TextButton } from './../../graphics/controls/button';
import { SceneManager } from './../scene/sceneManager';
import { ResourceManager } from './../../graphics/resourceLoader';
import { Scene } from './../scene/scene';
import { Graphics } from '../../graphics/canvas';
import { Vec2 } from '../../physics/vec2';

export class GameOverScene extends Scene {
    private _robotAnimation: OneShotAnimation;

    constructor(document: Document, canvas: Graphics, resourceManager: ResourceManager, sceneManager: SceneManager) {

        let button_background = resourceManager.getResource('time_background');
        let sprite_normal = new StaticSprite(button_background);

        let robotSprite = new OneShotAnimation(resourceManager.getResource('dead'), 9, 1.2);
        let deadRobot = new DrawableControl(new Vec2(0, 0), 10, 10, robotSprite);

        let textboxWidth = 1200;
        let textboxHeight = 600;
        
        super(document, canvas, resourceManager.getDrawable('main_background'), [
            new TextButton(Vec2.Zero(), 10, 10, sprite_normal, 'Replay', () => {
                sceneManager.setScene('play')
            }),
            new TextButton(new Vec2(0, 0), 10, 10, sprite_normal, 'Menu', () => {
                sceneManager.setScene('start')
            }),
            deadRobot,
            new TextControl(new Vec2(0, 0), textboxWidth, textboxHeight, 'Game Over')
        ],);
        this._robotAnimation = robotSprite;
    }

    public finalize(): void {
        super.finalize();
        this._robotAnimation.reset();
    }
}