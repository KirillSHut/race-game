export default class StatsPopup {
    constructor(scene, stats) {
        this.scene = scene;
        this.stats = stats;
        this.create();
    }

    create() {
        const popupWidth = 600;
        const popupHeight = 600;
        const x = this.scene.sys.game.config.width / 2;
        const y = this.scene.sys.game.config.height / 2;
        const style = { font: '24px Arial', fill: '#FFFFFF' };

        this.popup = this.scene.add.graphics()
            .fillStyle(0x000000, 0.5)
            .fillRoundedRect(x - popupWidth / 2, y - popupHeight / 2, popupWidth, popupHeight)
            .setScrollFactor(0);

        this.title = this.scene.add.text(this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY - 200,
            `Level Complete!`,
            { font: '46px Arial', fill: '#FAFAD2' })
            .setOrigin(0.5)
            .setScrollFactor(0);

        this.time = this.scene.add.text(this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY - 50,
            `Time Total: ${this.stats.time.toFixed(2)}`,
            style)
            .setOrigin(0.5)
            .setScrollFactor(0);

        this.timeBestLap = this.scene.add.text(this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY + 50,
            `Best Lap: ${this.stats.timeBestLap.toFixed(2)}`,
            style)
            .setOrigin(0.5)
            .setScrollFactor(0);

        this.text = this.scene.add.text(this.scene.cameras.main.centerX,
            this.scene.cameras.main.centerY + 200,
            `Tap to continue!`,
            style)
            .setOrigin(0.5)
            .setScrollFactor(0);

        this.scene.input.on('pointerdown', () => {
            this.scene.scene.start("Game");
        })
    }
}