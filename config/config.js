let config =  {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 300}
        }
    },
  scene:[Stage1, Story1]
};
