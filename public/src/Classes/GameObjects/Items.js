import 'phaser';


class Items {
	constructor(scene) {
		this.POSITION = {
			x: 100,
			y: 45
		};
		
		this.ITEM = {
			width: 36,	
			height: 36	
		};

		this.length = 0;
		this.scene = scene;
		this.list = []
	}

	add(item) {
		this.list.push(item);
		this.listItems()
	}

	listItems() {
		let matrix = this.list.reduce((rows, key, index) => ( index % 2 == 0 ? rows.push([key]) : rows[rows.length-1].push(key) ) && rows, []);
		matrix.forEach((array, i) => {
			array.forEach((item, j) => {
				item.sprite.x = this.POSITION.x + ((j + 1) * this.ITEM.width);
				item.sprite.y = this.POSITION.y + ((i + 1) * this.ITEM.height);
			});
		});	
	}
}

export default Items;