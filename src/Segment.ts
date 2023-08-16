import { Canvas } from "./Canvas";
import { Vector2 } from "./Vector2";

export class Segment{

    p1: Vector2
    p2: Vector2
    constructor(p1: Vector2, p2: Vector2){
        this.p1 = p1
        this.p2 = p2
    }

    subdiv(): Segment[] {
        const s = new Array<Segment>();
        const v = this.p2.sub( this.p1 )
        const v2 = v.scale(1.0 / 3.0)
        const b1 = this.p1.add(v2)
        const a1 = this.p2.sub(v2)
        const vr = v2.rotateBy(-Math.PI / 3.0)
        const c = b1.add(vr)
        s.push(new Segment(this.p1, b1))
        s.push(new Segment(b1, c))
        s.push(new Segment(c, a1))
        s.push(new Segment(a1, this.p2))
        return s;
    }

    draw(canvas: Canvas){
        canvas.drawLine(this.p1.getX(), this.p1.getY(), this.p2.getX(), this.p2.getY(), 1, "white")
    }

}