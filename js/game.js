const config = {
    type: Phaser.AUTO,
    width: 750,
    height: 750,
    title: "Alien Genocider",
    parent: 'alien-genocider',
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneWin,
        SceneGameOver,
      ],
    physics: {
            default: 'arcade',
            arcade: {
                gravity: {x:0, y: 0 },
                debug: false
            }
        },
}

let game = new Phaser.Game(config);

let player
let cursors
let speed
let ACCLERATION = 600;
let DRAG = 400;
let MAXSPEED = 400;
let bank = 0;
let bullets
let lastFired=0
let time=0
let Alien1
let score = 0
let scoreText
let lives = 5
let livesText
let scores =[]
let scoresText
let bestscore = []
let bestScoreText