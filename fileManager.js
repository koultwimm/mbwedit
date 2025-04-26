const fileManager = {
 input: document.getElementById("file-input"),
 load: function (event) {
  try {
   const jsonString = mbw.decode(event.target.result);
   mbwom.world = JSON.parse(jsonString);
  } catch (error) {
   console.log("Couldn't load world file", error)
  }
  mbwom.loadScene(1);
  initializeWorldCache();
  mainLoop();
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
