const fileManager = {
 input: document.getElementById("file-input"),
 load: function (event) {
  try {
   const jsonString = mbwAlgorithm.decode(event.target.result);
   mbwom.world = JSON.parse(jsonString);
  } catch (error) {
   console.log("Couldn't load world file", error)
  }
  gamemode.value = mbwom.world.gamemode;
  cheats.checked = mbwom.world.cheats;
  hardcore.checked = mbwom.world.hardcore;
  mbwom.loadScene(1);
  for (let i = 0; i < 46; i++) checkboxes[i].checked = mbwom.getAchievement(i);
  initializeWorldCache();
  mainLoop();
 },
 export: function () {
  if (mbwom.world) {
   mbwom.world.gamemode = gamemode.value;
   mbwom.world.cheats = cheats.checked;
   mbwom.world.hardcore = hardcore.checked;
   checkboxes.forEach((checkbox, i) => mbwom.setAchievement(checkbox.checked, i));
   const jsonString = JSON.stringify(mbwom.world);
   const text = mbwAlgorithm.encode(jsonString);
   const blob = new Blob([text], { type: "text/plain" });
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");
   a.href = url;
   a.download = this.file.name;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
  }
 }
}

fileManager.input.addEventListener("change", function (event) {
 fileManager.file = event.target.files[0];
 if (fileManager.file) {
  const reader = new FileReader();
  reader.onload = fileManager.load;
  reader.readAsText(fileManager.file);
 }
});
