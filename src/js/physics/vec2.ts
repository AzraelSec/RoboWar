export class Vec2 {
    private _x: number;
    private _y: number;

    constructor(x:number, y:number) {
        this._x = x || 0
        this._y = y || 0;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    static Zero() {
        return new Vec2(0, 0);
    }
};