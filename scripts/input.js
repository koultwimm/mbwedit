const keys = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false,
	KeyC: false,
	Tab: false,
	KeyQ: false,
	KeyE: false,
	Digit1: false,
	Digit2: false,
	Digit3: false,
	Digit4: false,
	Digit5: false,
	Digit6: false,
	Digit7: false,
	Digit8: false,
	Digit9: false
};

const mouse = {
	canvasX: null,
	canvasY: null,
	gridX: null,
	gridY: null,
	alignedX: null,
	alignedY: null,
	worldX: null,
	worldY: null,
	right: false,
	left: false,
	calculateCoordinates: function () {
		this.alignedX = this.gridX * tileSize;
		this.alignedY = canvas.height - this.gridY * tileSize;
		this.worldX = camera.x + this.gridX;
		this.worldY = camera.y + this.gridY;
	}
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
			shapeIndex = (shapeIndex - 1 + 7) % 7;
		}

		if (keys.KeyE) {
			shapeIndex = (shapeIndex + 1) % 7;
		}
		if (keys.Digit1) slotIndex = 0;
		if (keys.Digit2) slotIndex = 1;
		if (keys.Digit3) slotIndex = 2;
		if (keys.Digit4) slotIndex = 3;
		if (keys.Digit5) slotIndex = 4;
		if (keys.Digit6) slotIndex = 5;
		if (keys.Digit7) slotIndex = 6;
		if (keys.Digit8) slotIndex = 7;
		if (keys.Digit9) slotIndex = 8;
	}
});

window.addEventListener("keyup", function (event) {
	if (keys.hasOwnProperty(event.code)) {
		keys[event.code] = false;
	}
});

canvas.addEventListener("mousemove", (event) => {
	mouse.canvasX = event.offsetX;
	mouse.canvasY = canvas.height - event.offsetY;
	mouse.gridX = Math.floor(mouse.canvasX / tileSize);
	mouse.gridY = Math.floor(mouse.canvasY / tileSize);
})

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