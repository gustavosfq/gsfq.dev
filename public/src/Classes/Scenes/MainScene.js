import GameObject from 'phaser';
import Player from '../GameObjects/Player.js';
import Magician from '../GameObjects/Characters/Magician.js';
import GreenFountain from '../GameObjects/Characters/GreenFountain.js';
import Briefcase from '../GameObjects/Characters/Briefcase.js';
import Torch from '../GameObjects/Characters/Torch.js';
import Monster from '../GameObjects/Characters/Monster.js';
import FireLighter from '../GameObjects/Characters/FireLighter.js';
import { setAnims } from '../AnimsManager.js';
import DialogBox from '../GameObjects/Dialog.js';
import GameUtils from '../../utils.js';
import TextCarrousel from '../GameObjects/TextCarrousel.js';
import Item from '../GameObjects/Item.js';
import Items from '../GameObjects/Items.js';
import { DEPTH_TO_MULTIPLY } from '../../const.js';

class MainScene extends GameObject.Scene {
	constructor(){
		super({
		    key: 'MainScene',
		    antialias: true,
		    physics: {
		        default: 'arcade',
		        arcade: {
		            gravity: { y: 0 },
		            debug: false
		        }
			},
			pixelArt: true
		});

		this.utils = new GameUtils();

		this.player;
		this.keys = {};
		this.map;
		this.magician;
		this.briefcase;
		this.intro = true;
		this.punchMode = false;
		this.pressingA = false;

		this.punchTextConst = [
			"\ngu????? ?????? ???????????\ng???a??.??q??????.com\n+?? ? ????????.",
			"\ngu???vo ?lo??s ???ntani???\ng??tav?.s?q??ma??.com\n+?? ? 77???0??.",
			"\ngust?vo ?lores ???ntanilla\ng?stavo.sfq@?ma?l.com\n+?6 ? 77???079.",
			"\ngustavo ?lores ?uintanilla\ngustavo.sfq@gma?l.com\n+?6 ? 77?98079.",
			"\ngustavo flores quintanilla\ngustavo.sfq@gmail.com\n+56 9 77498079.",
		];

		this.punchText = [...this.punchTextConst];

		this.talkableGroup = [];
		this.torchs = [];

	}

