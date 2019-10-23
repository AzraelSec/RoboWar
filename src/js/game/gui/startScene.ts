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
        //let button_pressed = resourceManager.getResource('play_button_2');

        let sprite_normal = new StaticSprite(canvas.context, button_normal);
        //let sprite_pressed = new StaticSprite(canvas.context, button_pressed);

        let textboxWidth = 1000;
        let textboxHeight = 2000;

        let robot_resource = resourceManager.getResource('idle');
        let spriteRobot = new Animation(canvas.context, robot_resource, 9, 1.2, 0.4);

        super(document, canvas, resourceManager.getDrawable('menu_background'), [
            new OneWayButton(new Vec2((canvas.width - sprite_normal.width) * 0.5, (canvas.height - sprite_normal.height) * 0.5), sprite_normal, () => {
                sceneManager.setScene('play');
            }),
            new TextControl(canvas.context, new Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5 - 200), textboxWidth, textboxHeight, 'RoboWar'),
            new DrawableControl(new Vec2(0, (canvas.height - spriteRobot.height) * 0.5 + 200), spriteRobot),
        ],);
    }
}