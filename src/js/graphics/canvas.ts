import { World } from './../game/world';
export type Background = string | CanvasGradient | CanvasPattern | HTMLImageElement;

export class Canvas {
    private static NCOL:number = 20;

    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;

    constructor(id:string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(id);
        this._context = this.canvas.getContext('2d');
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
    }

    public get canvas():HTMLCanvasElement {
        return this._canvas;
    }

    public clear(color: Background) {
        this._context.save();
        if(!(color instanceof HTMLImageElement)) {
            this._context.fillStyle = color;
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        }
        else
            this._context.drawImage(color, 0, 0, this._canvas.width, this._canvas.height);
        this._context.restore();
    }

    public get context() {
        return this._context;
    }

    private resizeCanvas() {
        this._canvas.height = World.VIEW_HEIGHT= innerHeight;
        this._canvas.width = World.VIEW_WIDTH = innerWidth;
    }

    public get height() {
        return this._canvas.height;
    }

    public get width() {
        return this._canvas.width;
    }
};