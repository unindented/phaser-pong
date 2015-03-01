'use strict';

import Phaser from 'phaser';
import Title from 'prefabs/title';
import Subtitle from 'prefabs/subtitle';

import {
  WIDTH,
  HEIGHT
} from 'constants';

const TITLE_X = WIDTH / 2;
const TITLE_Y = HEIGHT / 2.5;

const SUBTITLE_X = WIDTH / 2;
const SUBTITLE_Y = HEIGHT / 1.25;

const START_DELAY = Phaser.Timer.SECOND;

export default class Menu {

  create() {
    this.add.existing(new Title(this.game, TITLE_X, TITLE_Y));
    this.add.existing(new Subtitle(this.game, SUBTITLE_X, SUBTITLE_Y));

    // Wait one sec before allowing the user to start the game.
    this.time.events.add(START_DELAY, this.listenToStart.bind(this));
  }

  listenToStart() {
    // On key or pointer down, start game.
    this.input.keyboard.callbackContext = this;
    this.input.keyboard.onDownCallback = this.startGame;
    this.input.onDown.add(this.startGame, this);
  }

  stopListeningToStart() {
    this.input.onDown.remove(this.startGame, this);
    this.input.keyboard.onDownCallback = null;
  }

  startGame() {
    this.stopListeningToStart();

    this.state.start('Game');
  }

}
