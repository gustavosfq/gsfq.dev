import 'phaser';
import Talkable from '../Talkable.js';

class GreenFountain extends Talkable{
	constructor(context) {
		super(context);
		this.create();
	}

	create() {
		var greenFountain = this.scene.map.createFromObjects('green_fountain', 27, {key: 'green_fountain'})[0];
		greenFountain.x += 200;
		greenFountain.height *= 0.8;
		this.setSprite(greenFountain);
		this.spriteOverlapVertical.y -= 10;
		this.spriteOverlapHorizontal.y -= 10;
		this.setPlayer(this.scene.player);
		this.text = "Parece ser un texto encriptado, presiona [A] hasta descubrir el mensaje.";
		this.onOverlap(() => {
			if(this.scene.player.canTalk && !this.scene.dialogBox.isShow()) {
				this.scene.player.canTalk = false;
				this.scene.punchText = [...this.scene.punchTextConst];
				this.scene.punchMode = true;
				this.scene.dialogBox.show();
				this.scene.dialogBox.setTextPunch(this.text + this.scene.punchText.shift());
				this.scene.pressingATimeOut();
			}
			// if(self.papiro.isOpen){
			// 	self.papiro.close();
			// } else {
			// 	self.papiro.open();
			// }
		});
		this.spriteOverlapHorizontal.y = this.spriteOverlapHorizontal.y + 10;
	}
}

export default GreenFountain;
