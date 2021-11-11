const fs = require("fs");
let path = require("path");
path = "./04-copy-directory";
let newPath = "";
let lvl = 0;

function newFunc(path, lvl) {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < files.length; i++) {
      let currentFile = files[i];
      let fileNameArray = currentFile.name.split(".");
      let currentFilePath = path + "/" + currentFile.name;
      fs.stat(currentFilePath, (err, stats) => {
        if (err) {
          console.log(`No files in folder`);
        } else {
          if (stats.isDirectory()) {
            if (currentFile.name.indexOf("-copy") < 0)
              mkdir(path + "/" + currentFile.name + "-copy");
            newFunc(path + "/" + currentFile.name, lvl + 1);
          } else if (
            lvl > 0 &&
            stats.isFile() &&
            currentFile.name.indexOf("-copy") < 0
          ) {
            let pathToCopy =
              path +
              "-copy" +
              "/" +
              fileNameArray[0] +
              "-copy" +
              "." +
              fileNameArray[1];
            fs.copyFile(currentFilePath, pathToCopy, (err) => {
              if (err) {
                console.log("No Files In Folder!");
              }
            });
          }
        }
      });
    }
  });
}
function mkdir(newPath) {
  console.log("%c⧭", "color: #bfffc8", newPath);
  fs.mkdir(newPath, function (err) {
    if (err) {
      return console.log("Directory refreshed successfully!");
    }
    console.log("Directory created successfully!");
  });
}
newFunc(path, lvl);
