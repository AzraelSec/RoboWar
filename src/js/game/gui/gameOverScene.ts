import { TextControl } from './../../graphics/controls/textBox';
import { StaticSprite } from './../../graphics/representations/staticSprite';
import { TwoWayButton, ButtonResource } from './../../graphics/controls/button';
import { SceneManager } from './../scene/sceneManager';
import { ResourceManager } from './../../graphics/resourceLoader';
import { Scene } from './../scene/scene';
import { Canvas } from '../../graphics/canvas';
import { Vec2 } from '../../physics/vec2';

export class GameOverScene extends Scene {
    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        let buttonResource = <ButtonResource> {
            normal: new StaticSprite(canvas.context, resourceManager.getResource('replay_button_1')),
            pressed: new StaticSprite(canvas.context, resourceManager.getResource('replay_button_2'))
        };
        let replayButton = new TwoWayButton(new Vec2((canvas.width - buttonResource.normal.width) * 0.5, (canvas.height - buttonResource.normal.height) * 0.5 - 300), buttonResource, () => {
            sceneManager.setScene('play');
        });

        let textboxWidth = 500;
        let textboxHeight = 400;
        
        super(document, canvas, resourceManager.getDrawable('menu_background'), [
            replayButton, 
            new TextControl(canvas.context, new Vec2((canvas.width - textboxWidth) * 0.5, (canvas.height - textboxHeight) * 0.5), textboxWidth, textboxHeight, 'Game Over')
        ],);
    }
}