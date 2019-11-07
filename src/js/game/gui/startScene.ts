import { World } from './../world';
import { TextButton } from './../../graphics/controls/button';
import { Animation } from './../../graphics/representations/animation';
import { ResourceManager } from '../../graphics/resourceLoader';
import { Scene } from '../scene/scene';
import { Graphics } from '../../graphics/canvas';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { Vec2 } from '../../physics/vec2';
import { SceneManager } from '../scene/sceneManager';
import { TextControl } from '../../graphics/controls/textBox';
import { DrawableControl } from '../../graphics/controls/control';

export class StartScene extends Scene {
    constructor(document: Document, canvas: Graphics, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let button_background = resourceManager.getResource('time_background');
        let sprite_normal = new StaticSprite(button_background);

        let robot_resource = resourceManager.getResource('idle');
        let spriteRobot = new Animation(robot_resource, 9);

        super(document, canvas, resourceManager.getDrawable('main_background'), [
            new TextButton(new Vec2((World.WORLD_WIDTH - 150) * 0.5, (World.WORLD_HEIGHT - 100) * 0.5 + 50), 150, 75, sprite_normal, 'start', () => {
                sceneManager.setScene('play')
            }),
            new TextButton(new Vec2((World.WORLD_WIDTH - 150) * 0.5,  (World.WORLD_HEIGHT - 100) * 0.5 + 125), 150, 75, sprite_normal, 'editor', () => {
                sceneManager.setScene('editor')
            }),
            new TextControl(new Vec2((World.WORLD_WIDTH - 650) * 0.5, (World.WORLD_HEIGHT - 100) * 0.5 - 50), 650, 100, 'RoboWar'),
            new DrawableControl(new Vec2(100, 200), 200, 200, spriteRobot),
        ],);
    }
}