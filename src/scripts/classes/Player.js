const DIRECTIONS = Object.freeze({ BACKWARDS: -1, NONE: 0, FORWARD: 1 });
const TURN = Object.freeze({ LEFT: -1, NONE: 0, RIGHT: 1 });
const SPEED = 10;
const ACCELERATION = 0.5;

export default class Player {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        const position = this.map.getPlayerPosition();
        this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', 'car_blue_1');
        this.car.setFixedRotation(true);
        this._velocity = 0;
        this.checkpoint = 0;
        this.laps = 0;
    }

    get direction() {
        let direction = DIRECTIONS.NONE;
        const cursors = this.scene.cursors;

        if (cursors.up.isDown) {
            direction = DIRECTIONS.FORWARD;
        }
        if (cursors.down.isDown) {
            direction = DIRECTIONS.BACKWARDS;
        }

        return direction
    }

    get velocity() {
        const speed = Math.abs(this._velocity);
        const max = this.getMaxSpeed();

        if (this.direction && speed < max) {
            this._velocity += ACCELERATION * Math.sign(this.direction);
        }
        if ((this.direction && speed > max) || (!this.direction && speed > 0)) {
            this._velocity -= ACCELERATION * Math.sign(this._velocity);
        }


        return this._velocity;
    }

    getMaxSpeed() {
        return SPEED * this.map.getTileFriction(this.car)
    }

    getVelocityFromAngle() {
        const vec2 = new Phaser.Math.Vector2();
        return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
    }

    get turn() {
        let turn = TURN.NONE;
        const cursors = this.scene.cursors;

        if (cursors.left.isDown) {
            turn = TURN.LEFT;
        }
        if (cursors.right.isDown) {
            turn = TURN.RIGHT;
        }

        return turn
    }

    get angle() {
        return this.car.angle + this.turn * SPEED / 2;
    }

    move() {
        const velocity = this.getVelocityFromAngle();
        this.car.setAngle(this.angle);
        this.car.setVelocity(velocity.x, velocity.y);
        this.checkChekpoints();
    }

    get lap() {
        return this.laps + 1;
    }

    checkChekpoints() {
        const checkpoint = this.map.getCheckpoint(this.car);

        if (checkpoint) {
            this.onCheckpoint(checkpoint);
        }
    }

    onCheckpoint(checkpoint) {
        console.log(this.checkpoint, checkpoint);
        if (checkpoint === 1 && this.checkpoint === this.map.checkpoints.length) {
            this.checkpoint = 1;
            ++this.laps;
            this.car.emit('lap', this.lap);
        } else if (checkpoint == this.checkpoint + 1) {
            ++this.checkpoint;
        }
    }
}