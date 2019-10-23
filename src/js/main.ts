import { PlayScene } from './game/gui/playScene';
import { TextControl } from './graphics/controls/textBox';
import { SceneManager, SceneFrame } from './game/scene/sceneManager';
import { Scene, } from './game/scene/scene';
import { ButtonResource, TwoWayButton } from './graphics/controls/button';
import { OneShotAnimation } from './graphics/representations/oneShotAnimation';
import { PlayerStatesResources, Player } from './game/player';
import { StaticSprite } from './graphics/representations/staticSprite';
import { Animation } from './graphics/representations/animation';
import { ResourceManager } from './graphics/resourceLoader';
import { Canvas } from './graphics/canvas'
import { Vec2 } from './physics/vec2';
import { StartScene } from './game/gui/startScene';

//Resource Targeting
const resourceManager = new ResourceManager([
    'player/idle', 'player/run', 'player/jump',
    'background', 'menu_background',
    'red_barrel',
    'gui/play_button_1', 'gui/play_button_2', 'gui/start_button',
]);

//Resource Prefetching
resourceManager.resourcesPrefetch().then(() => {
    console.log('Resource loaded');
    
    const canvas = new Canvas('scene');
    let sceneManager = new SceneManager();

    let start: Scene = new StartScene(document, canvas, resourceManager, sceneManager);
    let gameScene: Scene = new PlayScene(document, canvas, resourceManager, sceneManager);

    sceneManager.addScene(<SceneFrame> { 
        name: 'start', scene: start
    }).addScene(<SceneFrame> {
        name: 'play', scene: gameScene
    });

    sceneManager.setScene('start');
    sceneManager.start();
}).catch((e: Error) => alert(`Error during resources prefetching: ${e.stack}`));
