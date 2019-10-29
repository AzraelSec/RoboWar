import { Control, DrawableControl } from './control';
import { Vec2 } from '../../physics/vec2';

export type ContainerOrientation = 'vertical' | 'horizontal';

export class ContainerControl extends Control {
    protected _controls: Control[];
    protected _orientation: ContainerOrientation;

    constructor(position: Vec2, width: number, height: number, controls?: Control[], orientation ?: ContainerOrientation) {
        super(position, width, height);
        this._controls = controls;
        this._orientation = orientation || 'horizontal';
    }
    
    public drawControl(context: CanvasRenderingContext2D): void {
        throw new Error(`Not implemented yet`);
    }
}