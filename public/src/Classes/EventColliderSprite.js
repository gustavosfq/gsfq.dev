import 'phaser';

class EventColliderSprite {
	constructor(config) {
		this.scene = config.scene;
		this.sourceTexture = this.scene.textures.get(config.texture).source[0];
		this.border = (this.sourceTexture.width + this.sourceTexture.height) * 0.1;
		this.spriteCollider = this.scene.add.sprite(config.x, config.y, config.texture);
		this.spriteOverlap = this.scene.add.sprite(config.x, config.y, config.texture);
		
		this.scene.physics.world.enable([this.spriteCollider, this.spriteOverlap]);
		this.spriteCollider.body.immovable = true;

		this.spriteOverlap.body.setSize(
			this.sourceTexture.width + this.border, 
			this.sourceTexture.height + this.border
			)

		this.player;
	}

	setPlayer(player) {
		this.player = player;
		this.colliderAndOverlap();
	}

	colliderAndOverlap() {
		if(!this.player)
			return;
		var self = this;
		this.scene.physics.add.collider(this.player, this.spriteCollider, function() {
			
		},)
	}
}

export default EventColliderSprite;