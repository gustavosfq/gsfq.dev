import 'phaser';
import { DEPTH_TO_MULTIPLY } from '../../const.js';

class Player extends Phaser.GameObjects.Sprite {
	constructor(config){
		super(config.scene, config.x, config.y, config.texture);
		this.scene = config.scene;
		
		//to render sprite
		this.scene.add.existing(this);
		this.walk = {}
		this.move = true;
		this.canTalk = true;
		this.init();
	}

	init() {
		this.scene.physics.world.enable(this);
		this.body.collideWorldBounds = true;
		this.setScale(0.5);
		this.setBody();
		this.setDepth();
		console.log('this', this);
	}

	setBody() { 
		this.body.offset.x = 6;
		this.body.offset.y = 30;
		this.body.width = 10;
		this.body.height = 7;
	}

	setDepth(){
		this.depth = this.y * DEPTH_TO_MULTIPLY;
	}
}

export default Player