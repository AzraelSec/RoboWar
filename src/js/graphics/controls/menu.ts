import { StaticSprite } from './../representations/staticSprite';
import { InputHandlerTrack } from '../../game/inputHandler';
import { TwoWayButton, OneWayButton } from './button';
import { ResourceManager } from '../resourceLoader';
import { Control, DrawableControl } from './control';
import { Vec2 } from '../../physics/vec2';
import { World } from '../../game/world';

export class MenuControl extends Control {
    public static CELL_WIDTH: number = 50;
    public static CELL_HEIGHT: number = 50;

    protected _controls: TwoWayButton[];
    protected _background: StaticSprite;
    protected _closed: boolean;
    private _closedPosition: Vec2;
    private _closingButton: OneWayButton;
    private _normalPosition: Vec2;

    constructor(position: Vec2, width: number, height: number, resourceManager: ResourceManager, controls?: TwoWayButton[]) {
        super(position, width, height);
        this._closed = true;
        this._background = new StaticSprite(resourceManager.getResource('menu_background'));
        this._controls = [].concat(controls);
        
        for(let index in this._controls) 
            this._controls[index].resize(MenuControl.CELL_WIDTH, MenuControl.CELL_HEIGHT);
        
        this._closedPosition = new Vec2(World.VIEW_WIDTH - 120, World.VIEW_HEIGHT - 120);
        this._normalPosition = new Vec2(position.x, position.y);
        this._closingButton = new OneWayButton(Vec2.Zero(), new StaticSprite(resourceManager.getResource('replay_button_1'), 0.4), () => this._closed ? this.open() : this.close())
        this.adjustButtonsPosition();
        this.position = this._closedPosition;
        this._controls.push(this._closingButton);
    }
    
    public drawControl(context: CanvasRenderingContext2D): void {
        context.save();
        this._background.draw(context, this._position.x, this._position.y, false);
        for(let index in this._controls)
            this._controls[index].drawControl(context);
        context.restore();
    }

    public inputAttach(documentReference: Document): InputHandlerTrack[] {
        const collect: InputHandlerTrack[] = [];
        for(let control of this._controls) collect.concat(control.inputAttach(documentReference));
        return collect;
    }

    public set position(position: Vec2) {
        this._position.x = position.x;
        this._position.y = position.y;
        this.adjustButtonsPosition();
    }

    protected close(): void {
        this._closed = true;
        this.position = this._closedPosition;
    }

    protected open(): void {
        this._closed = false;
        this.position = this._normalPosition;
    }

    private adjustButtonsPosition() {
        for(let index in this._controls)
            if(this._controls[index] !== this._closingButton)
                this._controls[index].position = new Vec2(this._position.x + (this.width - MenuControl.CELL_WIDTH) * 0.5, this._position.y + 150+ Number(index) * MenuControl.CELL_HEIGHT)
        
        this._closingButton.position = new Vec2(this._position.x + (this.width - 100) * 0.5, this._position.y + 25);
    }
}