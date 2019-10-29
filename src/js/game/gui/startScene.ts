import { OneWayButton } from './../../graphics/controls/button';
import { Animation } from './../../graphics/representations/animation';
import { ResourceManager } from '../../graphics/resourceLoader';
import { Scene } from '../scene/scene';
import { Canvas } from '../../graphics/canvas';
import { ButtonResource, TwoWayButton } from '../../graphics/controls/button';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { Vec2 } from '../../physics/vec2';
import { SceneManager } from '../scene/sceneManager';
import { TextControl } from '../../graphics/controls/textBox';
import { DrawableControl } from '../../graphics/controls/control';

export class StartScene extends Scene {
    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let button_normal = resourceManager.getResource('start_button');

        let sprite_normal = new StaticSprite(button_normal);

        let textboxWidth = 1200;
        let textboxHeight = 500;

        let robot_resource = resourceManager.getResource('idle');
        let spriteRobot = new Animation(robot_resource, 9, 1.2, 0.4);

        super(document, canvas, resourceManager.getDrawable('menu_background'), [
            new OneWayButton(new Vec2((canvas.width - sprite_normal.width) * 0.5, (canvas.height - sprite_normal.height) * 0.5), sprite_normal, () => {
                sceneManager.setScene('play');
            }),
            new TextControl(new Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5 - 200), textboxWidth, textboxHeight, 'RoboWar'),
            new DrawableControl(new Vec2(0, (canvas.height - spriteRobot.height) * 0.5 + 200), spriteRobot),
        ],);
    }
}