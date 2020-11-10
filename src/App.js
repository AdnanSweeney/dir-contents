import React from "react";
import axios from "axios";
import FolderItem from "./components/folderItem.js";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.handleDirChange = this.handleDirChange.bind(this);
  }
  state = { arrOfElements: [] };

  handleDirChange(path) {
    console.log("handleDirChangeCalled");
    console.log("path supposed to be" + path);
    axios
      .get("/dirContents", {
        params: {
          path: path,
        },
      })
      .then((response) => {
        this.setState({
          path: response.data.path,
          arrOfElements: response.data.arrOfElements,
        });
      });
  }

  componentDidMount() {
    this.handleDirChange(".");
  }

  render() {
    console.log(this.state);
    console.log(this.state["arrOfElements"]);

    let testElement = {
      fileName: "file.txt",
      fileSizeInBytes: "100",
      fileSizeInMegabytes: 12,
      fileLastModified: "05-05-2020",
      isDirectory: false,
    };

    let testFolder = {
      fileName: "thisIsFolder",
      fileSizeInBytes: "100",
      fileSizeInMegabytes: 12,
      fileLastModified: "05-05-2020",
      isDirectory: true,
    };

    return (
      <div className="AppContainer" style={{ width: "100%" }}>
        <div
          className="divButton floatingButton"
          onClick={() => {
            this.handleDirChange(this.state.path + "/..");
          }}
        >
          MOVE UP A FOLDER
        </div>

        {/* This is Just for styling TESTING */}
        <FolderItem
          item={testElement}
          handleDirChange={() => {
            alert("hello");
          }}
          path={this.state.path}
        />

        <FolderItem
          item={testElement}
          handleDirChange={() => {
            alert("hello");
          }}
          path={this.state.path}
        />

        <FolderItem
          item={testFolder}
          handleDirChange={() => {
            alert("hello");
          }}
          path={this.state.path}
        />
        {/* This is Just for styling TESTING */}

        {this.state["arrOfElements"].map((element, index) => (
          <FolderItem
            item={element}
            handleDirChange={this.handleDirChange}
            path={this.state.path}
          />
        ))}
      </div>
    );
  }
}
