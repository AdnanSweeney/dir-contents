const axios = require("axios");

const readInputInterface = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printDirContents(numFiles, numDirectories, totalFileSize, path, arrOfElements) {
  let output = "\n";

  output += "Number of files: " + numFiles + "\n";
  output += "Number of folders: " + numDirectories + "\n";
  output += "Total File Size: " + totalFileSize + "\n";

  for (let i = 0; i < arrOfElements.length; i++) {
    output += getElementInfo(arrOfElements[i]);
  }

  console.log(output);
}

function getElementInfo(element) {
  let output = "";

  let fileLastModified = new Date(element["fileLastModified"]);
  let fileLastModifiedText = fileLastModified.toLocaleString()

  output += "\nFilename: " + element["fileName"] + "\n";
  output += "Size: " + element["fileSizeInMegabytes"] + " MB\n";
  output += "Last Modified Time: " + fileLastModifiedText + "\n";

  return output;
}

function getPath() {
  readInputInterface.question(
    `\nWhich folder would you like to see the contents of \nEnter a relative path, a full path, or "exit" to exit: `,
    (path) => {
      if (path === "exit") {
        return readInputInterface.close();
      } else {

        let isRelativePath = true;
        if (path[0] === "/") {
            isRelativePath = false
        }
        getDirContents((isRelativePath ? "../" : "") + path);
      }
    }
  );
}

function getDirContents(path) {
  axios
    .get("http://localhost:5000/dirContents", {
      params: {
        path: path,
      },
    })
    .then((response) => {
        let data = response.data
        printDirContents(data.numFiles, data.numDirectories, data.totalFileSize, data.path, data.arrOfElements)
      getPath();
    })
    .catch(function (error) {
      console.log(
        "\nServer Response: " +
          error.message +
          "\nThat folder may not exist or you don't have permission to access it"
      );
      getPath();
    });
}

getPath();
