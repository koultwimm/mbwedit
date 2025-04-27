const blocksShortcut = ["missing", "br", "r", "cs", "ms", "sb", "ob", "gv", "dmore", "gd", "in", "clore", "rs", "os", "to", "lap", "db", "gb", "ib", "clb", "tob", "lapb", "th", "ladder", "rp", "sign", "st", "craft", "oven", "chest", "echest", "enchant", "brew", "cauldron", "anvil", "cmp", "dt", "farm", "myc", "cdt", "gdt", "wd", "wp", "sl", "gasd", "lv", "lv1", "lv2", "lv3", "lv4", "snow", "snowblock", "ice", "sw", "coral", "lp", "lant", "rstorch", "button", "lever", "pp", "wpp", "piston", "piston1", "piston2", "spiston", "spiston1", "spiston2", "dispense", "dropper", "note", "light", "TNT", "rail", "railp", "raila", "raild", "dr2", "dr4", "idr2", "idr4", "bdr2", "bdr4", "dr1", "dr3", "idr1", "idr3", "bdr1", "bdr3", "td1", "td2", "ibar", "fnc", "fncg", "nfnc", "nfncg", "lgr", "shrub", "ds", "bb", "sc", "moss", "fw1", "fw2", "ms1", "msb3", "msb4", "ms2", "msb1", "msb2", "ss", "sd", "cy1", "bricks", "ct", "n", "nb", "rnb", "ssd", "portalstone", "portal", "glow", "boneb", "web", "mobSpawner", "ortorch", "pf", "es", "egem", "hcl", "dsb", "degg", "mel", "bbb", "books", "slimeb", "lemonb", "hay", "jl", "nwb", "pseed", "pk", "j", "b", "mh", "cake", "ccake", "seed", "carrot", "potato", "bseed", "nw", "wseed", "ad", "la", "wr", "staircs", "stairr", "stairn", "stairbrick", "stairwp", "stairsb", "stairib", "stairgb", "stairdb", "stairob", "stairbr", "stairbbb", "halfcs", "halfr", "halfn", "halfbrick", "halfwp", "halfsb", "halfib", "halfgb", "halfdb", "halfob", "halfbr", "halfbbb", "fice", "magma", "fire", "rsd", "bed1", "bed2", "gs", "cloth", "carpet", "bdgs", "bdcloth", "bdwp", "bdbricks", "bdbbb", "bdbooks", "bdr", "bdcs", "bdnb", "bdsb", "bdob", "bddt", "wd1"];

const textures = {};
blocksShortcut.forEach((blocksShortcut, index) => {
	textures[blocksShortcut] = { x: 0, y: index * 16 };
});

textures.wr.x = 96;
textures.la.x = 64;
textures.ad.x = 64;

const renderers = {
	default: function (states) {
		return getTexture(states.type);
	},
	incrase: function (states) {
		const state = states.states1;
		const texture = getTexture(states.type);
		if (areNumbers([state])) {
			texture.x += (state - 1) * 16;
		}
		return texture;
	},
	container: function (states) {
		const state = states.states1;
		const texture = getTexture(states.type);
		if (areNumbers([state])) {
			texture.x += state * 16;
		}
		return texture;
	},
	wool: function (states) {
		const color = states.states1;
		const texture = getTexture(states.type);
		if (color != null) {
			texture.x += colorIndex[color];
		}
		return texture;
	},
	glass: function (states) {
		const color = states.states1;
		const texture = getTexture(states.type);
		if (color != null) {
			texture.x += colorIndex[color] + 16;
		}
		return texture;
	},
	dirt: function (states) {
		const state = states.states1;
		const texture = getTexture(states.type);
		if (state == 1) {
			texture.x += 16;
		}
		return texture;
	},
	furnace: function (states) {
		const fuelTimer = states.toSmelt.fuelTimer;
		const texture = getTexture(states.type);
		if (fuelTimer > 0) {
			texture.x += 16;
		}
		return texture;
	},
	brewingStand: function (states) {
		const texture = getTexture(states.type);
		const toBrew = states.toBrew;
		if (toBrew != null) {
			for (let i = 0; i < 3; i++) {
				if (mbwom.isEmptyItem(toBrew.output[i])) {
					texture.x += 16;
				}
			}
		}
		return texture;
	},
	boolean: function (states) {
		const texture = getTexture(states.type);
		if (states.states1 == true) {
			texture.x += 16;
		}
		return texture;
	},
	liquid: function (states) {
		const texture = getTexture(states.type);
		const water = states.water;
		if (water != null) {
			if (water[0] > water[1]) {
				texture.x += (9 - water[1]) * 16
			}
			if (water[0] < water[1]) {
				texture.x -= (9 - water[0]) * 16
			}
		}
		return texture;
	},
	wheat: function (states) {
		const texture = getTexture(states.type);
		const wheat = states.wheat;
		if (areNumbers([wheat])) {
			texture.x += (wheat - 1) * 16;
		}
		return texture;
	},
}

