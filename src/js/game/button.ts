import { StaticSprite } from './../graphics/representations/staticSprite';
import { GameObject } from './../physics/gameObject';
import { Vec2 } from '../physics/vec2';

enum ButtonState {
    normal, pressed
}

export interface ButtonResource {
    normal: StaticSprite;
    pressed: StaticSprite;
}

export class Button extends GameObject {
    protected _buttonResource: ButtonResource;
    protected _state: ButtonState;
    protected _action: () => void;
    
    constructor(position: Vec2, representation: ButtonResource, firstUpdate: number, action: () => void) {
        super(position, Vec2.Zero(), representation.normal, firstUpdate);
        this._buttonResource = representation;
        this._action = action;
        this._state = ButtonState.normal;
    }

    private buttonDownHandling(event: MouseEvent): void {
        if(this.isIn(event.clientX, event.clientY) && this._state === ButtonState.normal) {
            this.changeRepresentation(this._buttonResource.pressed);
            this._state = ButtonState.pressed;
        }
    }

    private buttonUpHandling(event: MouseEvent): void {
        if(this._state === ButtonState.pressed) {
            this.changeRepresentation(this._buttonResource.normal);
            this._state = ButtonState.normal;
            if(this.isIn(event.clientX, event.clientY)) this._action();
        }
    }

    public inputAttach(document: Document): void {
        document.addEventListener('mousedown', this.buttonDownHandling.bind(this));
        document.addEventListener('mouseup', this.buttonUpHandling.bind(this));
    }
}