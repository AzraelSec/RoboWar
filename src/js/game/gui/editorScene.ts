import { TwoWayButton, ButtonResource } from './../../graphics/controls/button';
import { MenuControl } from './../../graphics/controls/container';
import { JSONObjectType } from './../level/levelParser';
import { ResourceManager } from './../../graphics/resourceLoader';
import { Background, Canvas } from './../../graphics/canvas';
import { Scene } from './../scene/scene';
import { Vec2 } from '../../physics/vec2';
import { StaticSprite } from '../../graphics/representations/staticSprite';

export class EditorScene extends Scene {
    private static _menuWidth: number = 300;
    protected selectedObject: JSONObjectType;

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager) {
        const menu: MenuControl = new MenuControl(new Vec2(canvas.width - EditorScene._menuWidth, 0), EditorScene._menuWidth, canvas.height, resourceManager, [
            new TwoWayButton(
                Vec2.Zero(), <ButtonResource> {
                    normal: new StaticSprite(resourceManager.getResource('play_button_1')),
                    pressed: new StaticSprite(resourceManager.getResource('play_button_2'))
                }, () => alert('pressed')
            ),
            new TwoWayButton(
                Vec2.Zero(), <ButtonResource> {
                    normal: new StaticSprite(resourceManager.getResource('play_button_1')),
                    pressed: new StaticSprite(resourceManager.getResource('play_button_2'))
                }, () => alert('pressed')
            )
        ] )
        super(document, canvas, resourceManager.getDrawable('menu_background'), [
            menu
        ]);

        this.selectedObject = null;
    }

}