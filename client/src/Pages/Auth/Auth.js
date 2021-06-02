import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { IoIosMail, IoIosLock, IoIosPerson } from "react-icons/io";

import "./style.css";
import { registerUser, loginUser } from "../../redux/actions/authAction";

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
    document.getElementById("login_section").style = "margin-left: 100vw;";
    document.getElementById("register_section").style = "margin-left: 0vw;";
  };

  showLoginSection = () => {
    document.getElementById("login_section").style = "margin-left: 0vw;";
    document.getElementById("register_section").style = "margin-left: -100vw;";
  };

  render() {
    let { isAuthenticated } = this.props.auth;
    let { msg } = this.props.error;

    console.log(msg);

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
              <h1>Create an account</h1>
              <h2
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
              </h2>
            </>
          ) : (
            <>
              <h1>Have an account?</h1>

              <h2
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
              </h2>
            </>
          )}
        </section>

        <section id="register_section" className="reg_log_container">
          <div
            style={{
              marginRight: "auto",
              marginLeft: 20,
              marginTop: "auto",
              height: 100,
            }}
          >
            <h1 style={{ fontWeight: "bolder", fontSize: 33 }}>
              Create Account
            </h1>
          </div>

          <form
            className="reg_log_form_container"
            onSubmit={this.registerUser}
            method="post"
          >
            <div className="form_field_container">
              <IoIosPerson size={23} color="grey" />
              <input
                onChange={this.handleText}
                value={this.state.firstname}
                type="text"
                name="firstname"
                placeholder="First Name"
              />
            </div>

            <div className="form_field_container">
              <IoIosPerson size={23} color="grey" />
              <input
                onChange={this.handleText}
                value={this.state.lastname}
                type="text"
                name="lastname"
                placeholder="Last Name"
              />
            </div>

            <div className="form_field_container">
              <IoIosPerson size={23} color="grey" />
              <input
                onChange={this.handleText}
                value={this.state.username}
                type="text"
                name="username"
                placeholder="Username"
              />
            </div>
            {/* <p>{msg != "" ? msg : null}</p> */}

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

            <input type="submit" value="SIGN UP" />
          </form>
          <p className="toggle_small_screen">
            Already have an account?{" "}
            <Link to="#" onClick={this.showLoginSection}>
              Sing in
            </Link>
          </p>
        </section>

        <section id="login_section" className="reg_log_container">
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
          <p className="toggle_small_screen">
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
    error: state.error,
  };
};

export default connect(mapStateToProps, { registerUser, loginUser })(Auth);
