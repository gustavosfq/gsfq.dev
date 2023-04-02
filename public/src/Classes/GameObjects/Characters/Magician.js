import 'phaser';
import Talkable from '../Talkable.js';

class Magician extends Talkable {
	constructor(context) {
		super(context);
		this.create();
	}

	create() {
		var magician = this.scene.map.createFromObjects('magician', 234, {key: 'magician'})[0];
		magician.x += 200;
		this.setSprite(magician);
		this.setPlayer(this.scene.player);
		this.canFlip = true;
		this.onOverlap(async () => {
			if(this.scene.player.canTalk && !this.scene.dialogBox.isShow()) {
				this.scene.player.canTalk = false;
				if(!this.scene.briefcase.isVisible){
					this.text = [`Mi nombre es Mago Vitae, te podría mostrar mi truco de magia, pero no puedo ver nada sin las antorchas prendidas`, `¿Podrías prenderlas por mi?`]		
				}else {	
					var response = await this.scene.utils.copyTextToClipboard("https://www.linkedin.com/in/gustavosfq/");
					this.text = [`Mi nombre es Mago Vitae, solo me se un truco de magia, ¡Entregar Curriculums!, ¡¡ABRAKADABRA!!`, `el link del curriculum vitae ahora esta en tu portapapeles, usa ctrl+v para ver el link.\ndescargalo, es todo tuyo.`];
					if(!response){
						this.scene.utils.urlAddress();
						this.text = ["Mi nombre es Mago Vitae, solo me se un truco de magia, ¡Entregar Curriculums!, ¡¡ABRAKADABRA!!, el link del curriculum esta ahora en la barra de navegacion","Pues tómalo y descargalo, es todo tuyo."];
					}
					this.scene.cv.discover();
				}
				this.scene.dialogBox.show();
				this.scene.dialogBox.text = this.text;
			}
		});
		this.vertical = false;
	}
}

export default Magician;
