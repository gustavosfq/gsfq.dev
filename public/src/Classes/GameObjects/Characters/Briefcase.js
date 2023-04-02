import 'phaser';
import Talkable from '../Talkable.js';
import { DEPTH_TO_MULTIPLY } from '../../../const.js';


class Briefcase extends Talkable{
	constructor(context) {
		super(context);
		this.isVisible = false;
		this.create();
	}

	create() {
		this.setSprite(this.scene.add.sprite(370, -10, 'jobs'));
		this.setPlayer(this.scene.player);
		this.text = "Acabas de descubrir los trabajos de GF. wow, ¿Que tipo de cosas habrá hecho ?";
		this.sourceSprite.depth = 9999999999999999999999999999999;
		this.onOverlap(function() {
			if(this.scene.player.canTalk && !this.scene.dialogBox.isShow()) {
				this.scene.tweens.add({
					targets: this.sourceSprite,
					y: this.sourceSprite.y - 2,
					ease: 'Power1',
					duration: 200,
					yoyo: true,
					repeat: 0
				});
				this.scene.player.canTalk = false;
				this.scene.dialogBox.show();
				this.text = "Acabas de descubrir los trabajos de GF. wow, ¿Que tipo de cosas habrá hecho ?";
				if(this.scene.papiro.isOpen && this.dirty){
					this.text = "Puedes ver los trabajos de GF allá arriba, clickea en las flechas de los lados para descubrir mas acerca de el.";	
				} else {
					this.scene.papiro.open();
				}
				this.scene.dialogBox.text = this.text;
			}
		});	
	}

	tweenTorch(callback) {
		if(!this.isVisible) {
			var y = 175;
			this.scene.tweens.add({
				targets: this.sourceSprite,
				y: y,
				ease: 'Expo.easeIn',
				duration: 1500,
				yoyo: false,
				repeat: 0,
				onComplete: () => {
					callback();
					this.sourceSprite.depth = y * DEPTH_TO_MULTIPLY;
					this.isVisible = true;
					this.scene.itemPapiro.discover();
				}
			});
			this.scene.tweens.add({
				targets: this.spriteOverlapHorizontal,
				y: y,
				ease: 'Expo.easeIn',
				duration: 1500,
				yoyo: false,
				repeat: 0
			});
			this.scene.tweens.add({
				targets: this.spriteOverlapVertical,
				y: y,
				ease: 'Expo.easeIn',
				duration: 1500,
				yoyo: false,
				repeat: 0
			});
		}
	}
}

export default Briefcase;
