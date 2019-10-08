export class Canvas {
    private _canvas:HTMLCanvasElement;
    private _context:CanvasRenderingContext2D;

    constructor(id:string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(id);
        this._context = this.canvas.getContext('2d');
        document.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();
    }

    public get canvas():HTMLCanvasElement {
        return this._canvas;
    }

    public clear() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
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