import React, { Component } from "react";

import TopNavigation from "../../Components/TopNavigation/TopNavigation";
import "./style.css";

export default class Notifications extends Component {
  render() {
    return (
      <div className="Notifications">
        <TopNavigation pageTitle="Notifications" />

        <p>Notifications Page</p>
      </div>
    );
  }
}
