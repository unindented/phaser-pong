'use strict';

import Preloader from 'prefabs/preloader';

import {
  WIDTH,
  HEIGHT
} from 'constants';

export default class Preload {

  preload() {
    let preloader = this.add.existing(new Preloader(this.game, WIDTH / 2, HEIGHT / 2));
    this.load.setPreloadSprite(preloader);

    this.load.image('net', require('graphics/net.png'));
    this.load.image('paddle', require('graphics/paddle.png'));
    this.load.image('ball', require('graphics/ball.png'));

    this.load.spritesheet('particles', require('graphics/particles.png'), 2, 2);

    this.load.bitmapFont('pong', require('fonts/pong.png'), require('fonts/pong.xml'));
  }

  create() {
    this.state.start('Menu');
  }

}
