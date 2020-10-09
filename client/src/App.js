import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./redux/actions/authAction";

import Auth from "./Pages/Auth";
import Feeds from "./Pages/Feeds";
import Messages from "./Pages/Messages";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import Notifications from "./Pages/Notifications";

import PrivateRoute from "./Components/PrivateRoute";
import SideNavigation from "./Components/SideNavigation";
import RightFeed from "./Components/RightFeed";
import SearchField from "./Components/SearchField";
import BottomNavigation from "./Components/BottomNavigation";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();

    console.log(this.props);
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

              <Route exact path="/login" component={Auth} />

              <PrivateRoute
                exact
                path="/notifications"
                component={Notifications}
              />

              <PrivateRoute path="/messages" component={Messages} />

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
