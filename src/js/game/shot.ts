import { Vec2 } from './../physics/vec2';
import { Animation } from './../graphics/representations/animation';
import { GameObject } from './../physics/gameObject';

export class Shot extends GameObject {
    constructor(initPosition: Vec2, representation: Animation, firstUpdate: number) {
        super(initPosition, new Vec2(1, 0), representation, firstUpdate);
    }
}