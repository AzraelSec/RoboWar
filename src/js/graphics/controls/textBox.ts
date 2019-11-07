import { World } from './../../game/world';
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

    constructor(position: Vec2, width: number, height: number, text: string, background?: Background) {
        super(position, width, height);

        this._fontSize = 0;
        this._font = 'ethnocentricregular'
        this._text = text;
        this._fontColor = 'white';
        this._align = 'center';
        this._background = background || null;
    }
    
    public drawControl(context: CanvasRenderingContext2D): void {
        context.save();
        this.balanceTextSize(context);
        if(this._background !== null) {
            if(this._background instanceof HTMLImageElement)
                context.drawImage(this._background, this._position.x, this._position.y, this._width, this._height);
            else {
                context.fillStyle = this._background;
                context.fillRect(this._position.x, this._position.y, this._width, this._height);
            }
        }
        
        this.adjustEveryThing(context);
        context.fillText(this._text, this._position.x + this._width * 0.5, this._position.y + this._height * 0.5);
        context.restore();
    }
    
    public changeText(text: string): void {
        this._text = text;
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
    
    private balanceTextSize(context: CanvasRenderingContext2D): void {
        let textSize: number = 0;
        context.font = `${textSize}pt ${this._font}`;
        
        let measuredWidth = context.measureText(this._text).width;
        while(measuredWidth < this._width) {
            textSize += 1;
            context.font = `${textSize}pt ${this._font}`;
            measuredWidth = context.measureText(this._text).width;
        }

        this._fontSize = textSize - 10;
        context.font = `${this._fontSize}pt ${this._font}`;
    }

    private adjustEveryThing(context: CanvasRenderingContext2D): void {
        context.fillStyle = this._fontColor;
        context.textAlign = this._align;
        context.textBaseline = "middle";
        context.font = `${this._fontSize}pt ${this._font}`;
    }
}