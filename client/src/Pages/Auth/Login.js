import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { IoIosMail, IoIosLock } from "react-icons/io";

import { loginUser } from "../../redux/actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailEmpty: false,
    passwordEmpty: false,
  };

  handleText = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  loginUser = (e) => {
    e.preventDefault();
    let { email, password } = this.state;

    if (email !== "") {
      if (password !== "") {
        this.props.loginUser({ email, password });
      } else {
        this.setState({ passwordEmpty: true });
      }
    } else {
      this.setState({ emailEmpty: true });
    }
  };

  render() {
    let { isLoading } = this.props.auth;

    if (isLoading) {
      return null;
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
            <div
              className="form_field_container"
              style={{ border: this.state.emailEmpty ? "1px solid red" : null }}
            >
              <IoIosMail size={23} color="grey" />
              <input
                onChange={this.handleText}
                value={this.state.email}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>

            <div
              className="form_field_container"
              style={{
                border: this.state.passwordEmpty ? "1px solid red" : null,
              }}
            >
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
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
