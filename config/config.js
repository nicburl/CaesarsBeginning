let config =  {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 1920,
  physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 300}

        }
    },
  scene:[Stage1, Story1]
};
