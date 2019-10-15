export interface IDrawable {
    draw(x: number, y: number, yInvertion: boolean): void;
    width: number;
    height: number;
}