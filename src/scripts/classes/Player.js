const DIRECTIONS = Object.freeze({ BACKWARDS: -1, NONE: 0, FORWARD: 1 });
const SPEED = 10;

export default class Player {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        const position = this.map.getPlayerPosition();
        this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', 'car_blue_1');
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
        return this.direction * SPEED;
    }

    getVelocityFromAngle() {
        const vec2 = new Phaser.Math.Vector2();
        return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
    }

    move() {
        const velocity = this.getVelocityFromAngle();
        this.car.setVelocity(velocity.x, velocity.y)
    }
}