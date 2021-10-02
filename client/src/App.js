import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
// import Pusher from "pusher-js";

import { loadUser } from "./redux/actions/authAction";

import Feeds from "./Pages/Feeds";
import Chats from "./Pages/Chats";
// import Upload from "./Pages/Upload";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore";
import Login from "./Pages/Auth/Login";
import Messages from "./Pages/Messages";
import FeedDetail from "./Pages/FeedDetail";
import Register from "./Pages/Auth/Register";
import Notifications from "./Pages/Notifications";

import RightFeed from "./Components/RightFeed";
import SearchField from "./Components/SearchField";
import PrivateRoute from "./Components/PrivateRoute";
import SideNavigation from "./Components/SideNavigation";
import BottomNavigation from "./Components/BottomNavigation";
import MessageBox from "./Components/MessageBox";
import Loading from "./Components/Loading";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    let { isAuthenticated, isLoading } = this.props.auth;
    let { msg, code } = this.props.msg;

    return (
      <div style={{ display: "flex" }}>
        <Router>
          {isAuthenticated ? <SideNavigation /> : null}

          {!isAuthenticated ? (
            <>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
            </>
          ) : (
            <div className="SwitchContainer">
              <Switch>
                <Route exact path="/profile/:username" component={Profile} />

                <PrivateRoute
                  exact
                  path="/messages/:username"
                  component={Chats}
                />

                <Route exact path="/feeds/d/:id" component={FeedDetail} />

                {/* <Route exact path="/upload" component={Upload} /> */}

                <PrivateRoute exact path="/search" component={Search} />

                <Route exact path="/messages" component={Messages} />

                <Route exact path="/notifications" component={Notifications} />

                <Route exact path="/explore" component={Explore} />

                <Route path="/" component={Feeds} />
              </Switch>
            </div>
          )}

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
        </Router>
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
