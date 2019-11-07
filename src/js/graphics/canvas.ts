import { World } from './../game/world';
export type Background = string | CanvasGradient | CanvasPattern | HTMLImageElement;

export class Graphics {
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
            this._context.fillRect(0, 0, World.WORLD_WIDTH, World.WORLD_HEIGHT);
        }
        else
            this._context.drawImage(color, 0, 0, World.WORLD_WIDTH, World.WORLD_HEIGHT);
        this._context.restore();
    }

    public get context() {
        return this._context;
    }

    private resizeCanvas() {
        this._canvas.height = World.VIEW_HEIGHT= window.innerHeight;
        this._canvas.width = World.VIEW_WIDTH = window.innerWidth;
        const deltaX: number = World.VIEW_WIDTH / World.WORLD_WIDTH;
        const deltaY: number = World.VIEW_HEIGHT / World.WORLD_HEIGHT;
        World.VIEW_RATION = Math.min(deltaX, deltaY);
    
        this._context.scale(World.VIEW_RATION, World.VIEW_RATION)
        const h = World.VIEW_HEIGHT / World.VIEW_RATION;
        const w = World.VIEW_WIDTH / World.VIEW_RATION;
        World.X_OFFSET = (w - World.WORLD_WIDTH) * 0.5;
        World.Y_OFFSET = (h - World.WORLD_HEIGHT) * 0.5;

        this._context.translate(World.X_OFFSET, World.Y_OFFSET);
    }

    public get height() {
        return this._canvas.height;
    }

    public get width() {
        return this._canvas.width;
    }
};