import { World } from './../world';
import { TextButton, TwoWayButton, ButtonResource } from './../../graphics/controls/button';
import { Animation } from './../../graphics/representations/animation';
import { ResourceManager } from '../../graphics/resourceLoader';
import { Scene } from '../scene/scene';
import { Canvas } from '../../graphics/canvas';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { Vec2 } from '../../physics/vec2';
import { SceneManager } from '../scene/sceneManager';
import { TextControl } from '../../graphics/controls/textBox';
import { DrawableControl } from '../../graphics/controls/control';

export class StartScene extends Scene {
    private player: HTMLAudioElement;
    private playing: boolean;
    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let button_background = resourceManager.getResource('time_background');
        let sprite_normal = new StaticSprite(button_background);
        let normalButton = new StaticSprite(resourceManager.getResource('sound_button_1'), 0.5);
        let pressedButton = new StaticSprite(resourceManager.getResource('sound_button_2'), 0.5);

        let textboxWidth = 1200;
        let textboxHeight = 500;

        let robot_resource = resourceManager.getResource('idle');
        let spriteRobot = new Animation(robot_resource, 9, 1.2, 0.4);

        super(document, canvas, resourceManager.getDrawable('main_background'), [
            new TextButton(new Vec2(World.horizontalCenter(sprite_normal), World.verticalCenter(sprite_normal)), sprite_normal, 'start', () => {
                sceneManager.setScene('play')
            }),
            new TextButton(new Vec2(World.horizontalCenter(sprite_normal), World.verticalCenter(sprite_normal) + sprite_normal.height), sprite_normal, 'editor', () => {
                sceneManager.setScene('editor')
            }),
            new TextControl(new Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5 - 200), textboxWidth, textboxHeight, 'RoboWar'),
            new DrawableControl(new Vec2(0, World.alignBottom(spriteRobot) + 50), spriteRobot),
            new TwoWayButton(new Vec2((canvas.width - normalButton.width) * 0.5, (canvas.height - normalButton.height) * 0.5 + sprite_normal.height * 2), <ButtonResource> {
                normal: normalButton,
                pressed: pressedButton
            }, () => {
                if(!this.playing) {
                    this.player.play();
                    this.playing = true;
                } else {
                    this.player.pause();
                    this.playing = false;
                }
            })
        ],);
        this.player = new Audio('/assets/music.wav');
        this.player.load();
        this.player.loop = true;
        this.playing = false;
    }
}