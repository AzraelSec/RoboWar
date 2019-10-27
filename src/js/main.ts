import { WinScene } from './game/gui/winScene';
import { GameOverScene } from './game/gui/gameOverScene';
import { PlayScene } from './game/gui/playScene';
import { SceneManager, SceneFrame } from './game/scene/sceneManager';
import { Scene, } from './game/scene/scene';
import { ResourceManager } from './graphics/resourceLoader';
import { Canvas } from './graphics/canvas'
import { StartScene } from './game/gui/startScene';

//Resource Targeting
const resourceManager = new ResourceManager([
    'player/idle', 'player/run', 'player/jump', 'player/dead', 'shot',
    'background', 'menu_background',
    'red_barrel', 'goal',
    'gui/play_button_1', 'gui/play_button_2', 'gui/start_button',
    'gui/menu_button_1', 'gui/menu_button_2',
    'gui/replay_button_1', 'gui/replay_button_2',
    'gui/time_background', 'block',
    'obstacles/bombs/one', 'obstacles/bombs/two'
]);

//Resource Prefetching
resourceManager.resourcesPrefetch().then(() => {
    console.log('Resource loaded');
    
    const canvas = new Canvas('scene');
    let sceneManager = new SceneManager();

    sceneManager.addScene(<SceneFrame> { 
        name: 'start', scene: new StartScene(document, canvas, resourceManager, sceneManager);
    }).addScene(<SceneFrame> {
        name: 'play', scene: new PlayScene(document, canvas, resourceManager, sceneManager);
    }).addScene(<SceneFrame> {
        name: 'gameover', scene: new GameOverScene(document, canvas, resourceManager, sceneManager);
    }).addScene(<SceneFrame> {
        name: 'win', scene: new WinScene(document, canvas, resourceManager, sceneManager);
    })

    sceneManager.setScene('start');
    sceneManager.start();
}).catch((e: Error) => alert(`Error during resources prefetching: ${e.stack}`));