	preload (){

		this.player = new Player({
			scene: this,
			x: 300,
			y: 200,
			texture: 'player'
		})
		setAnims(this);
		
		this.keys['down'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		this.keys['up'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.keys['left'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.keys['right'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.keys['a'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keys['space'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.keys['b'] = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

		this.physics.world.setBounds(200, 0, 800, 1200);
	}

	create (){
		var self = this;

		this.dialogBox = new DialogBox(this);
		this.fadeOut = this.add.sprite(this.cameras.main.width, this.cameras.main.height, 'fadeout');
		this.fadeOut.depth = 9999999999;
		this.fadeOut.setScale(1000);


		console.log('this.items', this.items);


		this.createMap();

		this.createTalkableNPCs();

		this.configureCamera();
		/*debug collision*/
		// var debugGraphics = this.add.graphics();
  		//this.map.renderDebug(debugGraphics);

		this.physics.add.collider(this.player, [this.layers.wall_ulr, this.layers.wall_d]);

		this.papiro = new TextCarrousel({
			scene: this
		});

		this.player.move = false;

		this.dialogBox.show();
		this.dialogBox.text = [
			`No sabemos que ha sucedido, tenemos que buscar de que trata todo eso...`,
			`El misterio acerca de gf nos tiene a todos con un sabor amargo y una duda enorme...`,
			`Creo que es momento de investigar todo esto, pero encerrado aca tengo pocas posibilidades`
		]

		this.cv = new Item(this, this.add.sprite(100, 80, 'cv'));
		this.cv.setOnClick(this.openLink("https://gustavoflores.xyz"));

		this.itemPapiro = new Item(this, this.add.sprite(100, 80, 'papiro-item'));
		this.itemPapiro.setOnClick(() => {
			this.papiro.toggle	()
		});

		this.fireLighterItem = new Item(this, this.add.sprite(100, 80, 'firelighters-item'));
		this.fireLighterItem.setOnClick(() => {});

		this.questionItem = new Item(this, this.add.sprite(100, 80, 'question-item'));
		this.questionItem.setOnClick(this.openLink("https://www.linkedin.com/in/gustavosfq/"));

		this.items = new Items();
		this.items.add(this.cv);
		this.items.add(this.itemPapiro);
		this.items.add(this.fireLighterItem);
		this.items.add(this.questionItem);
	}

	update() {
		if(this.dialogBox.isShow() || !this.player.move){
			this.player.setFrame(0);
			this.player.body.velocity.set(0);
			if(this.punchMode && this.pressingA && Phaser.Input.Keyboard.JustDown(this.keys.a)){
				if(this.punchText.length === 1){
					this.questionItem.discover();
				}
				if(this.punchText.length > 0){
					this.pressingATimeOut();
					this.dialogBox.setTextPunch(this.greenFountain.text + this.punchText.shift());
					this.cameras.main.shake(300, 0.010);
				} else {
					this.punchMode = false;
					this.dialogBox.hide();
					var self = this;
					setTimeout(function(){
						self.player.canTalk = true;
					}, 500)
				}
			} else if(this.dialogBox.ready && Phaser.Input.Keyboard.JustDown(this.keys.a)){
				if(!this.dialogBox.next()){
					if(this.intro){
						this.hideIntro();
					}
					this.dialogBox.hide();
					var self = this;
					setTimeout(function(){
						self.player.canTalk = true;
					}, 500)
				}
			}
			return;
		}
		if(Phaser.Input.Keyboard.JustDown(this.keys.a))
			this.checkOverlapToTalk();

		this.playerMove();
	}

	hideIntro() {
		var self = this;
		this.intro = false;

		this.tweens.add({
	        targets: this.fadeOut,
	        alpha: 0,
	        ease: 'Power1',
	        duration: 2000,
	        yoyo: false,
	        repeat: 0,
	        onComplete: function () { 
	        	self.player.move = true;
				self.papiro.papiro.visible = true;
				self.fadeOut.destroy();
				self.dialogBox.show();
				self.dialogBox.text = `Debemos resolver el misterio.\npuedes usar las flechas para moverte. usa [a] para interactuar con los objetos`;
	        }
	    });

	}

	playerMove() {
		//esto es para moverlo dentro de una casa
		// if(!this.player.move){
		// 	this.player.anims.stop();
		// 	this.player.setFrame(this.player.anims.currentAnim.frames[2].textureFrame);
		// 	return;
		// }
		// 
		if(this.keys.b.isDown){
			this.player.velocity = 300;
		} else {
			this.player.velocity = 70;
		}
			this.player.body.velocity.set(0);


		if(this.player.body.touching.none == false){
			this.player.anims.stop();
			this.player.setFrame(0);
		} else if(this.keys.down.isDown) {
			this.player.body.velocity.y = this.player.velocity;
			this.player.anims.play("down", true);
			this.player.setBody();
			this.player.setDepth();
		} else if(this.keys.up.isDown) {
			this.player.body.velocity.y = -this.player.velocity;
			this.player.anims.play("up", true);
			this.player.setBody();
			this.player.setDepth();
		} else if(this.keys.left.isDown) {
			this.player.body.velocity.x = -this.player.velocity;
			this.player.flipX = true;
			this.player.setBody();
			this.player.anims.play("left", true);
		} else if(this.keys.right.isDown) {
			this.player.body.velocity.x = this.player.velocity;
			this.player.flipX = false;
			this.player.setBody();
			this.player.anims.play("right", true);
		} else {
			this.player.anims.stop();
			this.player.setFrame(0);
		}

	}

	fadeInToWarpZone(){
		this.player.x = 800/2;
		this.player.y = 600/2;
	}

	checkOverlapToTalk() {
		for(var i = 0; i < this.talkableGroup.length; i++) {
			if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.body, this.talkableGroup[i].spriteOverlapHorizontal.body)){
				this.talkableGroup[i].overlap("Horizontal");
			} else if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.body, this.talkableGroup[i].spriteOverlapVertical.body)) {
				this.talkableGroup[i].overlap("Vertical");
			}
		};
	}

	configureCamera() {
		this.cameras.main.setBounds(0, 0, 0, this.map.heightInPixels);
	    this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
	}

	createMap() {
		this.map = this.make.tilemap({ key:'stage1' });
		var tiles_dungeon = this.map.addTilesetImage('tileset', 'dungeon_tile');
		var tiles_dungeon_walls = this.map.addTilesetImage('wall_tileset', 'dungeon_tile_walls');
		this.layers = {};
		this.layers['ground'] = this.map.createStaticLayer('ground', tiles_dungeon_walls, 200, 0);
		this.layers.ground.depth = this.layers.ground.y * DEPTH_TO_MULTIPLY;
		this.layers['wall_ulr'] = this.map.createStaticLayer('wall_ulr', tiles_dungeon_walls, 200, 0);
		this.map.setCollision([257, 258, 259, 273, 274, 275, 291, 289, 292, 290, 293, 306, 308, 309]);
		this.layers.wall_ulr.depth = this.layers.wall_ulr.y * DEPTH_TO_MULTIPLY;
		this.layers['wall_d'] = this.map.createStaticLayer('wall_d', tiles_dungeon_walls, 200, 0);
		this.map.setCollision([276, 306, 277, 305, 307]);
		this.layers.wall_d.depth = 999999999;
		this.layers['ornament'] = this.map.createStaticLayer('ornament', tiles_dungeon, 200, 0);
		this.layers.ornament.depth = this.layers.ornament.y * DEPTH_TO_MULTIPLY;
	}

	createTalkableNPCs() {
		var self = this;

		this.talkableGroup.push(new Magician(this));

		this.greenFountain = new GreenFountain(this);

		this.talkableGroup.push(this.greenFountain);
		
		this.briefcase = new Briefcase(this);

		this.talkableGroup.push(this.briefcase);

		this.fireLighter = new FireLighter(this);

		this.talkableGroup.push(this.fireLighter);

		this.talkableGroup.push(new Monster(this));

		this.map.createFromObjects('torch', 30, {key: 'torch'}).forEach((sprite, i) => {
			var torch = new Torch(sprite, this);
			this.torchs.push(torch);
			this.talkableGroup.push(torch);
		});

		console.log('this.talkableGroup', this.talkableGroup);
	}

	areTorchsOn() {
		return this.torchs.reduce((a, b) => {
			return b.isOn() && a;
		}, true);
	}

	pressingATimeOut() {
		this.pressingA = false;
		setTimeout(() => {
			this.pressingA = true;
			if(this.punchText.length == 0){
				this.punchMode = false;
				this.dialogBox.ready = true;
			}
		}, 2000)
	}

	openLink(url) {
		return () => {
			if(window.open(url, '_blank') == null){
				this.cameras.main.shake(200, 0.005);
				if(this.dialogBox.isShow()){
					this.dialogBox.disrupt();
					this.dialogBox.hide();
				}
				this.dialogBox.show();
				this.player.canTalk = false;
				this.punchMode = false
				this.dialogBox.text = ['Woh oh oh oh, hey!', 'tienes bloqueados los enlaces externos en tu navegador para esta pagina, será mejor que los habilites si quieres seguir viendo.\nPuedes confiar en mi ;)']
			}
		}
	}
}

export default MainScene;