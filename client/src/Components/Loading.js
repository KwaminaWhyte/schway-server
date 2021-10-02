import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }
}
