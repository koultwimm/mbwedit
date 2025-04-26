const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 960;
canvas.height = 470;

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
   var characterCode = string.charCodeAt(c) - (c * 5 % 33 + 1);
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
 const states = mbwom.getBlockState(x, y);
 const block = states.type;
 if (block != null) {
  const renderer = blockData[block] || renderers.default;
  worldCache[x][y] = renderer(states);
 }
}

function drawBlock(object, x, y, width, height) {
 ctx.drawImage(tileset, object.x, object.y, 16, 16, x, y, width, height);
}

function getTexture(block) {
 const texture = textures[block] || textures.missing;
 return {...texture};
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
 mouse.blockX = camera.x + Math.floor(mouse.x / tileSize);
 mouse.blockY = camera.y + Math.floor(mouse.y / tileSize);
 ctx.fillStyle = "#778fa5";
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 cameraMovement();
 drawWorld();
 ctx.fillStyle = "#000";
 ctx.font = "20px arial";
 ctx.fillText(`X: ${mouse.blockX} Y: ${mouse.blockY}`, 10, 25);
 requestAnimationFrame(mainLoop);
}

document.getElementById("dimensionSelect").addEventListener("change", function () {
 const sceneIndex = parseInt(this.value, 10);
 mbwom.loadScene(sceneIndex);
 initializeWorldCache();
});