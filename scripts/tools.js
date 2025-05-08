let shapeIndex = 0;

let slotIndex = 0;

let selecting = false;


const hotbar = {
 offset: {
  x: canvas.width / 2 - 94,
  y: canvas.height - 44,
 },
 slots: [
  {
   type: "db"
  },
  {
   type: "gb"
  },
  {
   type: "ib"
  },
  {
   type: "clb"
  },
  {
   type: "tob"
  },
  {
   type: "lapb"
  },
  {
   type: "j"
  },
  {
   type: "fire"
  },
  {
   type: "b"
  }
 ]
}

function drawHotbar() {
 let x = hotbar.offset.x + 3;
 ctx.drawImage(images.hotbar, hotbar.offset.x, hotbar.offset.y);
 ctx.drawImage(images.slot, hotbar.offset.x + 20 * slotIndex, hotbar.offset.y);
 hotbar.slots.forEach((states, index) => {
  drawBlock(
   getBlockObject(states),
   { x: (x + index * 20), y: hotbar.offset.y + 3, width: 16, height: 16 }
  );
 });
}

function eyedropper(x, y) {
 const states = structuredClone(mbwom.getBlockState(x, y));
 if (states.type != null) hotbar.slots[slotIndex] = states;
}

function eraser(x, y) {
 const shape = shapes[shapeIndex];
 const offset = Math.floor(shape.length / 2);
 const centerX = x - offset;
 const centerY = y - offset;
 mbwom.traverseShape(centerX, centerY, shape, (i, j) => {
  if (mbwom.scene[i]) {
   delete mbwom.scene[i][j];
   renderBlock(i, j);
  }
 });
}

function brush(x, y) {
 const shape = shapes[shapeIndex];
 const offset = Math.floor(shape.length / 2);
 const centerX = x - offset;
 const centerY = y - offset;
 mbwom.traverseShape(centerX, centerY, shape, (i, j) => {
  const state = hotbar.slots[slotIndex]
  mbwom.setBlockState(i, j, state);
  renderBlock(i, j);
 });
}

function setShape(x, y, shape, state) {
 const offset = Math.floor(shape.length / 2);
 const centerX = x - offset;
 const centerY = y - offset;
 for (let i = 0; i < shape.length; i++) {
  for (let j = 0; j < shape[i].length; j++) {
   const value = shape[i][j];
   if (value != 0) {
    const currentX = centerX + i;
    const currentY = centerY + j;
    if (currentX > -1 && currentY > -1) {
     mbwom.setBlockState(currentX, currentY, state);
     renderBlock(currentX, currentY);
    }
   }
  }
 }
}

function mineAndPlace() {
 if (mouse.right) {
  brush(mouse.worldX, mouse.worldY);
 }
 if (mouse.left) {
  eraser(mouse.worldX, mouse.worldY);
 }
}

const shapes = [
 [
  [1]
 ],
 [
  [1, 1],
  [1, 1]
 ],
 [
  [0, 1],
  [1, 1, 1],
  [0, 1]
 ],
 [
  [0, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1]
 ],
 [
  [0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1]
 ],
 [
  [0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1]
 ],
 [
  [0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1]
 ],
 [
  [0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1]
 ],
]

