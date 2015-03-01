'use strict';

import Phaser from 'phaser';

const SIZE = 64;

export default class Score extends Phaser.BitmapText {

  constructor(game, x, y, adjust) {
    this.initX = x;
    this.initY = y;
    this.adjust = adjust;
    this.value = 0;

    super(game, x, y, 'pong', '' + this.value, SIZE);
    this.reposition();

    // Deemphasize this object.
    this.alpha = 0.5;
  }

  increment() {
    this.text = '' + (++this.value);

    // Ensure text properties are updated internally...
    this.updateText();
    // ... and reposition, as BitmapText does not have an anchor.
    this.reposition();

    return this.value;
  }

  reposition() {
    let adjustment = this.adjust === 'center' ? this.width / 2 :
                     this.adjust === 'right' ? this.width :
                     0;

    this.position.set(this.initX - adjustment, this.initY);
  }

}
