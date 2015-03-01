'use strict';

import Phaser from 'phaser';
import GameOver from 'prefabs/game_over';
import Net from 'prefabs/net';
import Score from 'prefabs/score';
import Paddle from 'prefabs/paddle';
import Ball from 'prefabs/ball';

import {
  WIDTH,
  HEIGHT,
  COLOR_DEBUG,
  INPUT_LEFT_UP,
  INPUT_LEFT_DOWN,
  INPUT_RIGHT_UP,
  INPUT_RIGHT_DOWN,
  MAX_SCORE
} from 'constants';

const GAME_OVER_X = WIDTH / 2;
const GAME_OVER_Y = HEIGHT / 1.75;

const NET_X = WIDTH / 2;
const NET_Y = HEIGHT / 2;

const SCORE_X = WIDTH / 2 - 50;
const SCORE_Y = 25;

const PADDLE_X = 50;
const PADDLE_Y = HEIGHT / 2;

const BALL_X = WIDTH / 2;
const BALL_Y = HEIGHT / 2;

const QUIT_DELAY = Phaser.Timer.SECOND;

export default class Game {

  create() {
    // Start physics system.
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // We only want walls up and down, so that the ball can leave by the sides.
    this.physics.arcade.checkCollision.left = false;
    this.physics.arcade.checkCollision.right = false;

    // Game over sprite.
    this.gameOver = this.add.existing(new GameOver(this.game, GAME_OVER_X, GAME_OVER_Y));
    this.gameOver.hide();

    // Net image.
    this.add.existing(new Net(this.game, NET_X, NET_Y));

    // Score sprites.
    this.scores = {
      left:  this.add.existing(new Score(this.game, SCORE_X, SCORE_Y, 'right')),
      right: this.add.existing(new Score(this.game, WIDTH - SCORE_X, SCORE_Y, 'left'))
    };

    // Paddle sprites.
    this.paddles = {
      left:  this.add.existing(new Paddle(this.game, PADDLE_X, PADDLE_Y)),
      right: this.add.existing(new Paddle(this.game, WIDTH - PADDLE_X, PADDLE_Y))
    };

    // Ball sprite.
    this.ball = this.add.existing(new Ball(this.game, BALL_X, BALL_Y));
    this.ball.events.onOutOfBounds.add(this.onBallLost, this);
    this.ball.relaunch();

    // Input keys.
    this.keys = {
      left: {
        up:   this.input.keyboard.addKey(INPUT_LEFT_UP),
        down: this.input.keyboard.addKey(INPUT_LEFT_DOWN)
      },
      right: {
        up:   this.input.keyboard.addKey(INPUT_RIGHT_UP),
        down: this.input.keyboard.addKey(INPUT_RIGHT_DOWN)
      }
    };

    this.pointers = [
      this.input.pointer1,
      this.input.pointer2
    ];
  }

  render() {
    if (DEBUG) {
      this.game.debug.text(this.time.fps || '--', 2, 14, COLOR_DEBUG);
    }
  }

  update() {
    this.physics.arcade.collide(this.ball, this.paddles.left, this.onBallCollided, null, this);
    this.physics.arcade.collide(this.ball, this.paddles.right, this.onBallCollided, null, this);

    this.checkKeys();
    this.pointers.forEach(this.checkPointers, this);
  }

  checkKeys() {
    if (this.keys.left.up.isDown) {
      this.paddles.left.moveUp();
    }
    else if (this.keys.left.down.isDown) {
      this.paddles.left.moveDown();
    }

    if (this.keys.right.up.isDown) {
      this.paddles.right.moveUp();
    }
    else if (this.keys.right.down.isDown) {
      this.paddles.right.moveDown();
    }
  }

  checkPointers(pointer) {
    if (!pointer.active) {
      return;
    }

    if (pointer.position.x < (WIDTH / 2)) {
      this.paddles.left.moveTo(pointer.position.y);
    }
    else {
      this.paddles.right.moveTo(pointer.position.y);
    }
  }

  onBallCollided(ball, paddle) {
    ball.collide(paddle);
  }

  onBallLost() {
    let winner = (this.ball.x < (WIDTH / 2) ? 'right' : 'left');
    let loser = (winner === 'left' ? 'right' : 'left');

    let score = this.scores[winner].increment();
    if (score < MAX_SCORE) {
      this.ball.relaunch(loser);
    }
    else {
      this.ball.hide();
      this.gameOver.show();

      // Wait one sec before allowing the user to quit to the menu.
      this.time.events.add(QUIT_DELAY, this.listenToQuit.bind(this));
    }
  }

  listenToQuit() {
    // On key or pointer down, start game.
    this.input.keyboard.callbackContext = this;
    this.input.keyboard.onDownCallback = this.quitGame;
    this.input.onDown.addOnce(this.quitGame, this);
  }

  stopListeningToQuit() {
    this.input.onDown.remove(this.quitGame, this);
    this.input.keyboard.onDownCallback = null;
  }

  quitGame() {
    this.stopListeningToQuit();

    this.state.start('Menu');
  }

}
