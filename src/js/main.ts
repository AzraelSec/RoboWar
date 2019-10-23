import { TextControl } from './graphics/controls/textBox';
import { SceneManager, SceneFrame } from './game/scene/sceneManager';
import { Scene, } from './game/scene/scene';
import { ButtonResource, Button } from './graphics/controls/button';
import { OneShotAnimation } from './graphics/representations/oneShotAnimation';
import { PlayerStatesResources, Player } from './game/player';
import { StaticSprite } from './graphics/representations/staticSprite';
import { Animation } from './graphics/representations/animation';
import { ResourceManager } from './graphics/resourceLoader';
import { Canvas } from './graphics/canvas'
import { Vec2 } from './physics/vec2';

//Resource Targeting
const RM = new ResourceManager([
    'idle', 'run', 'jump',
    'background',
    'red_barrel',
    'play_button_1', 'play_button_2',
]);

//Resource Prefetching
RM.resourcesPrefetch().then(() => {
    console.log('Resource loaded');
    
    const canvas = new Canvas('scene');
    let sm = new SceneManager();

    const robotSprites = new PlayerStatesResources(
        new Animation(canvas.context, RM.getResource('run'), 9),
        new Animation(canvas.context, RM.getResource('idle'), 9),
        new OneShotAnimation(canvas.context, RM.getResource('jump'), 9)
    );

    const buttonSprites = <ButtonResource> {
        normal: new StaticSprite(canvas.context, RM.getResource('play_button_1')),
        pressed: new StaticSprite(canvas.context, RM.getResource('play_button_2'))
    };

    let player: Player = new Player(new Vec2(200, 200)/*new Vec2(0, canvas.height - robotSprites.idling.height)*/, robotSprites, 0, canvas.width, canvas.height);

    let button = new Button(new Vec2(200, 200), buttonSprites, () => {
        sm.setScene('play');
    });

    let text = new TextControl(canvas.context, new Vec2(0, 0), 500, 150, 'PRovaaaaaa');

    let menu: Scene = new Scene(document, canvas, '#469969' , [button, text])
    let gameScene: Scene = new Scene(document, canvas, '#202d42', [player]);

    sm.addScene(<SceneFrame> { 
        name: 'menu', scene: menu
    }).addScene(<SceneFrame> {
        name: 'play', scene: gameScene
    });

    sm.setScene('menu');
    sm.start();
}).catch((e) => alert(`Error during resources prefetching: ${e}`));
