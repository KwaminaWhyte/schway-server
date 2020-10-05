import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Loading from "./Loading";

class PrivateRoute extends React.Component {
  render() {
    let { isAuthenticated, isLoading } = this.props.auth;
    let Component = this.props.component;

    return (
      <Route
        render={() => {
          if (isLoading) {
            return <Loading />;
          } else if (!isAuthenticated) {
            return <Redirect to={{ pathname: "/login" }} />;
          } else {
            return <Component {...this.props} />;
          }
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
