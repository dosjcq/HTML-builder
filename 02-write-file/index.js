const readline = require("readline");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "text.txt");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let writeableStream;

console.log("What languages do you know? ");

rl.on("line", (line) => {
  if (line === "exit" || line === "EXIT") {
    process.exit();
  }
  if (!writeableStream) writeableStream = fs.createWriteStream(filePath);
  writeableStream.write(`${line} \n`);
});

process.on("exit", () => console.log("\bGood buy!"));
process.on("SIGINT", () => exit());
