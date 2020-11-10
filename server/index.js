const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express(); // create express app

// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/health", (req, res) => {
  res.send("Healthy");
});

app.get("/dirContents", (req, res) => {
  let dirname = req.query.path;

  let response = {
      path: path.resolve(dirname),
      numFiles: 0,
      numDirectories: 0,
      totalFileSize: 0,
  }

  let arrOfElements = []

  fs.readdirSync(dirname).forEach((file) => {
    let stats = fs.statSync(dirname + "/" + file);

    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
    const fileLastModified = stats.mtime;
    const isDirectory = stats.isDirectory() ? true : false

    response.totalFileSize += fileSizeInBytes
    response.numFiles += stats.isFile() ? 1 : 0
    response.numDirectories += stats.isDirectory() ? 1 : 0

    let element = {
      fileName: file,
      fileSizeInBytes: fileSizeInBytes,
      fileSizeInMegabytes: fileSizeInMegabytes,
      fileLastModified: fileLastModified,
      isDirectory: isDirectory
    };

    arrOfElements.push(element);
  });

  arrOfElements.sort(function (a, b) {
    return a["fileSizeInBytes"] - b["fileSizeInBytes"];
  });

  response.arrOfElements = arrOfElements

  response.totalFileSize /= 1000000.0;

  res.send(response);
});

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
