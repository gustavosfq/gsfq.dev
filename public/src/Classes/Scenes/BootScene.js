import GameObject from 'phaser';

class BootScene extends GameObject.Scene {
	constructor(){
		super({
		    key: 'BootScene'
		});
	}

	preload (){
        this.load.image('logo', 'assets/logo.png');
        this.load.spritesheet('pokemon', 'assets/bulbasour.png', { frameWidth: 29, frameHeight: 29, endFrame: 16 });
        this.load.spritesheet('roll', 'assets/roll.png', { frameWidth: 38, frameHeight: 33, endFrame: 36 });
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48, endFrame: 28 });
        this.load.spritesheet('button-a', 'assets/button-a2.png', { frameWidth: 16, frameHeight: 16, endFrame: 1 });
        this.load.spritesheet('arrow', 'assets/arrow.png', { frameWidth: 16, frameHeight: 25, endFrame: 1 });
        this.load.spritesheet('torch', 'assets/torch.png', { frameWidth: 16, frameHeight: 24, endFrame: 9 });
        this.load.image('fadeout', 'assets/fadeout.png');
        this.load.image('cv', 'assets/cv-image.png');
        this.load.image('papiro-item', 'assets/papiro-item.png');
        this.load.image('firelighters', 'assets/firelighters.png');
        this.load.image('firelighters-item', 'assets/firelighters-item.png');
        this.load.image('question-item', 'assets/question.png');
        this.load.image('monster', 'assets/monster.png');
        this.load.image('jobs', 'assets/jobs.png');
        this.load.image('collider', 'assets/collide.png');
        this.load.image('magician', 'assets/magician.png');
        this.load.image('green_fountain', 'assets/green_fountain.png');
        this.load.image('dialogbox', 'assets/dialog.png');
        this.load.image('dungeon_tile', 'assets/tiles/0x72_16x16DungeonTileset.v4.png');
        this.load.image('dungeon_tile_walls', 'assets/tiles/0x72_16x16DungeonTileset_walls.v1.png');
        this.load.tilemapTiledJSON('stage1', 'assets/tiles/map.json');

        var progress = this.add.graphics();
        
        document.querySelector('.loading').innerHTML = "";

        var colors = [0x000000, 0x111111, 0x222222, 0x333333, 0x444444, 0x555555, 0x666666, 0x777777, 0x888888, 0x999999, 
                    0xaaaaaa, 0xbbbbbb, 0xcccccc, 0xdddddd, 0xeeeeee, 0xffffff];

        this.load.on('progress', function (value) {

            progress.clear();
            for(let i = 1; i < colors.length; i++){
                progress.fillStyle(colors[i], 1);
                progress.fillRect(200, 260 + (i * 5), 400 * value, 5);
            }
            

        });

        this.load.on('complete', () => {

            setTimeout(() => {
                progress.destroy();
                setTimeout(() => this.scene.start('MainScene'), 1000);
            }, 1000)

        });
    }

    create (){
	}
}

export default BootScene;