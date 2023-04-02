import 'phaser';

class DialogBox {
	constructor(scene) {
		this.scene = scene;
		this.ready = true;
		this.buttonA = this.scene.add.sprite(579, 440, 'button-a').setScrollFactor(0);
		this.background = {};
		this.background.visible = false;
		this._text = [];
	    this._textObj = this.scene.make.text({
	        x: 180,
	        y: 340,
	        text: 'hola',
	        origin: { x: 0, y: 0 },
	        style: {
	            font: '15px Minecraftia',
	            fill: 'white',
	            wordWrap: { width: 700*0.6,}
	        }
	    }).setScrollFactor(0);
	    this._textObj.depth = 999999999999999998;
	    this._textObj.visible = false;
	    this.buttonAnim = this.scene.anims.create({
	        key: 'unique',
	        frames: this.scene.anims.generateFrameNumbers('button-a', { frames: [0, 1]}),
	        frameRate: 8,
	        repeat: -1
	    });
	    this.buttonA.depth =999999999999999999;
	    this.buttonA.visible = false;
	    this.buttonA.anims.play("unique");
	}

	show() {
		this.background.visible = true;
		this._textObj.visible = true;
	}

	hide() {
		this.background.visible = false;
		this._textObj.visible = false;
		this.buttonA.visible = false;
		this.ready = false;
	}

	isShow() {
		return this.background.visible;
	}

	set text(text){
		if(Array.isArray(text)){
			this._text = [...text];
		} else {
			this._text = [text];
		}
		this.ready = false;
		this.typeText(this.text.shift(), 1);
	}
	get text(){
		return this._text;
	}

	next() {
		if(this.text.length > 0){
			this.buttonA.visible = false;			
			this.ready = false;
			this.typeText(this.text.shift(), 1);
			return true;
		} else {
			return false;
		}
	}

	typeText(text, i = 1) {
		var self = this;
		this._textObj.setText(text.substring(0, i));
		if(text.length != i){
			this.scene.time.delayedCall(20, () => {
				this.typeText(text, i+1);
			}, [], this)
		} else {
			this.buttonA.visible = true;
			this.ready = true;
		}
	}

	setTextPunch(text) {
		this._textObj.setText(text);
		this.buttonA.visible = true;
	}

	disrupt() {
		
	}
}

export default DialogBox;