import { Resource } from './resourceLoader';
export class Canvas {
    private static NCOL:number = 20;

    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;
    private _backgroundTile:CanvasPattern;

    constructor(id:string, backgroundTile:Resource) {
        this._canvas = <HTMLCanvasElement>document.getElementById(id);
        this._context = this.canvas.getContext('2d');
        this._backgroundTile = this._context.createPattern(backgroundTile.content, 'repeat');
        document.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();
    }

    public get canvas():HTMLCanvasElement {
        return this._canvas;
    }

    public clear() {
        this._context.save();
        this._context.fillStyle = this._backgroundTile;
        this.context.scale(0.5, 0.5);
        this._context.fillRect(0, 0, this._canvas.width * 2, this._canvas.height * 2);
        this._context.restore();
    }

    public get context() {
        return this._context;
    }

    private resizeCanvas() {
        this._canvas.height = innerHeight;
        this._canvas.width = innerWidth;
    }

    public get height() {
        return this._canvas.height;
    }

    public get width() {
        return this._canvas.width;
    }
};