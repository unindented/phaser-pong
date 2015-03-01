'use strict';

import Phaser from 'phaser';
import Boot from 'states/boot';
import Preload from 'states/preload';
import Menu from 'states/menu';
import Game from 'states/game';

import {
  WIDTH,
  HEIGHT,
  CONTAINER
} from 'constants';

require('templates/index.html.ejs');

let game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, CONTAINER, null, false, false);

game.state.add('Boot', Boot);
game.state.add('Preload', Preload);
game.state.add('Menu', Menu);
game.state.add('Game', Game);

game.state.start('Boot');
