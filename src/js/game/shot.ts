import { ResourceManager } from './../graphics/resourceLoader';
import { Vec2 } from './../physics/vec2';
import { GameObject } from './../physics/gameObject';
import { StaticSprite } from '../graphics/representations/staticSprite';

export class Shot extends GameObject {
    constructor(initPosition: Vec2, resourceManager: ResourceManager, firstUpdate: number) {
        super(initPosition, new Vec2(1, 0), resourceManager, firstUpdate);
        this._image = new StaticSprite(resourceManager.getResource('shot'));
    }
}