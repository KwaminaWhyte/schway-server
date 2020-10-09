import React, { Component } from "react";
import TopNavigation from "../../Components/TopNavigation";
import "./style.css";

export default class Search extends Component {
  render() {
    return (
      <div className="Search">
        <TopNavigation pageTitle="Search" />

        <h1>Search page</h1>
      </div>
    );
  }
}
