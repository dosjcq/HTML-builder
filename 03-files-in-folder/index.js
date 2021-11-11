let fs = require("fs");
const path = require("path");

getAllFiles("03-files-in-folder/secret-folder");

function getAllFiles(folderDir) {
  fs.readdir(folderDir, (err, files) => {
    if (err) throw err;

    // console.log(files);

    for (let file of files) {
      fs.stat(folderDir + "/" + file, (err, stats) => {
        if (err) throw err;

        if (!stats.isDirectory()) {
          console.log(
            path.basename(
              folderDir + "/" + file,
              path.extname(folderDir + "/" + file)
            ) +
              " - " +
              path.extname(folderDir + "/" + file).substr(1) +
              " - " +
              `${stats.size / 1024}kb`
          );
        }
      });
    }
  });
}
