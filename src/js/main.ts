import { World } from './game/world';
import { EditorScene } from './game/gui/editorScene';
import { LevelsManager } from './game/level/levelManager';
import { WinScene } from './game/gui/winScene';
import { GameOverScene } from './game/gui/gameOverScene';
import { PlayScene } from './game/gui/playScene';
import { SceneManager, SceneFrame } from './game/scene/sceneManager';
import { ResourceManager } from './graphics/resourceLoader';
import { Canvas } from './graphics/canvas'
import { StartScene } from './game/gui/startScene';
import { JSONObjectType, LevelJSON } from './game/level/levelParser';
import defaultLevels from './game/gui/defaultLevels';

//Resource Targeting
const resourceManager = new ResourceManager([
    'player/idle', 'player/run', 'player/jump', 'player/dead', 'shot',
    'main_background', 'gui/menu_background',
    'red_barrel', 'goal',
    'gui/sound_button_1', 'gui/sound_button_2',
    'gui/menu_button_1', 'gui/menu_button_2',
    'gui/replay_button_1', 'gui/replay_button_2',
    'gui/time_background', 'block', 'long_block', 'box',
    'obstacles/bomb', 'obstacles/mine', 'obstacles/missile',
    'obstacles/bomb_static', 'obstacles/missile_static', 'player/player_static', 'obstacles/mine_static'
]);

//Resource Prefetching
resourceManager.resourcesPrefetch().then(() => {
    const canvas = new Canvas('scene');
    const sceneManager = new SceneManager();
    const levelManager = new LevelsManager(resourceManager);
    defaultLevels.forEach(level => levelManager.addLevel(<LevelJSON>level))

    sceneManager.addScene(<SceneFrame> { 
        name: 'start', scene: new StartScene(document, canvas, resourceManager, sceneManager)
    }).addScene(<SceneFrame> {
        name: 'play', scene: new PlayScene(document, canvas, resourceManager, sceneManager, levelManager)
    }).addScene(<SceneFrame> {
        name: 'gameover', scene: new GameOverScene(document, canvas, resourceManager, sceneManager)
    }).addScene(<SceneFrame> {
        name: 'win', scene: new WinScene(document, canvas, resourceManager, sceneManager)
    }).addScene(<SceneFrame> {
        name: 'editor', scene: new EditorScene(document, canvas, resourceManager, sceneManager, levelManager)
    });

    sceneManager.setScene('start');
    sceneManager.start();
}).catch((e: Error) => alert(`Error during resources prefetching: ${e.stack}`));
