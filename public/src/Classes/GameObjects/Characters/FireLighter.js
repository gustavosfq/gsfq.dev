import 'phaser';
import Talkable from '../Talkable.js';

class FireLighter extends Talkable {
	constructor(context) {
		super(context);
		this.create();
	}

	create() {
		var fireLighter = this.scene.add.sprite(150, 100, 'firelighters');
		fireLighter.x += 200;
		this.setSprite(fireLighter);
		this.setPlayer(this.scene.player);
		this.sourceSprite.body.height = 10;
		this.sourceSprite.body.offset.y = 5;
		this.text = [`Encontraste una caja de fosforos,\nQuizas puedas prender algo con esto.`];
		this.onOverlap(async () => {
			if(this.scene.player.canTalk && !this.scene.dialogBox.isShow()) {
				this.scene.player.canTalk = false;
				this.scene.dialogBox.show();
				this.scene.dialogBox.text = this.text;
				this.sourceSprite.destroy();
				this.spriteOverlapHorizontal.x = 1000;
				this.spriteOverlapVertical.x = 1000;
				this.scene.fireLighterItem.discover();
			}
		});
	}
}

export default FireLighter;
