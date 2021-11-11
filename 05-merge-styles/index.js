let fs = require("fs");
const path = require("path");

deleteFile("05-merge-styles/project-dist");
// let stream = fs.createReadStream(folderDir)
getAllFiles("05-merge-styles/styles");

function getAllFiles(folderDir) {
  fs.readdir(folderDir, (err, files) => {
    if (err) throw err;

    // console.log(files);

    for (let file of files) {
      // fs.stat(folderDir + "/" + file, (err, stats) => {
      //   if (err) throw err;
      // });
      console.log(file);
      if (path.extname(folderDir + "/" + file).substr(1) === "css") {
        let stream = fs.createReadStream(`${folderDir}/${file}`);
        stream.on("data", (data) => {
          fs.appendFile(
            `./05-merge-styles/project-dist/bundle.css`,
            data,
            function (err) {
              if (err) throw err;
              console.log("Saved!");
            }
          );
        });
      }
    }
  });
}

function deleteFile(folderDir) {
  fs.readdir(folderDir, (err, files) => {
    if (err) throw err;
    for (let file of files) {
      if (file === "bundle.css") {
        fs.unlink(`${folderDir}/bundle.css`, (err) => {
          if (err) throw err;
          console.log("path/file.txt was deleted");
        });
      }
    }
  });
}
