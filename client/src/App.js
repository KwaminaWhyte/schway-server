import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Pusher from "pusher-js";

import { loadUser } from "./redux/actions/authAction";

import Auth from "./Pages/Auth";
import Feeds from "./Pages/Feeds";
import Chats from "./Pages/Chats";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import Messages from "./Pages/Messages";
import FeedDetail from "./Pages/FeedDetail";
import Notifications from "./Pages/Notifications";

import RightFeed from "./Components/RightFeed";
import SearchField from "./Components/SearchField";
import PrivateRoute from "./Components/PrivateRoute";
import SideNavigation from "./Components/SideNavigation";
import BottomNavigation from "./Components/BottomNavigation";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();

    const pusher = new Pusher("aba59cc7ba83cc677c53", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("feeds");
    channel.bind("inserted", function (data) {
      alert(JSON.stringify(data));
    });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <Router>
          {this.props.auth.isAuthenticated ? <SideNavigation /> : null}

          <div className="SwitchContainer">
            <Switch>
              <PrivateRoute
                exact
                path="/profile/:username"
                component={Profile}
              />

              <PrivateRoute
                exact
                path="/messages/:username"
                component={Chats}
              />

              <PrivateRoute exact path="/feeds/:id" component={FeedDetail} />

              <Route exact path="/login" component={Auth} />

              <PrivateRoute
                exact
                path="/notifications"
                component={Notifications}
              />

              <PrivateRoute exact path="/search" component={Search} />

              <PrivateRoute exact path="/messages" component={Messages} />

              <PrivateRoute exact path="/explore" component={Explore} />

              <PrivateRoute path="/" component={Feeds} />
            </Switch>
          </div>

          {this.props.auth.isAuthenticated ? (
            <section className="right_bar_container">
              <SearchField />

              <RightFeed />
            </section>
          ) : null}

          {this.props.auth.isAuthenticated ? <BottomNavigation /> : null}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { loadUser })(App);
