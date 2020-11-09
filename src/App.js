import React from "react";
import axios from "axios";
import FolderItem from "./components/folderItem.js";
import "./styles.css";

export default class App extends React.Component {
  state = { arrOfElements: [] };

  handleDirChange(path) {

    if (path === "/..") {
      path = "/"
    }
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

  popDirPath() {
    let path = this.state.path

  }

  componentDidMount() {
    this.handleDirChange(".");
  }

  render() {
    console.log(this.state);
    console.log(this.state["arrOfElements"]);
    return (
      <div style={{ width: "100%" }}>
        <button
          onClick={() => {
            axios.get("/health").then((response) => {
              alert("The response is " + response.data);
            });
          }}
        >
          Click here
        </button>

        <button
          onClick={() => {
            this.handleDirChange(this.state.path + "/..");
          }}
        >
          Go Up One Dir
        </button>

        <p> This is what the data says: </p>
        <p> {JSON.stringify(this.state)} </p>

        {this.state["arrOfElements"].map((element, index) => (
          <FolderItem item={element} handleDirChange={this.handleDirChange} />
        ))}
      </div>
    );
  }
}
