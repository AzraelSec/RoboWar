import { Control } from './control';
import { Vec2 } from '../../physics/vec2';

export class TextControl extends Control {
    protected _font: string;
    protected _fontSize: number;
    protected _text: string;
    protected _context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D, position: Vec2, width: number, height: number, text: string) {
        super(position, width, height);
        this._context = context;

        this._fontSize = 300;
        this._font = 'Lucida Console'
        this._text = text;
        
        this.balanceTextSize();
    }
    
    public drawControl(): void {
        this._context.save();
        this._context.fillStyle = 'black';
        this._context.textAlign = 'center';
        this._context.fillText(this._text, this._position.x + this.width * 0.5, this._position.y + this.height * 0.5);
        this._context.restore();
    }

    public changeText(text: string): void {
        this._text = text;
        this.balanceTextSize();
    }

    private balanceTextSize(): void {
        let textSize: number = 0;
        this._context.font = `${textSize}pt ${this._font}`;
        
        let measuredWidth = this._context.measureText(this._text).width;
        while(measuredWidth < this.width) {
            textSize += 1;
            this._context.font = `${textSize}pt ${this._font}`;
            measuredWidth = this._context.measureText(this._text).width;
        }

        console.debug(`font size: ${textSize}`)
        this._fontSize = textSize - 1;
        this._context.font = `${this._fontSize}pt ${this._font}`;
    }
}