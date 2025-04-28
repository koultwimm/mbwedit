const keys = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false,
	KeyC: false,
	ShiftLeft: false,
	Tab: false,
	KeyQ: false,
	KeyE: false
}

const mouse = {
	x: null,
	y: null,
	blockX: null,
	blockY: null,
	worldX: null,
	worldY: null,
	right: false,
	left: false,
	calculateCoordinates: function () {
		this.blockX = Math.floor(this.x / tileSize);
		this.blockY = Math.floor(this.y / tileSize);
		this.worldX = camera.x + this.blockX;
		this.worldY = camera.y + this.blockY;
	}
}

function handleKeyDown(event) {
	const key = event.key.toLowerCase();
	if (key in keys) {
		event.preventDefault();
		keys[key] = true;
		if (key == 3) {
			selectedTool = "Eyedropper";
		}
		if (key == 2) {
			selectedTool = "Eraser";
		}
		if (key == 1) {
			selectedTool = "Brush";
		}
	}
}

function handleMouseMove(event) {
	mouse.x = event.offsetX;
	mouse.y = canvas.height - event.offsetY;
}

function handleMouseDown(event) {
	mouse.holding = true;
	if (selectedTool == "Eyedropper" && mbwom.world) {
		eyedropper(mouse.blockX, mouse.blockY);
	}
}

function handleMouseUp(event) {
	mouse.holding = false;
}

function cameraMovement() {
	if (keys.KeyW) camera.y += camera.speed;
	if (keys.KeyS) camera.y -= camera.speed;
	if (keys.KeyD) camera.x += camera.speed;
	if (keys.KeyA) camera.x -= camera.speed;
}

function teleportSwitch() {
	if (!tpToggle) {
		lastPosition[0].x = camera.x;
		lastPosition[0].y = camera.y;
		if (!firstTime) {
			camera.x = lastPosition[1].x;
			camera.y = lastPosition[1].y;
		}
		tpToggle = true;
	} else {
		lastPosition[1].x = camera.x;
		lastPosition[1].y = camera.y;
		camera.x = lastPosition[0].x;
		camera.y = lastPosition[0].y;
		tpToggle = false;
		firstTime = false;
	}
}

let tpToggle = false;

let firstTime = true;

let lastPosition = [
	{},
	{}
]

window.addEventListener("keydown", function (event) {
	if (keys.hasOwnProperty(event.code)) {
		keys[event.code] = true;
		if (keys.Tab) {
			teleportSwitch();
			event.preventDefault();
		}
		if (keys.KeyC) {
			eyedropper(mouse.worldX, mouse.worldY);
		}
		if (keys.KeyQ) {
			shapeIndex = (shapeIndex - 1 + 4) % 4;
		}
		if (keys.KeyE) {
			shapeIndex = (shapeIndex + 1) % 4;
		}
		if (keys.ShiftLeft) {
			swapSlots();
		}
	}
});

window.addEventListener("keyup", function (event) {
	if (keys.hasOwnProperty(event.code)) {
		keys[event.code] = false;
	}
});

canvas.addEventListener("mousemove", function handleMouseMove(event) {
	mouse.x = event.offsetX;
	mouse.y = canvas.height - event.offsetY;
});

canvas.addEventListener("mousedown", function (event) {
	if (event.button == 0) {
		mouse.left = true;
	}
	if (event.button == 2) {
		mouse.right = true;
	}
});

window.addEventListener("mouseup", function (event) {
	if (event.button == 0) {
		mouse.left = false;
	}
	if (event.button == 2) {
		mouse.right = false;
	}
});

canvas.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});