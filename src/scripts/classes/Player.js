export default class Player {
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        const position = this.map.getPlayerPosition();
        this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', 'car_blue_1');
    }
}