export interface IDrawable {
    draw(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, yInvertion: boolean): void;
}