'use strict';

import Phaser from 'phaser';

import {
  HEIGHT
} from 'constants';

const SPEED = 5;

export default class Paddle extends Phaser.Sprite {

  constructor(game, x, y, frame) {
    super(game, x, y, 'paddle', frame);
    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);

    // The paddle is not affected by the impact of the ball.
    this.body.immovable = true;
  }

  clampVertical(y) {
    return Phaser.Math.clamp(y, this.height / 2, HEIGHT - this.height / 2);
  }

  moveUp() {
    this.y = this.clampVertical(this.y - SPEED);
  }

  moveDown() {
    this.y = this.clampVertical(this.y + SPEED);
  }

  moveTo(y) {
    this.y = this.clampVertical(y);
  }

}
