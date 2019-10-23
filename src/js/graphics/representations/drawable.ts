export interface IDrawable {
    draw(x: number, y: number, yInvertion: boolean): void;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
}