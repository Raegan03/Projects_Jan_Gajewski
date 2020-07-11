import { Circle } from "./circle";
import { Vector2 } from "../math/vector2";

export class PlayerCircle extends Circle{

    private velocity: Vector2;

    constructor(
        index: number,
        position: Vector2,
        radius: number,
        private speed: number){
        super(index, position, radius, 'Player');

        this.SetVelocity();
    }

    GetVelocity(): Vector2{
        return this.velocity;
    }

    AmendVelocity(velocityChange: Vector2){
        this.velocity.x += velocityChange.x * this.speed;
        this.velocity.y += velocityChange.y * this.speed;
    }

    SetVelocity(velocity = new Vector2(0, 0)){
        this.velocity = velocity;
    }

    ApplyVelocity(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}