'use strict';

import Phaser from 'phaser';

import {
  COLOR_BACK
} from 'constants';

export default class Boot {

  init() {
    this.stage.backgroundColor = COLOR_BACK;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.refresh();

    if (DEBUG) {
      this.time.advancedTiming = true;
    }
  }

  preload() {
    this.load.image('preloader', require('graphics/preloader.png'));
  }

  create() {
    this.state.start('Preload');
  }

}
