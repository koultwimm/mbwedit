const keys = {
	w: false,
	s: false,
	d: false,
	a: false,
	e: false,
	1: false,
	2: false,
	3: false
}

const mouse = {
	x: null,
	y: null,
	blockX: null,
	blockY: null,
	holding: false,
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
		if (key == "e") {
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
	}
}

function handleKeyUp(event) {
	const key = event.key.toLowerCase();
	if (key in keys) {
		event.preventDefault();
		keys[key] = false;
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
	if (keys.w) camera.y += camera.speed;
	if (keys.s) camera.y -= camera.speed;
	if (keys.d) camera.x += camera.speed;
	if (keys.a) camera.x -= camera.speed;
}

let tpToggle = false;

let firstTime = true;

let lastPosition = [
	{},
	{}
]

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
