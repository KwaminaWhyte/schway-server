import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./style.css";
import { registerUser, loginUser } from "../redux/actions/authAction";

class Auth extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",

    showSignIn: true,
  };

  handleText = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  registerUser = (e) => {
    e.preventDefault();
    let { firstname, lastname, username, email, password } = this.state;
    this.props.registerUser({ firstname, lastname, username, email, password });
  };

  loginUser = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.loginUser({ email, password });
  };

  render() {
    let { isAuthenticated } = this.props.auth;

    if (isAuthenticated) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <div className="Login" style={{ display: "flex" }}>
        <section
          className="auth_slider"
          style={{
            transform: `translateX(${!this.state.showSignIn ? "100%" : 0})`,
          }}
        >
          {this.state.showSignIn ? (
            <>
              <h1>Creae an account</h1>
              <h1
                onClick={() => this.setState({ showSignIn: false })}
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: "8px 13px",
                  height: "fit-contents",
                  cursor: "pointer",
                }}
              >
                Register
              </h1>
            </>
          ) : (
            <>
              <h1>Have an account?</h1>

              <h1
                onClick={() => this.setState({ showSignIn: true })}
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: "8px 13px",
                  height: "fit-contents",
                  cursor: "pointer",
                }}
              >
                Login
              </h1>
            </>
          )}
        </section>

        <section className="reg_log_container">
          <h1>Register User</h1>

          <form
            className="reg_log_form_container"
            onSubmit={this.registerUser}
            method="post"
          >
            <input
              onChange={this.handleText}
              value={this.state.firstname}
              type="text"
              name="firstname"
              placeholder="firstname"
            />
            <input
              onChange={this.handleText}
              value={this.state.lastname}
              type="text"
              name="lastname"
              placeholder="lastname"
            />
            <input
              onChange={this.handleText}
              value={this.state.username}
              type="text"
              name="username"
              placeholder="username"
            />
            <input
              onChange={this.handleText}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="email"
            />
            <input
              onChange={this.handleText}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="password"
            />

            <input type="submit" value="Register" />
          </form>
        </section>

        <section className="reg_log_container">
          <h1>Login User</h1>

          <form
            className="reg_log_form_container"
            onSubmit={this.loginUser}
            method="post"
          >
            <input
              onChange={this.handleText}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="email"
            />
            <input
              onChange={this.handleText}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="password"
            />

            <input type="submit" value="Log In" />
          </form>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { registerUser, loginUser })(Auth);
