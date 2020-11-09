import React from "react";
import axios from "axios";
import "./styles.css";

export default class App extends React.Component {
  state = { arrOfElements: [] };

  componentDidMount() {
    axios
      .get("/dirContents", {
        params: {
          path: ".",
        },
      })
      .then((response) => {
        this.setState(response.data);
      });
  }

  render() {
    console.log(this.state);
    console.log(this.state["arrOfElements"]);
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

        <button
          onClick={() => {
            axios
              .get("/dirContents", {
                params: {
                  path: "/",
                },
              })
              .then((response) => {
                this.setState(response.data);
              });
          }}
        >
          Click here
        </button>

        <p> This is what the data says: </p>
        <p> {JSON.stringify(this.state)} </p>

        {this.state["arrOfElements"].map((element, index) => (
          <button
            onClick={() => {
              axios
                .get("/dirContents", {
                  params: {
                    path: "..",
                  },
                })
                .then((response) => {
                  this.setState(response.data);
                });
            }}
          >
            {element["fileName"]}
          </button>
        ))}
      </div>
    );
  }
}
