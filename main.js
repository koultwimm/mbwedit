const canvas = document.getElementById("canvas");
canvas.width = 960;
canvas.height = 480;

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const images = {
 names: [
  "blocks",
  "hotbar",
  "slot"
 ]
}

images.names.forEach((name) => {
 images[name] = new Image;
 images[name].src = `assets/${name}.png`;
});

const grid = {
 width: 60,
 height: 30
}

let tileSize = canvas.width / grid.width;

const camera = { x: 0, y: 148, speed: 1 }

function initializeWorldCache() {
 window.worldCache = [];
 for (let x = 0; x < mbwom.scene.length; x++) {
  for (let y = 0; y < mbwom.scene[x].length; y++) {
   renderBlock(x, y);
  }
 }
}

function renderBlock(x, y) {
 if (!worldCache[x]) worldCache[x] = [];
 const states = mbwom.getBlockState(x, y);
 if (states.type != null) {
  worldCache[x][y] = getBlockObject(states);
 } else {
  delete worldCache[x][y]
 }
}

function drawBlock(texture, values) {
 ctx.drawImage(images.blocks, texture.x, texture.y, 16, 16, values.x, values.y, values.width, values.height);
}

function drawWorld() {
 for (let x = 0; x < grid.width; x++) {
  for (let y = 0; y < grid.height; y++) {
   const currentX = x + camera.x;
   const currentY = y + camera.y;
   const blockObject = getBlockCache(currentX, currentY);
   if (blockObject != null) {
    const values = {
     x: x * tileSize,
     y: canvas.height - y * tileSize,
     width: tileSize,
     height: -tileSize,
    }
    drawBlock(blockObject, values);
   }
  }
 }
}

function getBlockCache(x, y) {
 if (worldCache[x]) {
  return worldCache[x][y];
 }
}

function getBlockObject(states) {
 const renderer = blockData[states.type] || renderers.default;
 return renderer(states);
}

function fillRect(x, y, width, height, color) {
 ctx.fillStyle = color;
 ctx.fillRect(x, y, canvas.width, canvas.height);
}

function fillText(string, x, y, font, size, color) {
 ctx.fillStyle = color;
 ctx.font = `${size}px ${font}`;
 ctx.fillText(string, x, y);
}

function drawBackgrond() {
 fillRect(0, 0, canvas.width, canvas.height, "#778fa5");
 ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawUI() {
 fillText(`X: ${mouse.worldX} Y: ${mouse.worldY}`, 10, 20, "Monospace", 16, "#000");
 fillText(`Tool size: ${shapeIndex}`, 10, 40, "Monospace", 16, "#000");
 drawBlock(
  { x: 0, y: 3232 },
  { x: mouse.alignedX, y: mouse.alignedY, width: tileSize, height: -tileSize }
 );
}

function mainLoop() {
 mouse.calculateCoordinates();
 cameraMovement();
 mineAndPlace();
 drawBackgrond();
 drawWorld();
 drawUI();
 drawHotbar();
 requestAnimationFrame(mainLoop);
}

document.getElementById("dimension").addEventListener("change", function () {
 if (mbwom.world) {
  const sceneIndex = parseInt(this.value);
  if (mbwom.world["scene" + sceneIndex]) {
   mbwom.loadScene(sceneIndex);
   initializeWorldCache();
  }
 }
});