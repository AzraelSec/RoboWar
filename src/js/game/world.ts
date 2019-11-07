import { IDrawable } from './../graphics/representations/drawable';
import { Control } from './../graphics/controls/control';
import { GameObject } from './../physics/gameObject';
import { Vec2 } from "../physics/vec2";

export class World {
    public static FPS:number = 100;
    public static WORLD_WIDTH: number = 800;
    public static WORLD_HEIGHT: number = 450;

    public static VIEW_WIDTH: number = 0;
    public static VIEW_HEIGHT: number = 0;
    public static VIEW_RATION: number = 1;
    public static X_OFFSET: number = 0;
    public static Y_OFFSET: number = 0;

    public static worldToView(worldPointX: number, worldPointY: number): Vec2 {
        const deltaX: number = World.VIEW_WIDTH / World.WORLD_WIDTH;
        const deltaY: number = World.VIEW_HEIGHT / World.WORLD_HEIGHT;
        return new Vec2(worldPointX * deltaX, worldPointY * deltaY);
    }
    
    public static viewToWorld(viewPointX: number, viewPointY: number): Vec2 {        
        return new Vec2(viewPointX / World.VIEW_RATION - World.X_OFFSET, viewPointY / World.VIEW_RATION - World.Y_OFFSET);
    }

    public static verticalCenter(target: GameObject): number {
        return (World.VIEW_HEIGHT - target.height) * 0.5;
    }
    
    public static horizontalCenter(target: GameObject): number {
        return (World.VIEW_WIDTH - target.width) * 0.5;
    }

    public static alignRight(target: GameObject): number {
        return World.VIEW_WIDTH - target.width;
    }

    public static alignBottom(target: GameObject): number {
        return World.VIEW_HEIGHT - target.height;
    }
}