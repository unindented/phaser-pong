'use strict';

import Phaser from 'phaser';

const NORMAL_TEXT = 'PRESS ANY KEY';
const TOUCH_TEXT = 'TOUCH TO START';
const SIZE = 48;

const BLINK_PERIOD = Phaser.Timer.SECOND;
const BLINK_DELAY = Phaser.Timer.SECOND / 2;

export default class Subtitle extends Phaser.BitmapText {

  constructor(game, x, y) {
    super(game, x, y, 'pong', (game.device.touch ? TOUCH_TEXT : NORMAL_TEXT), SIZE);
    this.reposition();

    // Add blinking effect.
    this.alpha = 0;
    game.add.tween(this).to({alpha: 1},
      BLINK_PERIOD, Phaser.Easing.Cubic.InOut, true, BLINK_DELAY, -1, true);
  }

  reposition() {
    this.x = this.x - (this.width / 2);
    this.y = this.y - (this.height / 2);
  }

}
