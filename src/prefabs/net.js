'use strict';

import Phaser from 'phaser';

export default class Net extends Phaser.Image {

  constructor(game, x, y, frame) {
    super(game, x, y, 'net', frame);

    this.anchor.setTo(0.5);

    // Deemphasize this object.
    this.alpha = 0.15;
  }

}
