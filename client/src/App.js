import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
// import Pusher from "pusher-js";

import { loadUser } from "./redux/actions/authAction";

import {
  Feeds,
  Chats,
  Login,
  Update,
  Search,
  Profile,
  Channel,
  Explore,
  Register,
  Channels,
  Messages,
  FeedDetail,
  Followings,
  Notifications,
  Group,
  Groups,
  CreateGroup,
  CreateChannel,
} from "./Pages";

import RightFeed from "./Components/RightFeed";
import SearchField from "./Components/SearchField";
import PrivateRoute from "./Components/PrivateRoute";
import SideNavigation from "./Components/SideNavigation";
import BottomNavigation from "./Components/BottomNavigation";
import MessageBox from "./Components/MessageBox";

// import Loading from "./Components/Loading";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    let { isAuthenticated } = this.props.auth;
    let { msg, code } = this.props.msg;

    return (
      <div style={{ display: "flex" }}>
        {isAuthenticated ? <SideNavigation /> : null}

        <div className="SwitchContainer">
          <Switch>
            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />

            <PrivateRoute path="/profile/:username/:id" component={Profile} />

            <PrivateRoute exact path="/messages/:id" component={Chats} />

            <PrivateRoute exact path="/feeds/d/:id" component={FeedDetail} />

            <PrivateRoute exact path="/search" component={Search} />

            <PrivateRoute
              exact
              path="/messages/:username/:id"
              component={Messages}
            />

            <PrivateRoute
              exact
              path="/followings/:username"
              component={Followings}
            />

            <PrivateRoute exact path="/groups/:id" component={Group} />

            <PrivateRoute exact path="/create_group" component={CreateGroup} />

            <PrivateRoute
              exact
              path="/create_channel"
              component={CreateChannel}
            />

            <PrivateRoute exact path="/groups" component={Groups} />

            <PrivateRoute exact path="/channels/:id" component={Channel} />

            <PrivateRoute exact path="/channels" component={Channels} />

            <PrivateRoute
              exact
              path="/notifications"
              component={Notifications}
            />
            <PrivateRoute exact path="/update" component={Update} />

            <PrivateRoute exact path="/explore" component={Explore} />

            <PrivateRoute exact path="/" component={Feeds} />
          </Switch>
        </div>

        {isAuthenticated ? (
          <section className="right_bar_container">
            <SearchField />

            <RightFeed />
          </section>
        ) : null}

        {isAuthenticated ? <BottomNavigation /> : null}

        {msg !== null ? (
          <MessageBox show={true} code={code} message={msg} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    msg: state.error,
  };
};

export default connect(mapStateToProps, { loadUser })(App);
