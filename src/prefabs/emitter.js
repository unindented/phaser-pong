'use strict';

import Phaser from 'phaser';

const MAX_NUM = 45;
const EMIT_NUM = 15;

const LIFE_SPAN = Phaser.Timer.SECOND;
const FADE_RATE = Phaser.Timer.SECOND;

const SPEED_X = 100;
const SPEED_Y = 100;

export default class Emitter extends Phaser.Particles.Arcade.Emitter {

  constructor(game, x, y) {
    super(game, x, y, MAX_NUM);

    this.makeParticles('particles', [0, 1, 2, 3, 4]);

    this.gravity = 0;

    this.setAlpha(1, 0, FADE_RATE);
    this.setRotation(0, 0);
    this.setXSpeed(-SPEED_X, SPEED_X);
    this.setYSpeed(-SPEED_Y, SPEED_Y);
  }

  emit(x, y, sign) {
    // Set the position of the emitter...
    this.emitX = x;
    this.emitY = y;
    // ... and start emitting particles in the specified direction.
    this.setXSpeed(0, sign * SPEED_X);
    this.start(true, LIFE_SPAN, null, EMIT_NUM);
  }

}
