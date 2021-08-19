import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { IoIosMail, IoIosLock } from "react-icons/io";

import { loginUser } from "../../redux/actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleText = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginUser = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.loginUser({ email, password });
  };

  render() {
    let { isAuthenticated } = this.props.auth;
    // let { msg } = this.props.error;

    if (isAuthenticated) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <section className="reg_log_container">
          <div
            style={{
              marginRight: "auto",
              marginLeft: 20,
              marginTop: "auto",
              height: 100,
            }}
          >
            <h1 style={{ fontWeight: "bolder", fontSize: 33 }}>Login</h1>
          </div>

          <form
            className="reg_log_form_container"
            onSubmit={this.loginUser}
            method="POST"
          >
            <div className="form_field_container">
              <IoIosMail size={23} color="grey" />
              <input
                onChange={this.handleText}
                value={this.state.email}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>

            <div className="form_field_container">
              <IoIosLock size={23} color="grey" />
              <input
                onChange={this.handleText}
                value={this.state.password}
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>

            <input type="submit" value="LOGIN" />
          </form>

          <p className="">
            Dont have an account? <Link to="/register">Sign up</Link>
          </p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.error,
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
