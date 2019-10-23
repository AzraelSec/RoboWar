import { InputHandlerTrack } from './../../game/inputHandler';
import { DrawableControl } from './control';
import { StaticSprite } from '../representations/staticSprite';
import { Vec2 } from '../../physics/vec2';

enum ButtonState {
    normal, pressed
}

export interface ButtonResource {
    normal: StaticSprite;
    pressed: StaticSprite;
}

export class TwoWayButton extends DrawableControl {
    protected _buttonResource: ButtonResource;
    protected _state: ButtonState;
    protected _action: () => void;
    
    constructor(position: Vec2, representation: ButtonResource, action: () => void) {
        super(position, representation.normal);
        this._buttonResource = representation;
        this._action = action;
        this._state = ButtonState.normal;
    }

    protected buttonDownHandling(event: MouseEvent): void {
        if(this.isIn(event.clientX, event.clientY) && this._state === ButtonState.normal) {
            this.changeRepresentation(this._buttonResource.pressed);
            this._state = ButtonState.pressed;
        }
    }

    protected buttonUpHandling(event: MouseEvent): void {
        if(this._state === ButtonState.pressed) {
            this.changeRepresentation(this._buttonResource.normal);
            this._state = ButtonState.normal;
            if(this.isIn(event.clientX, event.clientY)) this._action();
        }
    }

    public inputAttach(documentReference: Document): InputHandlerTrack[] {    
        const references: InputHandlerTrack[] = [
            { type: 'mousedown', callback: this.buttonDownHandling.bind(this) },
            { type: 'mouseup', callback: this.buttonUpHandling.bind(this) }
        ];
        
        for(let i = 0; i < references.length; i++)
            documentReference.addEventListener(references[i].type, references[i].callback);
        
        return references;
    }
}

export class OneWayButton extends TwoWayButton {
    constructor(position: Vec2, representation: StaticSprite, action: () => void) {
        super(position,
            <ButtonResource> {
                normal: representation,
                pressed: representation}
            , action);
    }

    protected buttonDownHandling(event: MouseEvent): void {
        if(this.isIn(event.clientX, event.clientY) && this._state === ButtonState.normal)
            this._state = ButtonState.pressed;
    }

    protected buttonUpHandling(event: MouseEvent): void {
        if(this._state === ButtonState.pressed) {
            this._state = ButtonState.normal;
            if(this.isIn(event.clientX, event.clientY)) this._action();
        }
    }
}