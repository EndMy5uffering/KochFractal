export class Vector2{

    x: number
    y: number 

    constructor(x: number, y: number){
        this.x = x
        this.y = y
    }

    setX(x: number): void{
        this.x = x
    }

    setY(y: number): void{
        this.y = y
    }

    getX(): number{
        return this.x
    }

    getY(): number{
        return this.y
    }

    add(v: Vector2): Vector2{
        return new Vector2(this.x + v.getX(), this.y + v.getY())
    }

    sub(v: Vector2): Vector2{
        return new Vector2(this.x - v.getX(), this.y - v.getY())
    }

    scale(s: number): Vector2{
        return new Vector2(this.x * s, this.y * s)
    }

    norm(): Vector2{
        const len = this.getLength()
        return new Vector2(this.x / len, this.y / len)
    }

    getLength(): number{
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }


    getScalarProduct(v: Vector2): number{
        return (this.x * v.getX()) + (this.y * v.getY())
    }

    /**
     * Gets the angle between V(1, 0) and this
     */
    getAngle(): number{
        const len = this.getLength()
        return Math.acos(this.x/len)
    }

    rotateBy(angle_rad: number): Vector2{
        const a = angle_rad
        return new Vector2((this.x * Math.cos(a)) - (this.y * Math.sin(a)), (this.x * Math.sin(a)) + (this.y * Math.cos(a)))
    }

    addRotation(angle_rad: number): Vector2{
        const a = angle_rad + this.getAngle()
        return new Vector2((this.x * Math.cos(a)) - (this.y * Math.sin(a)), (this.x * Math.sin(a)) + (this.y * Math.cos(a)))
    }

    clone(): Vector2{
        return new Vector2(this.x, this.y)
    }

}