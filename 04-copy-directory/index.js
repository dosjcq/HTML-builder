let fs = require("fs");

deleteAllFiles("04-copy-directory/files-copy");

fs.mkdir("04-copy-directory/files-copy", (err) => {
  if (err) {
    console.log(err);
  }
  fs.mkdir("04-copy-directory/files-copy", (err) => {
    if (err) throw err;
  });
});

getAllFiles("04-copy-directory/files");

function getAllFiles(folderDir) {
  fs.readdir(folderDir, (err, files) => {
    if (err) throw err;

    // console.log(files);

    for (let file of files) {
      // fs.stat(folderDir + "/" + file, (err, stats) => {
      //   if (err) throw err;
      // });
      fs.copyFile(
        `04-copy-directory/files/${file}`,
        `04-copy-directory/files-copy/${file}`,
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
}

function deleteAllFiles(folderDir) {
  fs.readdir(folderDir, (err, files) => {
    if (err) throw err;

    // console.log(files);

    for (let file of files) {
      fs.unlink(`${folderDir}/${file}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
    }
  });
}
