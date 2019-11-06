import { SceneManager } from './../scene/sceneManager';
import { LevelsManager } from './../level/levelManager';
import { Bomb, Missile } from './../obstacles/obstacle';
import { Block, Box } from './../obstacles/block';
import { Player } from './../player';
import { InputHandlerTrack } from './../inputHandler';
import { World } from './../world';
import { TwoWayButton, ButtonResource, OneWayButton, TextButton } from './../../graphics/controls/button';
import { MenuControl } from '../../graphics/controls/menu';
import { JSONObjectType, LevelObjectJSON, LevelJSON } from './../level/levelParser';
import { ResourceManager } from './../../graphics/resourceLoader';
import { Canvas } from './../../graphics/canvas';
import { Scene } from './../scene/scene';
import { Vec2 } from '../../physics/vec2';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { JSONGameObject } from '../../physics/gameObject';
import { Level } from '../level/level';

export class EditorScene extends Scene {
    private static _menuWidth: number = 150;
    protected selectedObject: JSONObjectType;
    private levelObjects: JSONGameObject[];
    private objectsSprite: StaticSprite[];

    constructor(document: Document, canvas: Canvas, resourceManager: ResourceManager, sceneManager: SceneManager) {
        const sprites: StaticSprite[] = [
            new StaticSprite(resourceManager.getResource('missile_static')),
            new StaticSprite(resourceManager.getResource('bomb_static')),
            new StaticSprite(resourceManager.getResource('bomb_static')),
            new StaticSprite(resourceManager.getResource('block')),
            new StaticSprite(resourceManager.getResource('block')),
            new StaticSprite(resourceManager.getResource('box')),
            new StaticSprite(resourceManager.getResource('goal'))
        ];

        const menu: MenuControl = new MenuControl(new Vec2(World.VIEW_WIDTH - EditorScene._menuWidth, World.WORLD_HEIGHT + 50), EditorScene._menuWidth, World.VIEW_HEIGHT, resourceManager, [
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.MISSILE], () => {this.selectedObject = JSONObjectType.MISSILE;console.debug(JSON.stringify(this.selectedObject))}
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.BOMB], () => {this.selectedObject = JSONObjectType.BOMB; console.debug(JSON.stringify(this.selectedObject))}
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.BLOCK], () => {this.selectedObject = JSONObjectType.BLOCK; console.debug(JSON.stringify(this.selectedObject))}
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.BOX], () => {this.selectedObject = JSONObjectType.BOX; console.debug(JSON.stringify(this.selectedObject))}
            ),
        ] )
        super(document, canvas, resourceManager.getDrawable('main_background'), [
            menu,
            new TextButton(Vec2.Zero(), new StaticSprite(resourceManager.getResource('time_background')), 'Save', () => {
                localStorage.setItem('new', JSON.stringify(this.levelObjects));
                this.levelObjects = []
                sceneManager.setScene('start');
            })
        ]);

        this.selectedObject = null;
        this.levelObjects = [];
        this.objectsSprite = sprites;
    }

    public play(newTime: number): void {
        super.play(newTime);
        for(let object of this.levelObjects) {
            let scale = 1;
            if(object.type === JSONObjectType.BLOCK) scale = Block.SCALE;
            else if(object.type === JSONObjectType.BOX) scale = Box.SCALE;
            
            this._canvas.context.drawImage(this.objectsSprite[object.type].spritesheet, object.position.x, object.position.y, this.objectsSprite[object.type].width * scale, this.objectsSprite[object.type].height * scale)
        }
    }

    public initialize(): void {
        super.initialize();
        this._eventsListeners.push(<InputHandlerTrack> {
            type: 'mousedown', callback: this.addObject.bind(this)
        });
        document.addEventListener('mousedown', this.addObject.bind(this));
    }

    private addObject(event: MouseEvent): void {
        if(this.selectedObject !== null) {
            this.levelObjects.push(<LevelObjectJSON> {
                type: this.selectedObject,
                position: {
                    x: event.clientX,
                    y: event.clientY
                }
            });
            this.selectedObject = null;
        }
    }

}