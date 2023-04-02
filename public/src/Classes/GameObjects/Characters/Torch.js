import 'phaser';
import Talkable from '../Talkable.js';

class Torch extends Talkable{
	constructor(sprite, context) {
		super(context);
		this.fire = {};
		this.canSwitch = true;
		this.create(sprite);
	}

	create(sprite) {
		sprite.x += 200;
		sprite.height *= 0.8;
		this.setSprite(sprite);
		this.setPlayer(this.scene.player);
		this.text = "";
		this.onOverlap(() => {
			if(this.scene.player.canTalk && !this.scene.dialogBox.isShow() && this.canSwitch && !this.scene.fireLighter.sourceSprite.visible) {
				this.canSwitch = false;
				if(!this.scene.briefcase.isVisible){
					this.switch();
					if(this.scene.areTorchsOn()){
						this.scene.player.move = false;
						this.scene.briefcase.tweenTorch(() =>{
							this.scene.cameras.main.shake(1000, 0.010);
							this.scene.player.move = true;
						})
					}
				}
				setTimeout(() => this.canSwitch = true, 400);
			}
		});
	}

	switch(){
		if(!this.isOn()){
			this.sourceSprite.anims.play('on', true);
		} else {
			this.sourceSprite.anims.play('off');
		}
	}

	isOn() {
		try{
			return this.sourceSprite.anims.currentAnim.key == 'on';
		}catch(e){
			return false;
		}
	}

}

export default Torch;
