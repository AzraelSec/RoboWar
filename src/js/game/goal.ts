import { Obstacle } from './obstacles/obstacle';
import { Vec2 } from '../physics/vec2';
import { IDrawable } from '../graphics/representations/drawable';

export class Goal extends Obstacle {
    constructor(initPosition: Vec2, representation: IDrawable) {
        super(initPosition, new Vec2(0, 0), representation, false);
    }
}