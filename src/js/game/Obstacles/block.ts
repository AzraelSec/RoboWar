import { Obstacle } from './obstacle';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { Vec2 } from '../../physics/vec2';

export class Block extends Obstacle {
    constructor(initPosition: Vec2, representation: StaticSprite) {
        super(initPosition, Vec2.Zero(), representation, 0, false);
    }
}