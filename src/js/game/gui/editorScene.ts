import { Goal } from './../goal';
import { SceneManager } from './../scene/sceneManager';
import { LevelsManager } from './../level/levelManager';
import { Bomb, Missile, Mine } from './../obstacles/obstacle';
import { Block, Box, LongBlock } from './../obstacles/block';
import { Player } from './../player';
import { InputHandlerTrack } from './../inputHandler';
import { World } from './../world';
import { TwoWayButton, ButtonResource, OneWayButton, TextButton } from './../../graphics/controls/button';
import { MenuControl } from '../../graphics/controls/menu';
import { JSONObjectType, LevelObjectJSON, LevelJSON } from './../level/levelParser';
import { ResourceManager } from './../../graphics/resourceLoader';
import { Graphics } from './../../graphics/canvas';
import { Scene } from './../scene/scene';
import { Vec2 } from '../../physics/vec2';
import { StaticSprite } from '../../graphics/representations/staticSprite';
import { JSONGameObject } from '../../physics/gameObject';

export class EditorScene extends Scene {
    private static _menuWidth: number = 150;
    protected _selectedObject: JSONObjectType;
    private _levelObjects: JSONGameObject[];
    private _objectsSprite: StaticSprite[];
    protected _levelsManager: LevelsManager;

    constructor(document: Document, canvas: Graphics, resourceManager: ResourceManager, sceneManager: SceneManager, levelsManager: LevelsManager) {
        const sprites: StaticSprite[] = [
            new StaticSprite(resourceManager.getResource('player_static'), Player.SCALE),
            new StaticSprite(resourceManager.getResource('missile_static'), Missile.SCALE),
            new StaticSprite(resourceManager.getResource('bomb_static'), Mine.SCALE),
            new StaticSprite(resourceManager.getResource('mine_static'), Mine.SCALE),
            new StaticSprite(resourceManager.getResource('block'), Block.SCALE),
            new StaticSprite(resourceManager.getResource('long_block'), LongBlock.SCALE),
            new StaticSprite(resourceManager.getResource('box'), Box.SCALE),
            new StaticSprite(resourceManager.getResource('goal'), Goal.SCALE)
        ];

        const menu: MenuControl = new MenuControl(new Vec2(0, 0), EditorScene._menuWidth, World.WORLD_HEIGHT, resourceManager, [
            /*new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.PLAYER], () => this._selectedObject = JSONObjectType.PLAYER
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.MISSILE], () => this._selectedObject = JSONObjectType.MISSILE
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.BOMB], () => this._selectedObject = JSONObjectType.BOMB
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.MINE], () => this._selectedObject = JSONObjectType.MINE
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.BLOCK], () => this._selectedObject = JSONObjectType.BLOCK
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.LONG_BLOCK], () => this._selectedObject = JSONObjectType.LONG_BLOCK
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.BOX], () => this._selectedObject = JSONObjectType.BOX
            ),
            new OneWayButton(
                Vec2.Zero(), sprites[JSONObjectType.GOAL], () => this._selectedObject = JSONObjectType.GOAL
            ),*/
        ])
        const buttonSprite: StaticSprite = new StaticSprite(resourceManager.getResource('time_background'), 0.5);
        super(document, canvas, resourceManager.getDrawable('main_background'), [
            menu,
            /*new TextButton(Vec2.Zero(), buttonSprite, 'Save', () => {
                levelsManager.addLevel(<LevelJSON> {
                    id: 1,
                    objects: this._levelObjects
                });
                this._levelObjects = [];
                sceneManager.setScene('start');
            }),
            new TextButton(new Vec2(buttonSprite.width, 0), buttonSprite, 'Back', () => {
                this._levelObjects = []
                sceneManager.setScene('start');
            })*/
        ]);

        this._selectedObject = null;
        this._levelObjects = [];
        this._objectsSprite = sprites;
        this._levelsManager = levelsManager;
    }

    public play(newTime: number): void {
        super.play(newTime);
        //for(let object of this._levelObjects)
            //this._canvas.context.drawImage(this._objectsSprite[object.type].spritesheet, object.position.x, object.position.y, this._objectsSprite[object.type].width, this._objectsSprite[object.type].height)
    }

    public initialize(): void {
        super.initialize();
        this._eventsListeners.push(<InputHandlerTrack> {
            type: 'mousedown', callback: this.addObject.bind(this)
        });
        window.addEventListener('mousedown', this.addObject.bind(this));
    }

    private addObject(event: MouseEvent): void {
        if(this._selectedObject !== null) {
            this._levelObjects.push(<LevelObjectJSON> {
                type: this._selectedObject,
                position: {
                    //x: event.clientX - this._objectsSprite[this._selectedObject].width * 0.5,
                    //y: event.clientY - this._objectsSprite[this._selectedObject].height * 0.5
                }
            });
            this._selectedObject = null;
        }
    }
}