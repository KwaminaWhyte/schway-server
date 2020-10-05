import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          height: "calc(100vh)",
        }}
      >
        <h1>Loading</h1>
      </div>
    );
  }
}
