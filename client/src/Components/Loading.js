import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

export default class Loading extends Component {
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          flex: 1,
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }
}
