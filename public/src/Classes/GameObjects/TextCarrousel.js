import 'phaser';

class TextCarrousel {
	constructor(config) {
		this.scene = config.scene;
		this.items; 
		this.isOpen = false;
		this.canOpenOrClose = true;
	    this.init();
	}

	init() {
		//set papiro
		this.papiro = this.scene.add.sprite(650, 138, 'roll').setScrollFactor(0);
	    this.papiro.setScale(6);
		this.papiro.depth = 9000000000000000000000000000000;
		this.papiro.visible = false;


		//set text
		this.text = this.scene.make.text({
	        x: 580,
	        y: 68,
	        text: '',
	        origin: { x: 0, y: 0 },
	        style: {
	            font: 'bold 15px Visitor',
	            fill: 'black',
	            wordWrap: { width: 150, height: 125 }
	        }
	    }).setScrollFactor(0);
		this.setItems([
			'documento #0\nbraveup webapp.\nreactjs.', 
			'documento #1\nlen control 2.0.\nflutter.', 
			'documento #2\nbraveup 2.0.\nflutter.', 
			'documento #3\nlen control.\nionic 4.\nnodejs.\nangular 7.', 
			'documento #4\nbraveup.\nionic 4.\nnodejs.\nhtml5.', 
			'documento #5\nMapa Sodimac.\nPhaserjs.\nhtml5.\ndocumento inconcluso.', 
			'documento #6\nskole.\nionic 3.\ntypescript.', 
			'documento #7\nskoledriver.\nionic 3.\ntypescript.\n[enlazado con documento #6]', 
			'documento #8\nchile es mar.\nionic 2.\ntypescript.\n[este documento trae una fuerza distinta a los otros]', 
			'documento #9\nosa control.\njavascript.\nhtml5.\ncss3.',  
			'documento #10\nveggiescanner.\njava.\nphp.\nhtml5.\ncss3.\n[este documento esta roto]', 
			])
		this.text.depth = this.papiro.depth * 2;
		//set buttons
	    this.buttonBack = this.scene.add.sprite(550, 138, 'arrow').setScrollFactor(0).setInteractive();
	    this.buttonBack.flipX = true;
	    this.buttonNext = this.scene.add.sprite(755, 138, 'arrow').setScrollFactor(0).setInteractive();
	    this.createAnims();

	    this.buttonNext.on('pointerdown', function(){
	    	this.next();
	    }.bind(this));
	    this.buttonBack.on('pointerdown', function(){
	    	this.prev();
	    }.bind(this));
	}

	createAnims() {
		this.scene.anims.create({
	        key: 'open',
	        frames: this.scene.anims.generateFrameNumbers('roll', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36].reverse()}),
	        frameRate: 20,
	        repeat: 0
	    });
	    var close = this.scene.anims.create({
	        key: 'close',
	        frames: this.scene.anims.generateFrameNumbers('roll', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36]}),
	        frameRate: 20,
	        repeat: 0
	    });
	    this.scene.anims.create({
	    	key: 'arrowMove',
	    	frames: this.scene.anims.generateFrameNumbers('arrow', { frames: [0, 1] }),
	    	frameRate: 10,
	    	repeat: -1
	    });
	    this.buttonNext.anims.play("arrowMove");
	    this.buttonBack.anims.play("arrowMove");
	    this.papiro.anims.currentAnim = close;
	    this.papiro.setFrame(36);
	    this.papiro.on('animationcomplete', this.papiroCallback, this);
	    this.hide();
	}

	next() {
		var next = this.items.actualIndex + 1;
		if(next > this.items.length){
			this.text.setText(this.items.obj[0]);
			this.items.actualIndex = 0;
		} else {
			this.text.setText(this.items.obj[next]);
			this.items.actualIndex = next;
		}
	}

	prev() {
		var prev = this.items.actualIndex - 1;
		if(prev < 0){
			this.text.setText(this.items.obj[this.items.length]);
			this.items.actualIndex = this.items.length;
		} else {
			this.text.setText(this.items.obj[prev]);
			this.items.actualIndex = prev;
		}
	}

	setItems(array){
		this.items = {
			obj: array,
			length: array.length-1,
			actualIndex: 0
		}
		this.text.setText(this.items.obj[0]);
	}

	open() {
		if(this.papiro.anims.currentAnim.key != 'open'){
			this.papiro.anims.play('open');
		}
	}

	close() {
		if(this.papiro.anims.currentAnim.key != 'close'){
			this.papiro.anims.play('close');
			this.hide();
		}
	}

	toggle() {
		if(this.canOpenOrClose){
			this.canOpenOrClose = false;
			if(this.papiro.anims.currentAnim.key != 'open'){
				this.papiro.anims.play('open');
			} else {
				this.papiro.anims.play('close');
				this.hide();
			}
		}
	}

	hide() {
		this.buttonNext.visible = false;
		this.buttonBack.visible = false;
		this.text.visible = false;
	}

	show() {
		this.buttonNext.visible = true;
		this.buttonBack.visible = true;
		this.text.visible = true;
	}

	papiroCallback(animation, frame){
		if(animation.key === "open"){
			this.isOpen = true;
			this.show();
		} else {
			this.isOpen = false;
		}
		setTimeout(() => this.canOpenOrClose = true, 200);
	}
}

export default TextCarrousel;