import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { IoIosMail, IoIosLock } from "react-icons/io";

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

  hideLoginSection = () => {
    document.getElementById("login_section").style = "margin-left: 130vw;";
    document.getElementById("register_section").style = "margin-left: 0vw;";
  };

  showLoginSection = () => {
    document.getElementById("login_section").style = "margin-left: 0vw;";
    document.getElementById("register_section").style =
      "margin-left: -130vw; display: flex;";
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

        <section id="register_section" className="reg_log_container">
          <div
            style={{ marginRight: "auto", marginLeft: 40, marginTop: "auto" }}
          >
            <h1>Register User</h1>
            <p>Please sign in to continue</p>
          </div>

          <form
            className="reg_log_form_container"
            onSubmit={this.registerUser}
            method="post"
          >
            <div className="form_field_container">
              <input
                onChange={this.handleText}
                value={this.state.firstname}
                type="text"
                name="firstname"
                placeholder="firstname"
              />
            </div>

            <div className="form_field_container">
              <input
                onChange={this.handleText}
                value={this.state.lastname}
                type="text"
                name="lastname"
                placeholder="lastname"
              />
            </div>

            <div className="form_field_container">
              <input
                onChange={this.handleText}
                value={this.state.username}
                type="text"
                name="username"
                placeholder="username"
              />
            </div>

            <div className="form_field_container">
              <input
                onChange={this.handleText}
                value={this.state.email}
                type="email"
                name="email"
                placeholder="email"
              />
            </div>

            <div className="form_field_container">
              <input
                onChange={this.handleText}
                value={this.state.password}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>

            <input type="submit" value="SIGN UP" />
          </form>
          <p
            style={{
              marginTop: "auto",
              marginBottom: 55,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Already have an account?{" "}
            <Link to="#" onClick={this.showLoginSection}>
              Sing in
            </Link>
          </p>
        </section>

        <section id="login_section" className="reg_log_container">
          <div
            style={{ marginRight: "auto", marginLeft: 40, marginTop: "auto" }}
          >
            <h1>Login</h1>
            <p>Please sign in to continue</p>
          </div>

          <form
            className="reg_log_form_container"
            onSubmit={this.loginUser}
            method="POST"
          >
            <div className="form_field_container">
              <IoIosMail />
              <input
                onChange={this.handleText}
                value={this.state.email}
                type="email"
                name="email"
                placeholder="email"
              />
            </div>

            <div className="form_field_container">
              <IoIosLock />
              <input
                onChange={this.handleText}
                value={this.state.password}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>

            <input type="submit" value="LOGIN" />
          </form>
          <p
            style={{
              marginTop: "auto",
              marginBottom: 55,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Dont have an account?{" "}
            <Link to="#" onClick={this.hideLoginSection}>
              Sign up
            </Link>
          </p>
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
