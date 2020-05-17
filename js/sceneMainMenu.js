class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }
  
    preload(){
        //btn-image
        this.load.image("sprBtnPlay", "img/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "img/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "img/sprBtnPlayDown.png");

        //audio
        this.load.audio("sndBtnOver", "sound/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "sound/sndBtnDown.wav");
        this.load.audio("sndLaser", "sound/Gunshot-sound.wav");
        this.load.audio("sndExplode0", "sound/Explosion-sound.mp3");
        this.load.audio("sndExplode1", "sound/Free-explosion-sound-effect.mp3");

        //load-space-background
        this.load.image('space', 'img/purple background.jpg');

        //load-player image
        this.load.spritesheet('player', 'img/shipsprite1.png',
            {frameWidth: 65, frameHeight: 60, frame:0}
            );  
  
        
    }

    //begin create
    create() {

      //-create-space-background
        this.space = this.add.tileSprite(0,0, 1600, 1200, 'space');
        this.space.setOrigin(0,0);
        this.space.setScrollFactor(0);
      
      //player
      player = this.physics.add.sprite(385, 520, 'player');

      this.sfx = {
        btnOver: this.sound.add("sndBtnOver"),
        btnDown: this.sound.add("sndBtnDown"),
        laser: this.sound.add("sndLaser"),
        explosions: this.sound.add("sndExplode0"),
      };


      this.title = this.add.text(this.game.config.width * 0.2, 128, "ALIEN GENOCIDER", {
        fontFamily: 'Verdana',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#FF0000',
        align: 'center'
      });

      this.text = this.add.text(this.game.config.width * 0.15, 225, "Space Aliens are coming for your Planet,", {
        fontFamily: 'Courier New',
        fontSize: 24,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });

      this.text = this.add.text(this.game.config.width * 0.16, 300, "And you are all out of Bubblegum!", {
        fontFamily: 'Courier New',
        fontSize: 24,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });

      this.btnPlay = this.add.sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.75,
        "sprBtnPlay"
      );

      this.btnPlay.setInteractive();
      this.btnPlay.on("pointerover", function() {
        this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      }, this);
      this.btnPlay.on("pointerout", function() {
        this.setTexture("sprBtnPlay");
      });
      this.btnPlay.on("pointerdown", function() {
        this.btnPlay.setTexture("sprBtnPlayDown");
        this.scene.start("SceneMain");
        this.sfx.laser.play();
      }, this);
      
      this.btnPlay.on("pointerup", function() {
        this.setTexture("sprBtnPlay");
        this.sfx.laser.play();
      }, this);

    }

    update(){ 
      
  //  Scroll the background
  this.space.tilePositionY += -4;


  }


  }