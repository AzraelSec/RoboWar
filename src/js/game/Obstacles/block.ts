import { ResourceManager } from './../../graphics/resourceLoader';
import { Obstacle } from './obstacle';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { Vec2 } from '../../physics/vec2';

export class Block extends Obstacle {
    public static SCALE: number = 0.3;
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, Vec2.Zero(), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('block'), Block.SCALE);
    }
}

export class LongBlock extends Obstacle {
    public static SCALE: number = 0.6;
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, Vec2.Zero(), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('long_block'), LongBlock.SCALE);
    }
}

export class Box extends Obstacle {
    public static SCALE: number = 0.5;
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, Vec2.Zero(), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('box'), Box.SCALE);
    } 
}