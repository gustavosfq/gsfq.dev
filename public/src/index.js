import 'phaser';
import MainScene from './Classes/Scenes/MainScene.js';
import BootScene from './Classes/Scenes/BootScene.js';

Raven.context(() => {
	var bootScene = new BootScene();
	var mainScene = new MainScene();

	var config = {
	    type: Phaser.AUTO,
	    parent: 'game',
	    width: 800,
	    height: 500,
		backgroundColor: '#09090a',
		pixelArt: true,
		roundPixels: false,
		antialias: false,
		zoom: 1,
	    scene: [BootScene, mainScene]
	};
	var game = new Phaser.Game(config);
});

