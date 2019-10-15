import { StaticSprite } from '../../graphics/representations/staticSprite';
import { GameObject } from '../../physics/gameObject';
import { Vec2 } from '../../physics/vec2';

export class BarrelObstacle extends GameObject {
    constructor(initPosition: Vec2, representation: StaticSprite, firstUpdate: number) {
        super(initPosition, Vec2.Zero(), representation, firstUpdate);
    }
}