const blockData = {
	staircs: renderers.incrase,
	stairr: renderers.incrase,
	stairn: renderers.incrase,
	stairbrick: renderers.incrase,
	stairwp: renderers.incrase,
	stairsb: renderers.incrase,
	stairib: renderers.incrase,
	stairgb: renderers.incrase,
	stairdb: renderers.incrase,
	stairob: renderers.incrase,
	stairbr: renderers.incrase,
	stairbbb: renderers.incrase,
	halfcs: renderers.incrase,
	halfr: renderers.incrase,
	halfn: renderers.incrase,
	halfbrick: renderers.incrase,
	halfwp: renderers.incrase,
	halfsb: renderers.incrase,
	halfib: renderers.incrase,
	halfgb: renderers.incrase,
	halfdb: renderers.incrase,
	halfob: renderers.incrase,
	halfbr: renderers.incrase,
	halfbbb: renderers.incrase,
	pf: renderers.incrase,
	anvil: renderers.incrase,
	dr2: renderers.incrase,
	dr4: renderers.incrase,
	idr2: renderers.incrase,
	idr4: renderers.incrase,
	bdr2: renderers.incrase,
	bdr4: renderers.incrase,
	dr1: renderers.incrase,
	dr3: renderers.incrase,
	idr1: renderers.incrase,
	idr3: renderers.incrase,
	bdr1: renderers.incrase,
	bdr3: renderers.incrase,
	th: renderers.incrase,
	lant: renderers.incrase,
	ortorch: renderers.incrase,
	piston: renderers.incrase,
	piston1: renderers.incrase,
	piston2: renderers.incrase,
	spiston: renderers.incrase,
	spiston1: renderers.incrase,
	spiston2: renderers.incrase,
	dispense: renderers.incrase,
	dropper: renderers.incrase,
	hay: renderers.incrase,
	pk: renderers.incrase,
	wd: renderers.incrase,
	cloth: renderers.wool,
	bdcloth: renderers.wool,
	bed1: renderers.wool,
	bed2: renderers.wool,
	carpet: renderers.wool,
	gs: renderers.glass,
	bdgs: renderers.glass,
	dt: renderers.dirt,
	oven: renderers.furnace,
	cmp: renderers.container,
	cauldron: renderers.container,
	fice: renderers.container,
	brew: renderers.brewingStand,
	fncg: renderers.boolean,
	nfncg: renderers.boolean,
	wr: renderers.liquid,
	la: renderers.liquid,
	ad: renderers.liquid,
 seed: renderers.wheat,
}

const colorIndex = {
	white: 0,
	lightgray: 16,
	gray: 32,
	black: 48,
	brown: 64,
	purple: 80,
	magenta: 96,
	red: 112,
	orange: 128,
	pink: 144,
	yellow: 160,
	lightgreen: 176,
	green: 192,
	cyan: 208,
	lightblue: 224,
	blue: 240,
	rainbow: 256
}