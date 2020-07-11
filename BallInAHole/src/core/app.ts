import { Renderer } from "./renderer";
import { EntitesManager } from "./entitesManager";
import { Physic } from "../math/physic";
import { Vector2 } from "../math/vector2";

export class App {

    readonly renderer: Renderer;
    readonly entitiesManager: EntitesManager;

    readonly restartButton = document.getElementById("RestartButton") as HTMLButtonElement;
    readonly gameEndBox = document.getElementById("GameEnd") as HTMLDivElement;
    readonly gameEndLabel = document.getElementById("GameEndLabel") as HTMLHeadingElement;

    private gameInProgress: boolean;

    constructor() {
        this.renderer = new Renderer();
        this.entitiesManager = new EntitesManager(20);

        this.restartButton.addEventListener('click', () => this.RestartGame());
        window.addEventListener('deviceorientation', (e) => this.AmendVelocity(e));
        this.StartGame();
    }

    StartGame(){
        this.entitiesManager.SpawnEntites(this.renderer.GetCanvasSize());
        window.requestAnimationFrame((t) => this.Update(t));

        this.gameInProgress = true;
        this.gameEndBox.hidden = true;
    }

    Update(timestamp: number){

        if(!this.gameInProgress) return;

        this.renderer.ClearRenderer();
        
        const player = this.entitiesManager.playerEntity;
        if(Physic.CheckCircleCollisionWithinBox(player, 
            player.GetVelocity(), this.renderer.GetCanvasSize())){
            if(this.entitiesManager.CheckCorrectCollision()){
                this.gameInProgress = false;

                this.gameEndLabel.innerText = "You Won!";
                this.gameEndBox.hidden = false;
            }
            else if(this.entitiesManager.CheckWrongCollision()){
                this.gameInProgress = false;

                this.gameEndLabel.innerText = "You Lost!";
                this.gameEndBox.hidden = false;
            }
            else{
                player.ApplyVelocity();
            }
        }
        else{
            player.SetVelocity();
        }

        this.renderer.RenderEntites(this.entitiesManager.allEntites);

        console.log(timestamp);
        window.requestAnimationFrame((t) => this.Update(t));
    }

    private RestartGame(){
        this.entitiesManager.DestroyEntities();
        this.StartGame();
    }

    private AmendVelocity(event: DeviceOrientationEvent){
        const player = this.entitiesManager.playerEntity;
        player.AmendVelocity(new Vector2(event.alpha, event.beta - 90));
    }
}