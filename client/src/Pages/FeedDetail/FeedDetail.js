import React, { Component } from "react";

import TopNavigation from "../../Components/TopNavigation";

import "./style.css";

export default class FeedDetail extends Component {
  render() {
    return (
      <div>
        <TopNavigation pageTitle="Search" />

        <h1>FeedDetail</h1>
      </div>
    );
  }
}
