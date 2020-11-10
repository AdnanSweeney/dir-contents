import React from "react";
import axios from "axios";
import FolderItem from "./components/folderItem.js";
import "./variables.css";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.handleDirChange = this.handleDirChange.bind(this);
  }
  state = { arrOfElements: [] };

  handleDirChange(path) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    axios
      .get("/dirContents", {
        params: {
          path: path,
        },
      })
      .then((response) => {
        this.setState({
          totalFileSize: response.data.totalFileSize,
          numFiles: response.data.numFiles,
          numDirectories: response.data.numDirectories,
          path: response.data.path,
          arrOfElements: response.data.arrOfElements,
        });
      });
  }

  componentDidMount() {
    this.handleDirChange(".");
  }

  render() {

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
      fileLastModified: "2020-11-09T05:48:36.490Z",
      isDirectory: true,
    };

    return (
      <div className="AppContainer" style={{ width: "100%" }}>
        <div>
          <div className="title">Directory Content Information</div>
          <div className="navBar">
            <div
              className="divButton floatingButton"
              onClick={() => {
                this.handleDirChange(this.state.path + "/..");
              }}
            >
              MOVE UP A FOLDER
            </div>
            <div className="totalFileDataContainer">
              <div className="fileStatsRow">
                Number of Files in current directory:{" "}
                <div className="fileStats">{this.state["numFiles"]}</div>
              </div>
              <div className="fileStatsRow">
                Number of Folders in current directory:{" "}
                <div className="fileStats">{this.state["numDirectories"]}</div>
              </div>
              <div className="fileStatsRow">
                Total File Size:
                <div className="fileStats">
                  {this.state["totalFileSize"]} MB
                </div>
              </div>
              <div className="fileStatsRow">
                Current Path:
                <div className="fileStats">{this.state["path"]}</div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div>
          <div className="fileLabelContainer">
            <div className="fileLabelSection"> File Name </div>
            <div className="fileLabelSection"> File Size </div>
            <div className="fileLabelSection"> Date Last Modified </div>
            <div className="fileLabelSection"> </div>
          </div>

          {/* This is Just for styling TESTING */}
          {/* <FolderItem
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
          /> */}
          {/* This is Just for styling TESTING */}

          {this.state["arrOfElements"].map((element, index) => (
            <FolderItem
              item={element}
              handleDirChange={this.handleDirChange}
              path={this.state.path}
            />
          ))}
        </div>
      </div>
    );
  }
}
