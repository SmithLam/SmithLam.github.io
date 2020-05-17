class SceneWin extends Phaser.Scene {
    constructor() {
      super({ key: "SceneWin" });
    }
    
    preload(){
        //load-space-background
        this.load.image('space', 'img/purple background.jpg');

        //load-player image
        this.load.spritesheet('player', 'img/shipsprite1.png',
            {frameWidth: 65, frameHeight: 60, frame:0}
            );  
        
            this.load.image("sprBtnRestart", "img/sprBtnRestart.png");
            this.load.image("sprBtnRestartHover", "img/sprBtnRestartHover.png");
            this.load.image("sprBtnRestartDown", "img/sprBtnRestartDown.png");
            
            this.load.audio("sndBtnOver", "sound/sndBtnOver.wav");
            this.load.audio("sndBtnDown", "sound/sndBtnDown.wav");
            this.load.audio("sndLaser", "sound/Gunshot-sound.wav");
            this.load.audio("sndExplode0", "sound/Explosion-sound.mp3");
            this.load.audio("sndExplode1", "sound/Free-explosion-sound-effect.mp3");
    
    }

    create() {
        //-create-space-background
        this.space = this.add.tileSprite(0,0, 1600, 1200, 'space');
        this.space.setOrigin(0,0);
        this.space.setScrollFactor(0);
  
      player = this.physics.add.sprite(385, 520,  'player');

      this.sfx = {
        btnOver: this.sound.add("sndBtnOver"),
        btnDown: this.sound.add("sndBtnDown"),
        laser: this.sound.add("sndLaser"),
        explosions: this.sound.add("sndExplode0"),
      };

      this.title = this.add.text(this.game.config.width * 0.3, 128, "YOU WIN", {
        fontFamily: 'Verdana',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#FF0000',
        align: 'center'
      });

      this.text = this.add.text(this.game.config.width * 0.3, 225, "The Earth is saved!", {
        fontFamily: 'Courier New',
        fontSize: 24,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });


      this.btnRestart = this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.75,
        "sprBtnRestart"
      );

      this.btnRestart.setInteractive();
      this.btnRestart.on("pointerover", function() {
        this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      }, this);
      this.btnRestart.on("pointerout", function() {
        this.setTexture("sprBtnRestart");
      });
      this.btnRestart.on("pointerdown", function() {
        this.btnRestart.setTexture("sprBtnRestartDown");
        this.lives
        this.scene.start("SceneMain");
        this.sfx.laser.play();
      }, this);
      
      this.btnRestart.on("pointerup", function() {
        this.setTexture("sprBtnRestart");
        this.sfx.laser.play();
      }, this);


      //scores
      scoresText = this.add.text(this.game.config.width * 0.3, 325, 'Score: 0', { fontSize: '32px', fill: '#F8F8FF' });

      bestScoreText = this.add.text(this.game.config.width * 0.3, 425, 'Best Score: 0', { fontSize: '32px', fill: '#F8F8FF' });


    }

    update(){ 
      
      //  Scroll the background
      this.space.tilePositionY += -4;
    
      lives = 5
    
      scoresText.setText('Score: ' + scores[scores.length-1]);
      bestScoreText.setText('Best Score: ' + Math.max.apply(Math, scores));
      score = 0



      }
    


  }