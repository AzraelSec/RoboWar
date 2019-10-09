import { PlayerStatesResources, Player, PlayerStates } from './game/player';
import { StaticSprite } from './graphics/staticSprite';
import { GameObject } from './physics/object';
import { Animation } from './graphics/animation';
import { ResourceManager } from './graphics/resourceLoader';
import { Canvas } from './graphics/canvas'
import { Vec2 } from './physics/vec2';


const RM = new ResourceManager([
    'idle', 
    'run',
    'background',
    'red_barrell'
]);

RM.resourcesPrefetch().then(() => {
    console.log('Resource loaded');
    
    const canvas = new Canvas('scene', RM.getResource('background'));

    let lastUpdate = 0;

    const robotSprites = new PlayerStatesResources(
        new Animation(canvas.context, RM.getResource('run'), 567, 8),
        new Animation(canvas.context, RM.getResource('idle'), 567, 8),
        new Animation(canvas.context, RM.getResource('run'), 567, 8)
    );


    let barrelImage = new StaticSprite(canvas.context, RM.getResource('red_barrell'), 0.7);

    let player:Player = new Player(Vec2.Zero(), robotSprites, lastUpdate);
    let barrell = new GameObject(new Vec2(200, 0), Vec2.Zero(), barrelImage, lastUpdate);
    requestAnimationFrame(step);
    function step(newTime) {
        if(newTime - lastUpdate > (1000 / GameObject.FPS)) {
            canvas.clear();
            player.update(newTime);
            canvas.context.save();
            canvas.context.translate(0, canvas.height);
            player.drawObject();
            barrell.drawObject();
            canvas.context.restore();
            lastUpdate = newTime;
        }
        requestAnimationFrame(step);
    }
}).catch((e) => alert(`Error during resources prefetching: ${e}`));
