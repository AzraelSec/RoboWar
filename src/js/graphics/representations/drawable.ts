export interface IDrawable {
    draw(context: CanvasRenderingContext2D, x: number, y: number, yInvertion: boolean): void;
    width: number;
    height: number;
}