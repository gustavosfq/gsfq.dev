export var setAnims = (context) => {
	console.log('context', context);
	//Player
	context.anims.create({
	    key: 'down',
	    frames: context.anims.generateFrameNumbers('player', { frames: [21, 22, 23, 22]}),
	    frameRate: 8,
	    repeat: -1
	});
	context.anims.create({
	    key: 'left',
	    frames: context.anims.generateFrameNumbers('player', { frames: [14, 15, 16, 17]}),
	    frameRate: 8,
	    repeat: -1
	});
	context.anims.create({
	    key: 'right',
	    frames: context.anims.generateFrameNumbers('player', { frames: [14, 15, 16, 17]}),
	    frameRate: 8,
	    repeat: -1
	});
	context.anims.create({
	    key: 'up',
	    frames: context.anims.generateFrameNumbers('player', { frames: [21, 22, 23, 22]}),
	    frameRate: 8,
	    repeat: -1
	});

	//Torch
	context.anims.create({
        key: 'on',
        frames: context.anims.generateFrameNumbers('torch', { frames: [1, 2, 3, 4, 5, 6, 7, 8]}),
        frameRate: 8,
        repeat: -1
    });

    context.anims.create({
        key: 'off',
        frames: context.anims.generateFrameNumbers('torch', { frames: [0]}),
        frameRate: 0,
        repeat: 0
    });
} 