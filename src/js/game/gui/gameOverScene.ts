import { DrawableControl } from './../../graphics/controls/control';
import { OneShotAnimation } from './../../graphics/representations/oneShotAnimation';
import { TextControl } from './../../graphics/controls/textBox';
import { StaticSprite } from './../../graphics/representations/staticSprite';
import { TwoWayButton, ButtonResource } from './../../graphics/controls/button';
import { SceneManager } from './../scene/sceneManager';
import { ResourceManager } from './../../graphics/resourceLoader';
import { Scene } from './../scene/scene';
import { Canvas } from '../../graphics/canvas';
import { Vec2 } from '../../physics/vec2';

export class GameOverScene extends Scene {
    private _robotAnimation: OneShotAnimation;

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let buttonResource = <ButtonResource> {
            normal: new StaticSprite(resourceManager.getResource('replay_button_1')),
            pressed: new StaticSprite(resourceManager.getResource('replay_button_2'))
        };
        let replayButton = new TwoWayButton(new Vec2((canvas.width - buttonResource.normal.width) * 0.5, (canvas.height - buttonResource.normal.height) * 0.5 - 300), buttonResource, () => {
            sceneManager.setScene('play');
        });

        let robotSprite = new OneShotAnimation(resourceManager.getResource('dead'), 9, 1.2, 0.3);
        let deadRobot = new DrawableControl(new Vec2(canvas.width - robotSprite.width, canvas.height - robotSprite.height), robotSprite);

        let textboxWidth = 1200;
        let textboxHeight = 600;
        
        super(document, canvas, resourceManager.getDrawable('menu_background'), [
            replayButton,
            deadRobot,
            new TextControl(new Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5), textboxWidth, textboxHeight, 'Game Over')
        ],);
        this._robotAnimation = robotSprite;
    }

    public finalize(): void {
        super.finalize();
        this._robotAnimation.reset();
    }
}