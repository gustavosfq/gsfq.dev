import 'phaser';

class Item {
	constructor(scene, sprite) {
		this.scene = scene;
		this.sprite = sprite;
		this.sprite.alpha = 0.3;
		this.sprite.setScrollFactor(0).setInteractive();
	}

	setOnClick(onClick) {
		this.sprite.on('pointerdown', () => {
			if(this.sprite.alpha === 1) {
				onClick();
			}
		});
	}


	discover() {
		if(this.sprite.alpha != 1) {
			this.sprite.alpha = 1;
			this.scene.tweens.add({
				targets: this.sprite,
				y: this.sprite.y - 4,
				ease: 'Power1',
				duration: 200,
				yoyo: true,
				repeat: 0
			});
		}
	}
}

export default Item;