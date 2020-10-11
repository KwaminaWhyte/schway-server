import React, { Component } from "react";

import TopNavigation from "../../Components/TopNavigation/TopNavigation";
import "./style.css";

export default class Notifications extends Component {
  render() {
    return (
      <div className="Notifications">
        <TopNavigation pageTitle="Notifications" />
        <div className="nav-spacer"></div>

        <p style={{ fontSize: 23, fontWeight: "bold" }}>
          Nothing to see here -- yet
        </p>

        <p style={{ color: "grey" }}>
          When someone mentions you, you'll find it here.
        </p>
      </div>
    );
  }
}
