const mbwom = {
 sceneList: [
  "chickenNum",
  "spawnskinNum",
  "mobNum",
  "ghastNum",
  "blazeNum",
  "hasSignal",
  "snowgolemNum",
  "cowNum",
  "skeletonNum",
  "pigNum",
  "shurikens",
  "onFire",
  "mobs",
  "batNum",
  "nethereyeNum",
  "rabbitNum",
  "wheat",
  "states",
  "toBrew",
  "spears",
  "creeperNum",
  "water",
  "carts",
  "toGrow",
  "playingTNT",
  "drops",
  "balloons",
  "flameballs",
  "slimeNum",
  "fireballs",
  "seedNum",
  "sceneNum",
  "toSmelt",
  "rafts",
  "signs",
  "wolfNum",
  "endermanNum",
  "chests",
  "snowballs",
  "fallingBlockNum",
  "fallingBlocks",
  "xpOrbs",
  "scene",
  "sheepNum",
  "enderdragonNum",
  "magmacubeNum",
  "arrows",
  "spiderNum",
  "zombieNum",
  "splashPotions",
  "firstTimes",
  "spawnPoint",
  "zombiepigmanNum",
  "squidNum"
 ],
 loadScene: function (number) {
  for (let i = 0; i < this.sceneList.length; i++) {
   const element = this.sceneList[i];
   this[element] = this.world[element + number];
  }
 },
 saveScene: function (number) {
  this.world["scene" + number] = this.scene;
  this.world["states" + number] = this.states;
 },
 getBlock: function (x, y) {
  if (this.scene[x]) {
   return this.scene[x][y];
  }
 },
 getBlockState: function (x, y) {
  const id = `blockX${x}Y${y}`;
  const state = {
   type: this.getBlock(x, y),
   states1: this.states[id],
   states2: this.states[id + "_2"],
   states3: this.states[id + "_3"],
   firstTimes: this.firstTimes[id],
   chests: this.chests[id],
   toSmelt: this.toSmelt[id],
   toGrow: this.toGrow[id],
   water: this.water[id],
   wheat: this.wheat[id],
   toBrew: this.toBrew[id],
   signs: this.signs[id],
   hasSignal: this.hasSignal[id]
  }
  return state;
 },
}