import { Entity } from "../entities/entity";
import { Vector2 } from "../math/vector2";

export class Renderer{

    readonly rendererCanvas = document.getElementById("MainCanvas") as HTMLCanvasElement;
    readonly rendererContext = this.rendererCanvas.getContext("2d") as CanvasRenderingContext2D;

    constructor(){
        this.ResizeRenderer();
        window.addEventListener('resize', () => this.ResizeRenderer());
    }

    GetCanvasSize(): Vector2{
        return new Vector2(this.rendererCanvas.width, this.rendererCanvas.height);
    }

    RenderEntites(entites: Entity[]){
        for (let i = 0; i < entites.length; i++){
            entites[i].DrawEntity(this.rendererContext);
        }
    }

    ClearRenderer(){
        this.rendererContext.clearRect(0, 0, this.rendererCanvas.width, this.rendererCanvas.height);
    }

    private ResizeRenderer(){
        this.rendererCanvas.height = window.innerHeight;
        this.rendererCanvas.width = window.innerWidth;
    }
}