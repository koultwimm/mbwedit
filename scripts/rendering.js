const renderers = {
	default: function (states) {
		const block = states.type;
		const state = states.states1;
		return getTexture(block, state);
	},
	furnace: function (states) {
		const fuelTimer = states.toSmelt.fuelTimer;
		return getTexture(states.type, fuelTimer > 0);
	},
	brewingStand: function (states) {
		const toBrew = states.toBrew;
		let items = 0;
		if (toBrew != null) {
			for (let i = 0; i < 3; i++) {
				if (mbwom.isEmptyItem(toBrew.output[i])) items++;
			}
		}
		return getTexture(states.type, items);
	},
	liquid: function (states) {
		const water = states.water;
		let variant;
		if (water != null) {
			if (water[0] > water[1]) variant = 10 - water[0];
			if (water[0] < water[1]) variant = 10 - water[1] + "n";
		}
		return getTexture(states.type, variant);
	},
	wheat: function (states) {
		return getTexture(states.type, states.wheat);
	},
}

function getTexture(block, variant) {
	const textureID = `${block}_${variant}`;
	let texture = texturesMap[textureID];
	if (texture == null) {
		texture = texturesMap[block];
	}
	if (texture == null) {
		console.log("block not found", block, variant)
		texture = texturesMap.missing;
	}
	return texture;
}

const blockData = {
	staircs: renderers.default,
	stairr: renderers.default,
	stairn: renderers.default,
	stairbrick: renderers.default,
	stairwp: renderers.default,
	stairsb: renderers.default,
	stairib: renderers.default,
	stairgb: renderers.default,
	stairdb: renderers.default,
	stairob: renderers.default,
	stairbr: renderers.default,
	stairbbb: renderers.default,
	halfcs: renderers.default,
	halfr: renderers.default,
	halfn: renderers.default,
	halfbrick: renderers.default,
	halfwp: renderers.default,
	halfsb: renderers.default,
	halfib: renderers.default,
	halfgb: renderers.default,
	halfdb: renderers.default,
	halfob: renderers.default,
	halfbr: renderers.default,
	halfbbb: renderers.default,
	pf: renderers.default,
	anvil: renderers.default,
	dr1: renderers.default,
	dr3: renderers.default,
	idr1: renderers.default,
	idr3: renderers.default,
	bdr1: renderers.default,
	bdr3: renderers.default,
	th: renderers.default,
	lant: renderers.default,
	ortorch: renderers.default,
	piston: renderers.default,
	piston1: renderers.default,
	piston2: renderers.default,
	spiston: renderers.default,
	spiston1: renderers.default,
	spiston2: renderers.default,
	dispense: renderers.default,
	dropper: renderers.default,
	hay: renderers.default,
	pk: renderers.default,
	wd: renderers.default,
	cake: renderers.default,
	ccake: renderers.default,
	cloth: renderers.default,
	bdcloth: renderers.default,
	bed1: renderers.default,
	bed2: renderers.default,
	carpet: renderers.default,
	gs: renderers.default,
	bdgs: renderers.default,
	dt: renderers.default,
	cmp: renderers.default,
	cauldron: renderers.default,
	fice: renderers.default,
	fncg: renderers.default,
	nfncg: renderers.default,
	wr: renderers.liquid,
	oven: renderers.furnace,
	brew: renderers.brewingStand,
	la: renderers.liquid,
	ad: renderers.liquid,
 seed: renderers.wheat,
	potato: renderers.wheat,
	carrot: renderers.wheat,
	nw: renderers.wheat,
	bseed: renderers.wheat,
}