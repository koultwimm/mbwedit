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
 },
 export: function () {
  if (mbwom.world) {
   const jsonString = JSON.stringify(mbwom.world);
   const text = mbw.encode(jsonString);
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
