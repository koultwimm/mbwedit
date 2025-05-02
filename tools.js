let shapeIndex = 0;

let slotIndex = 0;

const hotbar = [
 {
  type: "db",
 },
 {
  type: "gb",
 },
 {
  type: "ib",
 },
 {
  type: "clb",
 },
 {
  type: "tob",
 },
 {
  type: "lapb",
 },
 {
  type: "j",
 },
 {
  type: "fire",
 },
 {
  type: "b",
 },
]

function drawHotbar() {
 let x = hotbarOffset.x + 3;
 ctx.drawImage(hotbarImage, hotbarOffset.x, hotbarOffset.y);
 ctx.drawImage(slot, hotbarOffset.x + 20 * slotIndex, hotbarOffset.y);
 hotbar.forEach((states, index) => {
  drawBlock(
   getBlockObject(states),
   {x: (x + index * 20), y: hotbarOffset.y + 3, width: 16, height: 16}
  );
 });
}

function eyedropper(x, y) {
 const states = structuredClone(mbwom.getBlockState(x, y));
 if (states.type != null) hotbar[slotIndex] = states;
}

function eraser(x, y) {
 setShape(x, y, shapes[shapeIndex], { type: null });
}

function brush(x, y) {
 setShape(x, y, shapes[shapeIndex], hotbar[slotIndex]);
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

