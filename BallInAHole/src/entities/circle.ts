import { Entity } from "./entity";
import { Vector2 } from "../math/vector2";
import { CircleType } from "./circleType";

export class Circle extends Entity{

    constructor(
        index: number,
        position: Vector2,
        private radius: number,
        private circleType: CircleType
    ){
        super(index, position);
    }

    GetRadius(): number{
        return this.radius;
    }

    GetPosition(): Vector2{
        return this.position;
    }

    DrawEntity(context: CanvasRenderingContext2D){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.GetColour();
        context.fill();
        context.closePath
    }

    private GetColour(): string{
        switch(this.circleType)
        {
            case 'Player':
                return "#333";
            case 'WrongHole':
                return "#8B0000";
            case 'CorrectHole':
                return "#DAA520";
        }
    }
}