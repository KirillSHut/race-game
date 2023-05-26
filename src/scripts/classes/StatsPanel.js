export default class StatsPanel {
    constructor(scene, stats) {
        this.scene = scene;
        this.stats = stats;
    }

    create() {
        const style = { font: '24px Arial', fill: '#FFFFFF' };
        this.lapText = this.scene.add.text(10, 30, `Laps: ${this.stats.currentLap}/${this.stats.laps}`, style).setScrollFactor(0);
        this.timeText = this.scene.add.text(10, 60, 'Total time: 0', style).setScrollFactor(0);
        this.timeLapText = this.scene.add.text(10, 90, 'Lap time: 0', style).setScrollFactor(0);
        this.timeBestLapText = this.scene.add.text(10, 120, 'Best time: 0', style).setScrollFactor(0);
    }

    render() {
        this.lapText.setText(`Laps: ${this.stats.currentLap}/${this.stats.laps}`);
        this.timeText.setText(`Total time: ${this.stats.time.toFixed(2)}`);
        this.timeLapText.setText(`Lap time: ${this.stats.timeLap.toFixed(2)}`);
        this.timeBestLapText.setText(`Best time: ${this.stats.timeBestLap.toFixed(2)}`);
    }
}