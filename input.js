const keys = {
	w: false,
	s: false,
	d: false,
	a: false,
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
	console.log(mbwom.getBlockState(mouse.blockX, mouse.blockY))
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

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
