export class World {
    public static WORLD_WIDTH: number = 16;
    public static WORLD_HEIGHT: number = 9;

    public static calcRatio(canvasWidth: number, canvasHeight: number): number {
        return Math.min(canvasWidth / World.WORLD_WIDTH, canvasHeight / World.WORLD_HEIGHT);
    }
}