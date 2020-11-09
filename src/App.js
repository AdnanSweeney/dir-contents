import React from "react";
import axios from "axios";
import FolderItem from "./components/folderItem.js";
import "./styles.css";

export default class App extends React.Component {
  constructor () {
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
    return (
      <div style={{ width: "100%" }}>
        <button
          onClick={() => {
            this.handleDirChange(this.state.path + "/..");
          }}
        >
          Go Up One Dir
        </button>

        {this.state["arrOfElements"].map((element, index) => (
          <FolderItem item={element} handleDirChange={this.handleDirChange} path={this.state.path}/>
        ))}
      </div>
    );
  }
}
