import { GameObject } from './physics/object';
import { Animation } from './graphics/animation';
import { ResourceManager } from './graphics/resourceLoader';
import { Canvas } from './graphics/canvas'
import { Vec2 } from './physics/vec2';


const RM = new ResourceManager([
    'idle', 
    'run',
    'background'
]);

RM.resourcesPrefetch().then(() => {
    console.log('Resource loaded');
    
    const canvas = new Canvas('scene', RM.getResource('background'));

    var lastUpdate = 0;
    var robotAnimation = new Animation(canvas.context, RM.getResource('run'), 567, 556, 8);
    var player = new GameObject(new Vec2(0, 0), Vec2.Zero(), robotAnimation, lastUpdate);
    requestAnimationFrame(step);
    function step(newTime) {
        if(player.getVelocity().x == 0)
        if(newTime - lastUpdate > (1000 / GameObject.FPS)) {
            canvas.clear();
            player.update(newTime);
            canvas.context.save();
            canvas.context.translate(0, canvas.height);
            player.drawObject();
            canvas.context.restore();
            lastUpdate = newTime;
        }
        requestAnimationFrame(step);
    }
}).catch((e) => alert(`Error during resources prefetching: ${e}`));
