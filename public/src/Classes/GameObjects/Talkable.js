import 'phaser';
import { DEPTH_TO_MULTIPLY } from '../../const.js';

class Talkable {
	constructor(scene) {
		this.scene = scene;
		this.sourceSprite;
		this.border;
		this.spriteOverlapHorizontal;
		this._textConst;
		this._text;
		this.canFlip = false;
		this._overlap = function() {};
		this.dirty = false;
		this.orientationIsTalkable = {
			horizontal: true,
			vertical: true
		}
	}

	setPlayer(player) {
		if(player instanceof Phaser.GameObjects.Sprite){
			this.player = player;
			this.scene.physics.add.collider(this.player, this.sourceSprite);
		}
	}

	setSprite(sprite){
		if(sprite instanceof Phaser.GameObjects.Sprite){
			this.sourceSprite = sprite;
			this.sourceSprite.depth = sprite.y * DEPTH_TO_MULTIPLY;
			this.sourceSprite.isTalkable = true;

			this.border = (this.sourceSprite.width + this.sourceSprite.height) * 0.3;
			this.spriteOverlapHorizontal = this.scene.add.sprite(this.sourceSprite.x, this.sourceSprite.y, sprite.texture.key);
			this.spriteOverlapVertical = this.scene.add.sprite(this.sourceSprite.x, this.sourceSprite.y, sprite.texture.key);

			this.scene.physics.world.enable([this.sourceSprite, this.spriteOverlapHorizontal, this.spriteOverlapVertical]);
			this.sourceSprite.body.immovable = true;
			this.sourceSprite.body.offset.y = Math.ceil(Math.abs(this.sourceSprite.body.height * 0.7) - this.sourceSprite.body.height) *-1;  
			this.sourceSprite.body.height *= 0.7;

			this.spriteOverlapHorizontal.body.setSize(
				this.sourceSprite.body.width + (this.border * 1.5), 
				this.sourceSprite.body.height / 2.2
				);
			this.spriteOverlapVertical.body.setSize(
				this.sourceSprite.body.width / 2, 
				this.sourceSprite.body.height + (this.border * 1.5)
				);
			this.spriteOverlapHorizontal.visible = false;
			this.spriteOverlapVertical.visible = false;
		} else {
			console.warn("El objecto debe ser de tipo Phaser.GameObjects.Sprite.");
		}
	}

	onOverlap(method) {
		if(typeof method != 'function'){
			console.warn("method it's not a type function")
			return;	
		}
		this._overlap = method;

	}

	overlap(orientation) {
		var playerBounds = this.player.getBounds();
		var sourceSpriteBounds = this.sourceSprite.getBounds();

		if(this.orientationIsTalkable.horizontal && orientation == "Horizontal"){
			if((playerBounds.x) > (sourceSpriteBounds.x) && this.player.flipX == true){
				// player esta a la derecha de sourceSprite
				if(this.canFlip)
					this.sourceSprite.flipX = false;
				this._overlap();
				this.dirty = true;
			} else if (playerBounds.x < sourceSpriteBounds.x && this.player.flipX == false) {
				// player esta a la izquierda de sourceSprite
				if(this.canFlip)
					this.sourceSprite.flipX = true;
				this._overlap();
				this.dirty = true;
			}
		} else if (this.orientationIsTalkable.vertical && orientation == "Vertical"){
			this._overlap();
			this.dirty = true;
		}

	}

	

	set text(text) {
		this._textConst = text;
	}
	get text() {
		this._text = this._textConst;
		return this._text;
	}

	set horizontal(value) {
		this.orientationIsTalkable.horizontal = value;
	}
	get horizontal() {
		return this.orientationIsTalkable.horizontal;
	}

	set vertical(value) {
		this.orientationIsTalkable.vertical = value;
	}
	get vertical() {
		return this.orientationIsTalkable.vertical;
	}
}

export default Talkable;