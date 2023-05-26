export default class Stats {
    constructor(scene, laps) {
        this.scene = scene;
        this.laps = laps;
        this.currentLap = 0;
    }

    get completed() {
        return this.currentLap + 1 > this.laps;
    }

    onLapComplete() {
        ++this.currentLap;
        if (this.completed) {
            this.scene.scene.restart();
        }
    }
}