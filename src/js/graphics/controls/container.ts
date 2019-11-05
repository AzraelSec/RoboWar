import { StaticSprite } from './../representations/staticSprite';
import { Background } from './../canvas';
import { ResourceManager } from './../resourceLoader';
import { Control, DrawableControl } from './control';
import { Vec2 } from '../../physics/vec2';

export type ContainerOrientation = 'vertical' | 'horizontal';

export class ContainerControl extends Control {
    protected _controls: Control[];
    protected _orientation: ContainerOrientation;
    protected _background: StaticSprite;

    constructor(position: Vec2, width: number, height: number, resourceManager: ResourceManager, controls?: Control[], orientation ?: ContainerOrientation) {
        super(position, width, height);
        this._controls = controls;
        this._orientation = orientation || 'horizontal';
        this._background = new StaticSprite(resourceManager.getResource('menu_background'));
    }
    
    public drawControl(context: CanvasRenderingContext2D): void {
        throw new Error(`Not implemented yet`);
        /*context.save();
        this._background.draw(context, this._position.x, this._position.y, false);
        for(let control of this._controls) {
            context.save();

            context.restore();
        }
        context.restore();*/
    }
}