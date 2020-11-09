import React from "react";
import axios from "axios";
import "./styles.css";

export default class App extends React.Component {

  state = {}

  componentDidMount() {}

  render() {

    return (
      <div>
        <button
          onClick={() => {
            axios.get("/health").then((response) => {
              alert("The response is " + response.data);
            });
          }}
        >
          Click here
        </button>
      </div>
    );
  }
}
