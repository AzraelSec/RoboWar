import { Control, DrawableControl } from './control';
import { Vec2 } from '../../physics/vec2';

export type ContainerOrientation = 'vertical' | 'horizontal';

export class ContainerControl extends Control {
    protected _controls: Control[];
    protected _orientation: ContainerOrientation;

    constructor(position: Vec2, width: number, height: number, controls?: Control[], orientation ?: ContainerOrientation) {
        super(null, position, width, height);
        this._controls = controls;
        this._orientation = orientation || 'horizontal';
    }
    
    public drawControl(): void {
        let padding = 0;
        for(let i = 0; i < this._controls.length; i++) {
            const control = this._controls[i];
            control.context.save();
            control.context.translate(this._position.x + (this._orientation === 'horizontal' ? padding : 0), this._position.y - (this._orientation === 'vertical' ? padding : 0));
            control.drawControl();
            control.context.restore();
            padding += this._orientation === 'vertical' ? this.height : this.width;
        }
    }
}