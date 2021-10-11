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
// import PrivateRoute from "./Components/PrivateRoute";
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
            {!isAuthenticated ? (
              <>
                <Route exact path="/" component={Login} />

                <Route exact path="/register" component={Register} />
              </>
            ) : (
              <>
                <Route path="/profile/:username/:id" component={Profile} />
                <Route exact path="/messages/:username" component={Chats} />
                <Route exact path="/feeds/d/:id" component={FeedDetail} />
                {/* <Route exact path="/upload" component={Upload} /> */}
                <Route exact path="/search" component={Search} />
                <Route exact path="/messages" component={Messages} />
                <Route
                  exact
                  path="/followings/:username"
                  component={Followings}
                />

                <Route exact path="/groups/:id" component={Group} />

                <Route exact path="/create_group" component={CreateGroup} />

                <Route exact path="/create_channel" component={CreateChannel} />

                <Route exact path="/groups" component={Groups} />
                <Route exact path="/channels/:id" component={Channel} />
                <Route exact path="/channels" component={Channels} />
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/update" component={Update} />
                <Route exact path="/explore" component={Explore} />
                <Route exact path="/" component={Feeds} />
              </>
            )}
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
