const mbwom = {
	sceneList: [
		"chickenNum",
		"spawnskinNum",
		"mobNum",
		"ghastNum",
		"blazeNum",
		"hasSignal",
		"snowgolemNum",
		"cowNum",
		"skeletonNum",
		"pigNum",
		"shurikens",
		"onFire",
		"mobs",
		"batNum",
		"nethereyeNum",
		"rabbitNum",
		"wheat",
		"states",
		"toBrew",
		"spears",
		"creeperNum",
		"water",
		"carts",
		"toGrow",
		"playingTNT",
		"drops",
		"balloons",
		"flameballs",
		"slimeNum",
		"fireballs",
		"seedNum",
		"sceneNum",
		"toSmelt",
		"rafts",
		"signs",
		"wolfNum",
		"endermanNum",
		"chests",
		"snowballs",
		"fallingBlockNum",
		"fallingBlocks",
		"xpOrbs",
		"scene",
		"sheepNum",
		"enderdragonNum",
		"magmacubeNum",
		"arrows",
		"spiderNum",
		"zombieNum",
		"splashPotions",
		"firstTimes",
		"spawnPoint",
		"zombiepigmanNum",
		"squidNum"
	],
	loadScene: function (index) {
		for (let i = 0; i < this.sceneList.length; i++) {
			const element = this.sceneList[i];
			this[element] = this.world[element + index];
		}
	},
	getBlock: function (x, y) {
		if (this.scene[x]) {
			return this.scene[x][y];
		}
	},
	setBlock: function (x, y, id) {
		if (!this.scene[x]) {
			this.scene[x] = [];
		}
		this.scene[x][y] = id;
	},
	getBlockState: function (x, y) {
		const id = `blockX${x}Y${y}`;
		const state = {
			type: this.getBlock(x, y),
			states1: this.states[id],
			states2: this.states[id + "_2"],
			states3: this.states[id + "_3"],
			firstTimes: this.firstTimes[id],
			chests: this.chests[id],
			toSmelt: this.toSmelt[id],
			toGrow: this.toGrow[id],
			water: this.water[id],
			wheat: this.wheat[id],
			toBrew: this.toBrew[id],
			signs: this.signs[id],
			hasSignal: this.hasSignal[id]
		}
		return state;
	},
	setBlockState: function (x, y, newState) {
		if (x > -1 && y > -1) {
			const id = `blockX${x}Y${y}`;
			this.setBlock(x, y, newState.type);
			this.states[id] = newState.states1;
			this.states[id + "_2"] = newState.states2;
			this.states[id + "_3"] = newState.states3;
			this.firstTimes[id] = newState.firstTimes;
			this.chests[id] = newState.chests;
			this.toSmelt[id] = newState.toSmelt;
			this.toGrow[id] = newState.toGrow;
			this.water[id] = newState.water;
			this.wheat[id] = newState.wheat;
			this.toBrew[id] = newState.toBrew;
			this.signs[id] = newState.signs;
			this.hasSignal[id] = newState.hasSignal;
		}
	},
	isEmptyItem: function (item) {
		if (item == null) return true;
		if (item[0] == null) return true;
		if (item[0] === "") return true;
		if (item[0] === "air") return true;
		if (item[0] === "na") return true;
		if (item[1] < 1) return true;
		return false;
	},
	traverseShape: function (x, y, shape, handler) {
		for (let i = 0; i < shape.length; i++) {
			for (let j = 0; j < shape[i].length; j++) {
				if (shape[i][j] === 1) {
					const currentX = x + i;
					const currentY = y + j;
					if (currentX >= 0 && currentY >= 0) {
						handler(currentX, currentY);
					}
				}
			}
		}
	},
	setAchievement: function (boolean, index) {
		this.world.achieve[index] = boolean ? 1 : null;
	},
	getAchievement: function (index) {
		return this.world.achieve[index] === 1;
	}
}