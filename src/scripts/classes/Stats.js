
export default class Stats {
    constructor(scene, laps) {
        this.scene = scene;
        this.laps = laps;
        this.currentLap = 0;
        this.time = 0;
        this.timeLap = 0;
        this.timeBestLap = 0;
        this.timePrevLap = 0;
    }

    get completed() {
        return this.currentLap + 1 > this.laps;
    }

    onLapComplete() {
        ++this.currentLap;

        if (this.timeBestLap === 0 || this.timeBestLap < this.timeLap) {
            this.timeBestLap = this.timeLap;
        }

        this.timePrevLap = this.timeLap;
        this.timeLap = 0;
    }

    update(dt) {
        if (!this.completed) {
            const time = dt / 1000;
            this.time += time;
            this.timeLap += time;
        }
    }
}