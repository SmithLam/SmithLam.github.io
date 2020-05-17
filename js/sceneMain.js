class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }
    preload(){
        //load-space-background
        this.load.image('space', 'img/purple background.jpg');
    
        //load-player image
        this.load.spritesheet('player', 'img/shipsprite1.png',
        {frameWidth: 65, frameHeight: 60, frame:0}
        );  
    
        //load-bullet-image
        this.load.image('bullet', 'img/bullet.png');
    
        //load-enemy-image
        this.load.image('alien1', 'img/alien 3 40x40.png');
    
        //load-enemy-bullet
        this.load.image('enemy-bullet', 'img/enemy bullet.png')
    
        //load-explosion
        this.load.spritesheet('explosion', 'img/explosion.png',
        {frameWidth: 128, frameHeight: 128, frame:0}
        );  
       //sound
        this.load.audio("sndExplode0", "sound/Explosion-sound.mp3");
        this.load.audio("sndExplode1", "sound/Free-explosion-sound-effect.mp3");
        this.load.audio("sndLaser", "sound/Gunshot-sound.wav");
        this.load.audio("sndLaser2", "sound/sdnMachineGun.wav");
        //load button
        this.load.image("sprBtnPlay", "img/sprBtnPlay.png");

    }
    
    create(){
        //-create-space-background
        this.space = this.add.tileSprite(0,0, 1600, 1200, 'space');
        this.space.setOrigin(0,0);
        this.space.setScrollFactor(0);
    
    
    
        //-create-player-image
        player = this.physics.add.sprite(385, 520, 'player');
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);
        player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
        player.body.drag.setTo(DRAG, DRAG);
   

        // animation
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        });
        
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 15
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        });
    
        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 10,
            repeat: 0
          });
    
    
        //bullet
        let Bullet = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize:
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                this.speed = Phaser.Math.GetSpeed(500, 1);
            },
            fire: function (x, y)
            {
                this.setPosition(x, y - 45);
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.y -= this.speed * delta;
                if (this.y < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
    
        });
    
        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 15,
            runChildUpdate: true
        });
        //end bullet
    
        //enemy

        Alien1 = this.physics.add.group({
        key: 'alien1',
        repeat: 10,
        setXY: { x: 40, y: 25, stepX: 65 },
        collideWorldBounds:true,
        });


        Alien1.setOrigin(1,1)
        Alien1.children.iterate(function (child) {
        child.setVelocityY(Phaser.Math.Between(10, 50))
        });

        Phaser.Actions.Call(Alien1.getChildren(), function(alien1){
            alien1.body.onWorldBounds=true;
        })

        this.physics.world.on('worldbounds', onWorldBounds, this);

        
        //sound      
        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0"),
                this.sound.add("sndExplode1"),
            ],
            laser: this.sound.add("sndLaser2")
            };

        //collider
        this.physics.add.collider(player, Alien1, playerHitAlien, null, this)
        this.physics.add.overlap(Alien1, bullets, bulletHitAlien, null, this);



    
        //cursors
        cursors = this.input.keyboard.createCursorKeys();
        // enable this if you want WASD
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //score-and-text
        scoreText = this.add.text(25, 25, 'Score: 0', { fontSize: '32px', fill: '#F8F8FF' });

        livesText = this.add.text(550, 25, 'Lives: 5', { fontSize: '32px', fill: '#F8F8FF' });



        //game-over
    
    }
    //end create
    
    //begin update
    update(time, delta){
    
            //  Scroll the background
            this.space.tilePositionY += -4;
        
    
            //movement
                if (this.keyA.isDown)
            {
                player.body.acceleration.x = -ACCLERATION;
            
                player.anims.play('left', true);
            }
            else if (this.keyD.isDown)
            {
                player.body.acceleration.x = ACCLERATION;
            
                player.anims.play('right', true);
            }
            else if (this.keyW.isDown)
            {
                player.body.velocity.y = -300;
            
                player.anims.play('right', true);
            }
            else if (this.keyS.isDown)
            {
                player.body.velocity.y = 200;
            
                player.anims.play('right', true);
            }
            else
            {
                player.body.acceleration.x = 0;
    
                player.anims.play('idle');
         
            }

            //bank
            bank = player.body.velocity.x / MAXSPEED;
            // player.scale.x = 1 - (Math.abs(bank) / 2);
            player.angle = bank *5;
            Alien1.angle = bank*5
            
            if (cursors.up.isDown && time > lastFired)
            {
                var bullet = bullets.get();
        
                if (bullet)
                {
                    let x = (player.x) + ((Math.random()*15)+1);
                    bullet.fire(x, player.y);
                    bullet.angle = player.angle;
                    lastFired = time + 150;
                    this.sfx.laser.play();
        
                }
            }
            

        }
        //end update

    }

function bulletHitAlien (alien1, bullet){
    this.sfx.explosions[Phaser.Math.Between(0, this.sfx.explosions.length - 1)].play();
    score += 10
    scoreText.setText('Score: ' + score);
    alien1.disableBody(true, true);
    if (Alien1.countActive(true) === 0 && 0 <= score <= 300 )
    {
        Alien1.children.iterate(function (child) {
            
            child.enableBody(true, child.x, 25, true, true);
            child.setVelocityY(Phaser.Math.Between(20, 100 ))
      
      });
    }
    else if (Alien1.countActive(true) === 0 && 300 < score <= 500 )
    {
        Alien1.children.iterate(function (child) {
            
            child.enableBody(true, child.x, 25, true, true);
            child.setVelocityY(Phaser.Math.Between(100, 300 ))
      
      });
    }
    else if (Alien1.countActive(true) === 0 && 500 < score <= 1000)
    {
        Alien1.children.iterate(function (child) {
            
            child.enableBody(true, child.x, 25, true, true);
            child.setVelocityY(Phaser.Math.Between(200,400))
      
      });
    }
    else if (Alien1.countActive(true) === 0 && 1000 < score < 1500)
      {
          Alien1.children.iterate(function (child) {
              
              child.enableBody(true, child.x, 25, true, true);
              child.setVelocityY(Phaser.Math.Between(300,600))
        
        });
      }
    else if (Alien1.countActive(true) === 0)
      {
          Alien1.children.iterate(function (child) {
              
              child.enableBody(true, child.x, 25, true, true);
              child.setVelocityY(Phaser.Math.Between(300, 600 ))
        
        });
      }
        if (score === 1500)
        {
            scores.push(score)   
            this.scene.start('SceneWin')

    }
    
}

function playerHitAlien(player, alien1){
    lives -= 1
    livesText.setText('Lives: ' + lives);
    alien1.disableBody(true, true);
    if (Alien1.countActive(true) === 0)
    {
        Alien1.children.iterate(function (child) {
            
            child.enableBody(true, child.x, 25, true, true);
            child.setVelocityY(Phaser.Math.Between(20, 100 ))
      
      });
    }
    if (lives <= 0){
    scores.push(score)    
    this.scene.start('SceneGameOver')
    }
}

function onWorldBounds (body)
{
    scores.push(score)    
    let alien1 = body.gameObject;
    this.scene.start('SceneGameOver')
}










 





