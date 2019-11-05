import { InputHandlerTrack } from './../../game/inputHandler';
import { TwoWayButton } from './button';
import { StaticSprite } from './../representations/staticSprite';
import { Background } from './../canvas';
import { ResourceManager } from './../resourceLoader';
import { Control, DrawableControl } from './control';
import { Vec2 } from '../../physics/vec2';

export class MenuControl extends Control {
    public static CELL_WIDTH: number = 100;
    public static CELL_HEIGHT: number = 100;

    protected _controls: TwoWayButton[];
    protected _background: StaticSprite;

    constructor(position: Vec2, width: number, height: number, resourceManager: ResourceManager, controls?: TwoWayButton[]) {
        super(position, width, height);
        this._controls = controls;
        this._background = new StaticSprite(resourceManager.getResource('menu_background'));
        
        for(let index in this._controls) {
            this._controls[index].position = new Vec2(this._position.x + (this.width - MenuControl.CELL_WIDTH) * 0.5, this._position.y + Number(index) * MenuControl.CELL_HEIGHT)
            this._controls[index].resize(MenuControl.CELL_WIDTH, MenuControl.CELL_HEIGHT);
        }
    }
    
    public drawControl(context: CanvasRenderingContext2D): void {
        context.save();
        //this._background.draw(context, this._position.x, this._position.y, false);
        context.fillRect(this._position.x, this._position.y, this.width, this.height)
        for(let index in this._controls)
            this._controls[index].drawControl(context);
        context.restore();
    }

    public inputAttach(documentReference: Document): InputHandlerTrack[] {
        const collect: InputHandlerTrack[] = [];
        for(let control of this._controls) collect.concat(control.inputAttach(documentReference));
        return collect;
    }
}