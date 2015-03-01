'use strict';

import Phaser from 'phaser';

const INIT_ANGLE = 90;
const INIT_SPEED = 200;
const MAX_SPEED = 1000;
const INC_SPEED = 1.15;
const DAMPEN_DEVIATION = 0.25;

const LAUNCH_DELAY = Phaser.Timer.SECOND;

export default class Ball extends Phaser.Sprite {

  constructor(game, x, y) {
    this.initX = x;
    this.initY = y;

    super(game, x, y, 'ball');
    game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);

    // We want to accelerate the ball when it hits the paddles, but we don't
    // want it to go too fast.
    this.body.maxVelocity.copyFrom(new Phaser.Point(MAX_SPEED, 0));

    // The ball doesn't lose energy when bouncing.
    this.body.bounce.setTo(1);

    // The ball collides with the world bounds.
    this.body.collideWorldBounds = true;
    this.checkWorldBounds = true;
  }

  launch(target) {
    let direction = (target === 'left' ? 180 : 0);
    let angle = (Math.random() * INIT_ANGLE) - (INIT_ANGLE / 2);

    // Launch the ball in the specified direction, with a random angle.
    let initialVelocity = new Phaser.Point(INIT_SPEED, 0);
    initialVelocity.rotate(0, 0, direction + angle, true);
    this.body.velocity.copyFrom(initialVelocity);
  }

  relaunch(target) {
    // Reset the ball to its initial position...
    this.reset(this.initX, this.initY);
    // ... and launch it after a delay.
    this.game.time.events.add(LAUNCH_DELAY, this.launch.bind(this, target));
  }

  collide(paddle) {
    let angle = Phaser.Math.angleBetweenPoints(this.position, paddle.position);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let sign = Phaser.Math.sign(cos);
    let deviation = sign * sin * DAMPEN_DEVIATION;
    let speed = this.body.velocity.getMagnitude() * INC_SPEED;

    // The ball will be rotated in one direction or the other, depending on
    // where it hit the paddle...
    this.body.velocity.rotate(0, 0, deviation);
    // ... and it will accelerate slightly.
    this.body.velocity.setMagnitude(speed);
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

}
