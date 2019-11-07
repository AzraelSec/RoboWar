import { World } from './../world';
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
import { Graphics } from '../../graphics/canvas';
import { Vec2 } from '../../physics/vec2';

export class WinScene extends Scene {
    private _robotAnimation: OneShotAnimation;

    constructor(document: Document, canvas: Graphics, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let button_background = resourceManager.getResource('time_background');
        let sprite_normal = new StaticSprite(button_background);

        let robotSprite = new Animation(resourceManager.getResource('idle'), 9);

        super(document, canvas, resourceManager.getDrawable('main_background'), [
            new TextButton(new Vec2((World.WORLD_WIDTH - 150) * 0.5, (World.WORLD_HEIGHT - 100) * 0.5 + 100), 150, 75, sprite_normal, 'Menu', () => {
                sceneManager.setScene('start')
            }),
            new DrawableControl(new Vec2(World.WORLD_WIDTH - 200, World.WORLD_HEIGHT - 200), 200, 200, robotSprite),
            new TextControl(new Vec2((World.WORLD_WIDTH - 650) * 0.5, (World.WORLD_HEIGHT - 100) * 0.5), 650, 100, 'You Win!')
        ],);
        this._robotAnimation = robotSprite;
    }

    public finalize(): void {
        super.finalize();
        this._robotAnimation.reset();
    }
}