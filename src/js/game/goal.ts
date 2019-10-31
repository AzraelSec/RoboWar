import { ResourceManager } from './../graphics/resourceLoader';
import { Obstacle } from './obstacles/obstacle';
import { Vec2 } from '../physics/vec2';
import { StaticSprite } from '../graphics/representations/staticSprite';

export class Goal extends Obstacle {
    constructor(initPosition: Vec2, resourceManager: ResourceManager) {
        super(initPosition, new Vec2(0, 0), resourceManager, false);
        this._image = new StaticSprite(resourceManager.getResource('goal'), 0.3);
    }

    public get width() {
        return this._image.width * 0.5;
    }

    public get height() {
        return this._image.height * 0.5;
    }
}