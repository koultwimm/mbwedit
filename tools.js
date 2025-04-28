let slots = [
 {
  type: "cs",
 },
 {
  type: "r",
 }
]

function swapSlots() {
 let temp = slots[0];
 slots[0] = slots[1];
 slots[1] = temp;
}

let shapeIndex = 0;

function eyedropper(x, y) {
 slots[0] = structuredClone(mbwom.getBlockState(x, y));
}

function eraser(x, y) {
 setShape(x, y, shapes[shapeIndex], { type: null });
}

function brush(x, y) {
 setShape(x, y, shapes[shapeIndex], slots[0]);
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
    mbwom.setBlockState(currentX, currentY, state);
    renderBlock(currentX, currentY);
   }
  }
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
 ]
]