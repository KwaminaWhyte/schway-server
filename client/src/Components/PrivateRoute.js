import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Loading from "./Loading";
import { changeURL } from "../redux/actions/authAction";

class PrivateRoute extends React.Component {
  componentDidMount() {
    // console.log(this.props.location);

    if (this.props.location.pathname !== "/") {
      let data = {
        slug: this.props.location.pathname,
        queryParams: this.props.location.search,
      };

      this.props.changeURL(data);
    }
  }

  render() {
    let { isAuthenticated, isLoading } = this.props.auth;
    let Component = this.props.component;

    return (
      <Route
        render={() => {
          if (isLoading) {
            return <Loading />;
          } else if (isAuthenticated) {
            return <Component {...this.props} />;
          } else {
            return <Redirect to="/login" {...this.props} />;
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

export default connect(mapStateToProps, { changeURL })(PrivateRoute);
