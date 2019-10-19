import { Scene } from './game/scene';
import { ButtonResource, Button } from './game/button';
import { OneShotAnimation } from './graphics/representations/oneShotAnimation';
import { PlayerStatesResources, Player } from './game/player';
import { StaticSprite } from './graphics/representations/staticSprite';
import { GameObject } from './physics/gameObject';
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
    
    const canvas = new Canvas('scene', RM.getResource('background'));
    let lastUpdate = 0;
    const objects: GameObject[] = [];

    const robotSprites = new PlayerStatesResources(
        new Animation(canvas.context, RM.getResource('run'), 9),
        new Animation(canvas.context, RM.getResource('idle'), 9),
        new OneShotAnimation(canvas.context, RM.getResource('jump'), 9)
    );

    const buttonSprites = <ButtonResource> {
        normal: new StaticSprite(canvas.context, RM.getResource('play_button_1')),
        pressed: new StaticSprite(canvas.context, RM.getResource('play_button_2'))
    };

    let player: Player = new Player(new Vec2(0, canvas.height - robotSprites.idling.height), robotSprites, lastUpdate, canvas.width, canvas.height);
    player.inputAttach(document);

    let button = new Button(new Vec2(200, 200), buttonSprites, 0, () => alert('Button Pressed!'));
    button.inputAttach(document);

    objects.push(player);
    objects.push(button);

    let testScene: Scene = new Scene(canvas, objects);

    const testSer = JSON.stringify(testScene);
    let copyScene: Scene = JSON.parse(testSer);

    requestAnimationFrame(step);
    function step(newTime) {
        copyScene.play(newTime);
        requestAnimationFrame(step);
    }
}).catch((e) => alert(`Error during resources prefetching: ${e}`));
