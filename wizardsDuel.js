import {game, Sprite} from "./sgc/sgc.js";

game.setBackground ("floor.png");


class playerWizard extends Sprite {
    constructor(){
        super();
        this.name = "Marcus the Wizard";
        this.width = 48;
        this.height = 48;
        this.setImage ("marcusSheet.png");
        this.x = this.width;
        this.y = this.y;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("left", 9, 11);
        this.speedWhenWalking = 100;
      
    }
    handleDownArrowKey(){
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
    handleUpArrowKey(){
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    handleRightArrowKey(){
        this.playAnimation("right");
        this.speed = this.speedWhenWalking;
        this.angle = 360;
    }
    handleLeftArrowKey(){
        this.playAnimation("left");
        this.speed = this.speedWhenWalking;
        this.angle = 180;
    }

       handleGameLoop(){
        this.y = Math.max(5, this.y);     //Picks the greatest of 0, or the current value of y and assigns it to y
        this.y = Math.min(game.displayHeight - this.height, this.y);  //Keeps Marcus in the display window
        this.speed = 0;
    }

}

let marcus = new playerWizard();
marcus.name = "Marcus the Wizard";
marcus.width = 48;
marcus.height = 48;
marcus.setImage("marcusSheet.png");
marcus.x = this.width;
marcus.y = this.y;

class Spell extends Sprite{
    constructor(){
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }

}

class spell extends Spell{
    constructor(){
        this.name = "A spell cast by Marcus";
        this.setImage("marcusSpellSheet.png");
        this.angle = 0;
    }
    handleSpaceBar(){
        this.angle = 0;
        this.playAnimation("magic");
    }
}
