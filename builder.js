var fs = require("fs");
var exe = require("@angablue/exe");
var archiver = require("archiver");

if (fs.existsSync("dist")) {
  fs.rmSync("./dist", { recursive: true });
}
fs.mkdirSync("./dist");

fs.mkdirSync("./dist/bundle");

fs.cpSync("./frontend/dist/frontend/browser", "./dist/bundle/frontend", {
  recursive: true,
});


const build = exe({
  entry: "./index.js",
  out: "./dist/bundle/vBot.exe",
  pkg: ["-C", "GZip"], // Specify extra pkg arguments
  productVersion: "2.4.2",
  fileVersion: "2.4.2",
  target: "latest-win-x64",
  icon: "./favicon.ico", // Application icons must be in .ico format
  properties: {
    FileDescription: "Twitch Bot created by Venfu",
    ProductName: "Twitch Bot created by Venfu",
    LegalCopyright: "Venfu",
    OriginalFilename: "vBot.exe",
  },
});

build.then(() => {
  fs.cpSync("./backend/assets", "./dist/bundle/assets", { recursive: true });
  fs.cpSync("./backend/config.json.tmpl", "./dist/bundle/config.json", { recursive: true });
  var output = fs.createWriteStream("./dist/bundle.zip");
  archive = archiver("zip");
  archive.pipe(output);
  archive.directory("./dist/bundle", false);
  archive.finalize();
  console.log("Build completed!");
});
