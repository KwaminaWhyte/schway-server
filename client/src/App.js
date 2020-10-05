import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./redux/actions/authAction";

import Home from "./Pages/Home";
import Auth from "./Auth/Auth";
import PrivateRoute from "./Components/PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Auth} />

          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { loadUser })(App);
