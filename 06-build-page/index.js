const path = require("path");
const fsProm = require("fs/promises");
const fs = require("fs");

//variables project dist
const projectDist = path.join(__dirname, "/project-dist");
const dist = path.join(__dirname, "/project-dist/");
const projectDistIndex = path.join(__dirname, "project-dist/index.html");
const projectDistStyle = path.join(__dirname, "project-dist/style.css");

//variables Index.html(tags)
const components = path.join(__dirname, "components");

//variables assets
const assets = path.join(__dirname, "/assets/");

//variables assets copy
const assetsCopy = path.join(__dirname, "/project-dist/assets/");

const Styles = path.join(__dirname, "/styles");

fs.readdir(projectDist, (err, items) => {
  if (!err) {
    removeDist();
  } else {
    createItem();
    createAssets();
    creatStyleCss();
    replaceTempTags();
  }
});

async function removeDist() {
  await fs.rm(projectDist, { force: true, recursive: true }, (err) => {
    if (err) {
      console.log("The folder cant remove");
    } else {
      createItem();
      createAssets();
      creatStyleCss();
      replaceTempTags();
    }
  });
}

async function createItem() {
  await fs.mkdir(projectDist, { recursive: true }, (err) => {
    if (err) throw err;
  });
  await fs.open(projectDistIndex, "w", (err) => {
    if (err) throw err;
  });
  await fs.open(projectDistStyle, "w", (err) => {
    if (err) throw err;
  });
}

async function createAssets() {
  await fs.mkdir(assetsCopy, (err) => {
    if (err) console.log("The folder already exists");
  });
  await fs.readdir(assets, (err, files) => {
    for (const file of files) {
      fs.mkdir(path.join(assetsCopy, file), { recursive: true }, (err) => {
        if (err) throw err;
      });
      const assetsFolder = path.join(assets, file);
      const assetsCopyFolder = path.join(assetsCopy, file);
      fs.readdir(assetsFolder, (err, items) => {
        for (const item of items) {
          fs.copyFile(
            path.join(assetsFolder, item),
            path.join(assetsCopyFolder, item),
            fs.constants.COPYFILE_EXCL,
            (err) => {
              if (err) {
                process.exit();
              }
            }
          );
        }
      });
    }
  });
}

async function replaceTempTags() {
  await fs.readFile(
    path.join(__dirname, "template.html"),
    "utf-8",
    async (e, data) => {
      let template = data;
      await fs.readdir(components, (err, files) => {
        files.forEach((file) => {
          const tag = `{{${file.substring(0, file.length - 5)}}}`;
          fs.readFile(path.join(components, file), "utf-8", (err, data) => {
            if (template.includes(tag)) {
              template = template.replace(tag, data);
              fs.writeFile(projectDistIndex, template, (err) => {
                if (err) throw err;
              });
            }
          });
        });
      });
    }
  );
}

async function creatStyleCss() {
  await fs.readdir(Styles, (err, files) => {
    for (const file of files) {
      if (path.extname(file) === ".css") {
        fs.readFile(path.join(Styles, file), "utf-8", (err, data) => {
          if (err) {
            process.exit();
          }
          fs.appendFile(projectDistStyle, `${data} \n`, (err) => {
            if (err) throw err;
          });
        });
      }
    }
  });
}
