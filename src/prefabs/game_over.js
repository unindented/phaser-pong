'use strict';

import Phaser from 'phaser';

const TEXT = 'GAME\nOVER';
const SIZE = 96;

export default class GameOver extends Phaser.BitmapText {

  constructor(game, x, y) {
    super(game, x, y, 'pong', TEXT, SIZE);
    this.reposition();

    this.align = 'center';
  }

  reposition() {
    this.x = this.x - (this.width / 2);
    this.y = this.y - (this.height / 2);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

}
