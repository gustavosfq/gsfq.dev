import 'phaser';
import Talkable from '../Talkable.js';

class Monster extends Talkable {
	constructor(context) {
		super(context);
		this.create();
	}

	create() {
		var monster = this.scene.add.sprite(250, 250, 'monster');
		monster.x += 200;
		monster.flipX = true;
		this.setSprite(monster);
		this.setPlayer(this.scene.player);
		this.sourceSprite.body.height = 16;
		this.sourceSprite.body.offset.y = 10;
		this.canFlip = true;
		this.text = [`ho... hol... hola...\nte... ten... tengo mucho miedo...\ne.. es.. esta muy oscuro aca... `, `¿po... pod... podrías prender las antorchas? porfavor...`];
		this.onOverlap(async () => {
			if(this.scene.player.canTalk && !this.scene.dialogBox.isShow()) {
				this.scene.player.canTalk = false;
				if(this.scene.briefcase.isVisible){
					this.text = [`Gracias por prender las antorchas!.\nmmm... te ves apetitoso, pero no tengas miedo, no te comeré, ahora eres mi bro.`, 'Te cuento un secreto ?\nme converti en monstruo por beber de esa fuente con agua verde, es muy deliciosa.']
				}
				this.scene.dialogBox.show();
				this.scene.dialogBox.text = this.text;
			}
		});
		this.vertical = false;
	}
}

export default Monster;
