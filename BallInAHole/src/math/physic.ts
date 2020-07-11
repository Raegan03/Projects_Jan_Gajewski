import { Circle } from "../entities/circle";
import { Vector2 } from "./vector2";

export module Physic{
    export function CheckCircleCollisionWithinBox(
        circle: Circle, 
        positionChange: Vector2, 
        canvasSize: Vector2): boolean{
        
        const position = circle.GetPosition();
        const radius = circle.GetRadius();

        return position.x + positionChange.x > 0 + radius &&
        position.x + positionChange.x < canvasSize.x - radius &&
        position.y + positionChange.y > 0 + radius &&
        position.y + positionChange.y < canvasSize.y - radius;
    }

    export function CheckCircleCollisionWithCircle(
        circle: Circle,
        collisionCircle: Circle
    ): boolean{

        const position = circle.GetPosition();
        const radius = circle.GetRadius();

        const collisionPosition = collisionCircle.GetPosition();
        const collisionRadius = collisionCircle.GetRadius();

        return Math.sqrt(Math.pow(position.x - collisionPosition.x, 2) + 
        Math.pow(position.y - collisionPosition.y, 2)) < radius + collisionRadius;
    }
}