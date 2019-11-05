import { Vec2 } from "../physics/vec2";

export class World {
    public static FPS:number = 100;
    public static WORLD_WIDTH: number = 16;
    public static WORLD_HEIGHT: number = 9;

    public static worldToView(point: Vec2): Vec2 {
        return Vec2.Zero();
    }
}