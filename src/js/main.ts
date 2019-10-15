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
    'idle', 
    'run',
    'background',
    'red_barrel',
    'jump'
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

    let player: Player = new Player(new Vec2(0, canvas.height - robotSprites.idling.height), robotSprites, lastUpdate, canvas.width, canvas.height);
    player.inputAttach(document);

    let barrel = new GameObject(new Vec2(0, 0), Vec2.Zero(), new StaticSprite(canvas.context, RM.getResource('red_barrel')), lastUpdate)

    objects.push(player);
    objects.push(barrel);

    requestAnimationFrame(step);
    function step(newTime) {
        if(newTime - lastUpdate > (1000 / GameObject.FPS)) {
            canvas.clear();
            for(let i = 0; i < objects.length; i++)
                objects[i].update(newTime);
            canvas.context.save();
            for(let i = 0; i < objects.length; i++)
                objects[i].drawObject();
            canvas.context.restore();
            lastUpdate = newTime;
        }
        requestAnimationFrame(step);
    }
}).catch((e) => alert(`Error during resources prefetching: ${e}`));
