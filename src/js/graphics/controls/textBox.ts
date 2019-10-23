import { Background } from './../canvas';
import { Control } from './control';
import { Vec2 } from '../../physics/vec2';

export class TextControl extends Control {
    protected _font: string;
    protected _fontSize: number;
    protected _fontColor: string | CanvasGradient | CanvasPattern;
    protected _text: string;
    protected _align: CanvasTextAlign;
    protected _background: Background;

    constructor(context: CanvasRenderingContext2D, position: Vec2, width: number, height: number, text: string, background?: Background) {
        super(context, position, width, height);

        this._fontSize = 0;
        this._font = 'ethnocentricregular'
        this._text = text;
        this._fontColor = 'white';
        this._align = 'center';
        this._background = background || null;
        
        this.balanceTextSize();
    }
    
    public drawControl(): void {
        this._context.save();
        if(this._background !== null) {
            if(this._background instanceof HTMLImageElement)
            this._context.drawImage(this._background, this._position.x, this._position.y, this.width, this.height);
            else {
                this.context.fillStyle = this._background;
                this._context.fillRect(this._position.x, this._position.y, this.width, this.height);
            }
        }
        this.adjustEveryThing();
        this._context.fillText(this._text, this._position.x + this.width * 0.5, this._position.y + this.height * 0.5);
        this._context.restore();
    }
    
    public changeText(text: string): void {
        this._text = text;
        this.balanceTextSize();
    }

    public get align(): CanvasTextAlign {
        return this._align;
    }

    public get color(): string | CanvasGradient | CanvasPattern {
        return this._fontColor;
    }

    public set align(alignment: CanvasTextAlign) {
        this._align = alignment;
    }
    
    public set color(color: string | CanvasGradient | CanvasPattern) {
        this._fontColor = color;
    }
    
    private balanceTextSize(): void {
        let textSize: number = 0;
        this._context.font = `${textSize}pt ${this._font}`;
        
        let measuredWidth = this._context.measureText(this._text).width;
        while(measuredWidth < this._width) {
            textSize += 1;
            this._context.font = `${textSize}pt ${this._font}`;
            measuredWidth = this._context.measureText(this._text).width;
        }

        this._fontSize = textSize - 10;
        this._context.font = `${this._fontSize}pt ${this._font}`;
    }

    private adjustEveryThing(): void {
        this._context.fillStyle = this._fontColor;
        this._context.textAlign = this._align;
        this._context.textBaseline = "middle";
        this._context.font = `${this._fontSize}pt ${this._font}`;
    }
}