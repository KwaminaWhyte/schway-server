import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./style.css";

import SideNavigation from "../Components/SideNavigation";

import Feeds from "./Feeds";
import Messages from "./Messages";
import Contacts from "./Contacts";
import Profile from "./Profile";
import Explore from "./Explore";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <SideNavigation url={this.props.computedMatch.url} />

        <section>
          <Route
            exact
            path={`${this.props.computedMatch.url}`}
            component={Feeds}
          />
          <Route
            exact
            path={`${this.props.computedMatch.url}messages`}
            component={Messages}
          />
          <Route
            exact
            path={`${this.props.computedMatch.url}contacts`}
            component={Contacts}
          />
          <Route
            exact
            path={`${this.props.computedMatch.url}settings`}
            component={Feeds}
          />
          <Route
            exact
            path={`${this.props.computedMatch.url}profile/:userId`}
            component={Profile}
          />

          <Route
            exact
            path={`${this.props.computedMatch.url}explore`}
            component={Explore}
          />
        </section>
      </div>
    );
  }
}
