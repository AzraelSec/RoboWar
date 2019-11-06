import { IDrawable } from './../graphics/representations/drawable';
import { Control } from './../graphics/controls/control';
import { GameObject } from './../physics/gameObject';
import { Vec2 } from "../physics/vec2";

export class World {
    public static FPS:number = 100;
    public static WORLD_WIDTH: number = 80;
    public static WORLD_HEIGHT: number = 45;

    public static VIEW_WIDTH: number = 0;
    public static VIEW_HEIGHT: number = 0;

    public static worldToView(worldPointX: number, worldPointY: number): Vec2 {
        const deltaX: number = World.VIEW_WIDTH / World.WORLD_WIDTH;
        const deltaY: number = World.VIEW_HEIGHT / World.WORLD_HEIGHT;
        return new Vec2(worldPointX * deltaX, worldPointY * deltaY);
    }

    public static worldToViewX(x: number): number {
        return x * World.VIEW_WIDTH / World.WORLD_WIDTH;
    }

    public static worldToViewY(y: number): number {
        return y * World.VIEW_HEIGHT / World.WORLD_HEIGHT;
    }
    
    public static viewToWorld(viewPointX: number, viewPointY: number): Vec2 {
        const deltaX: number = World.WORLD_WIDTH / World.VIEW_WIDTH;
        const deltaY: number = World.WORLD_HEIGHT / World.VIEW_HEIGHT;
        return new Vec2(viewPointX * deltaX, viewPointY * deltaY);
    }

    public static viewToWorldX(x: number): number {
        return x * World.WORLD_WIDTH / World.VIEW_WIDTH;
    }
    
    public static viewToWorldY(y: number): number {
        return y * World.VIEW_HEIGHT / World.WORLD_HEIGHT;
    }

    public static verticalCenter(target: IDrawable): number {
        return (World.VIEW_HEIGHT - target.height) * 0.5;
    }
    
    public static horizontalCenter(target: IDrawable): number {
        return (World.VIEW_WIDTH - target.width) * 0.5;
    }

    public static alignRight(target: IDrawable): number {
        return World.VIEW_WIDTH - target.width;
    }

    public static alignBottom(target: IDrawable): number {
        return World.VIEW_HEIGHT - target.height;
    }
}