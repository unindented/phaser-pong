'use strict';

import Phaser from 'phaser';

const TEXT = 'PONG';
const SIZE = 224;

export default class Title extends Phaser.BitmapText {

  constructor(game, x, y) {
    super(game, x, y, 'pong', TEXT, SIZE);
    this.reposition();
  }

  reposition (){
    this.x = this.x - (this.width / 2);
    this.y = this.y - (this.height / 2);
  }

}
