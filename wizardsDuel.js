import { game, Sprite } from "./sgc/sgc.js";

game.setBackground("floor.png");


class playerWizard extends Sprite {
    constructor() {
        super();
        this.name = "Marcus the Wizard";
        this.width = 48;
        this.height = 48;
        this.setImage("marcusSheet.png");
        this.x = this.width;
        this.y = this.height;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("left", 9, 11);
        this.speedWhenWalking = 100;
        this.spellCastTime = 0;

    }
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }

    handleGameLoop() {
        this.y = Math.max(5, this.y); //Picks the greatest of 0, or the current value of y and assigns it to y
        this.y = Math.min(game.displayHeight - this.height, this.y); //Keeps Marcus in the display window
        this.x = Math.max(0, this.x);
        this.x = Math.min(game.displayWidth - this.width, this.x);
        this.speed = 0;
    }

    handleSpacebar() {
        let now = game.getTime(); // get the number of seconds since the game has started
        if (now - this.spellCastTime >= 2) {
            this.spellCastTime = now;
            let spell = new Spell();
            spell.name = "A spell from Marcus";
            spell.setImage("marcusSpellSheet.png");
            spell.x = this.x + this.width;
            spell.y = this.y;
            spell.angle = 0;
            this.playAnimation("right");
        }
    }



}

let marcus = new playerWizard();
marcus.name = "Marcus the Wizard";
marcus.setImage("marcusSheet.png");

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    handleBoundaryContact() {
        //Delete spell when it leaves the display area
        game.removeSprite(this);
    }

    handleCollision(otherSprite) {
        if (this.getImage() != otherSprite.getImage()) {
            let verticaloffset = Math.abs(this.y - otherSprite.y);
            if (verticaloffset < this.height / 2) {
                game.removeSprite(this);
                new Fireball(otherSprite);
            }
        }
        return false;
    }
}

class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The Mysterious Stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.speed = 150;
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("left", 9, 11);
        this.playAnimation("down", true);
    }
    handleGameLoop() {
        if (this.y <= 0) {

            // Upward motion has reached top, so turn down
            this.y = 0;
            this.angle = 270;
            this.playAnimation("down", true);
        }
        if (this.y >= game.displayHeight - this.height) {
            // Downward motion has reached bottom, so turn up
            this.y = game.displayHeight - this.height;
            this.angle = 90;
            this.playAnimation("up", true);
        }
        if (Math.random() < 0.01) {
            let spell = new Spell();
            spell.name = "A spell cast by the Stranger";
            spell.setImage("strangerSpellSheet.png");
            spell.x = this.x - this.width;
            spell.y = this.y;
            spell.angle = 180;
            this.playAnimation("left");
        }
    }
    handleAnimationEnd() {
        if (this.angle === 90) {
            this.playAnimation("up");
        }
        if (this.angle === 270) {
            this.playAnimation("down");
        }
    }

}

let stranger = new NonPlayerWizard();

class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.name = "A ball of fire";
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 15);
        this.playAnimation("explode");
    }
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated the mysterious" +
                "\nstranger in the dark cloak!");
        }
        if (!game.isActiveSprite(marcus)) {
            game.end("Marcus is defeated by the mysterious\nstranger in the dark cloak!\n\nBetter luck next time.");
        }
    }
}
