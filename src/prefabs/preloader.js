'use strict';

import Phaser from 'phaser';

export default class Preloader extends Phaser.Sprite {

  constructor(game, x, y, frame) {
    super(game, x, y, 'preloader', frame);
    this.reposition();

    this.anchor.setTo(0, 0.5);
  }

  reposition() {
    this.x = this.x - (this.width / 2);
  }

}
