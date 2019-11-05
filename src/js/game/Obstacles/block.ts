import { ResourceManager } from './../../graphics/resourceLoader';
import { Obstacle } from './obstacle';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { Vec2 } from '../../physics/vec2';

export class Block extends Obstacle {
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, Vec2.Zero(), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('block'), 0.3);
    }
}

export class LongBlock extends Obstacle {
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, Vec2.Zero(), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('long_block'), 0.6);
    }
}

export class Box extends Obstacle {
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, Vec2.Zero(), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('box'), 0.5);
    } 
}