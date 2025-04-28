const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

canvas.width = 960;
canvas.height = 480;

const tileset = new Image;
tileset.src = "blocks.png";

const grid = { width: 60, height: 30 }

const tileSize = canvas.width / grid.width;

const camera = { x: 0, y: 148, speed: 1 }

const mbw = {
 decode: function (string) {
  var decodedString = "";
  for (var a = 0, b = string.length; a < b;) {
   var c = a++;
   var characterCode = string.charCodeAt(c) - (c * 5 % 33 + 1);
   decodedString += String.fromCodePoint(characterCode);
  }
  return decodedString;
 },
 encode: function (string) {
  var encodedString = "";
  for (var a = 0, b = string.length; a < b;) {
   var c = a++;
   var characterCode = string.charCodeAt(c) + (c * 5 % 33 + 1);
   encodedString += String.fromCodePoint(characterCode);
  }
  return encodedString;
 }
}

function initializeWorldCache() {
 window.worldCache = [];
 for (let x = 0; x < mbwom.scene.length; x++) {
  worldCache[x] = [];
  for (let y = 0; y < mbwom.scene[x].length; y++) {
   renderBlock(x, y);
  }
 }
}

function renderBlock(x, y) {
 if (!worldCache[x]) {
  worldCache[x] = []
 }
 const states = mbwom.getBlockState(x, y);
 const block = states.type;
 if (block != null) {
  const renderer = blockData[block] || renderers.default;
  worldCache[x][y] = renderer(states);
 } else {
  delete worldCache[x][y]
 }
}

function drawBlock(object, x, y, width, height) {
 ctx.drawImage(tileset, object.x, object.y, 16, 16, x, y, width, height);
}

function getTexture(block) {
 const texture = textures[block] || textures.missing;
 return { ...texture };
}

function drawWorld() {
 for (let x = 0; x < grid.width; x++) {
  for (let y = 0; y < grid.height; y++) {
   const currentX = x + camera.x;
   const currentY = y + camera.y;
   const blockObject = getBlockObject(currentX, currentY);
   if (blockObject != null) {
    drawBlock(blockObject, x * tileSize, canvas.height - y * tileSize, tileSize, -tileSize)
   }
  }
 }
}

function getBlockObject(x, y) {
 if (worldCache[x]) {
  return worldCache[x][y];
 }
}

function mainLoop() {
 mouse.calculateCoordinates();
 cameraMovement();
 if (mouse.right) {
  brush(mouse.worldX, mouse.worldY);
 }
 if (mouse.left) {
  eraser(mouse.worldX, mouse.worldY);
 }
 ctx.fillStyle = "#778fa5";
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 drawWorld();
 ctx.fillStyle = "#000";
 ctx.font = "16px Monospace";
 ctx.fillText(`X: ${mouse.worldX} Y: ${mouse.worldY}`, 10, 20);
 ctx.fillText(`Size: ${shapeIndex}`, 10, 40);
 ctx.fillText(`Slot 0:`, 10, 60);
 ctx.fillText(`Slot 1:`, 10, 80);
 drawBlock({ x: 0, y: 3232 }, mouse.blockX * tileSize, canvas.height - mouse.blockY * tileSize, tileSize, -tileSize);
 let states = slots[0];;
 let block = states.type;
 if (block != null) {
  const renderer = blockData[block] || renderers.default;
  const blockObject = renderer(states);
  drawBlock(blockObject, 80, 48, 16, 16);
 }
 states = slots[1];
 block = states.type;
 if (block != null) {
  const renderer = blockData[block] || renderers.default;
  const blockObject = renderer(states);
  drawBlock(blockObject, 80, 68, 16, 16);
 }
 requestAnimationFrame(mainLoop);
}

document.getElementById("dimensionSelect").addEventListener("change", function () {
 const sceneIndex = parseInt(this.value, 10);
 mbwom.loadScene(sceneIndex);
 initializeWorldCache();
});