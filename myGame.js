alert('starting my game')
import 'phaser';
import config from './config/config';
import GameScene from './scenes/MainScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Game', GameScene);
    this.scene.start('Game');
  }
}

window.game = new Game();
