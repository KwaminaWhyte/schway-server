import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { IoIosMail, IoIosLock, IoIosPerson } from "react-icons/io";

import "./style.css";
import { registerUser } from "../../redux/actions/authAction";

class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
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

  render() {
    let { isAuthenticated } = this.props.auth;
    // let { msg } = this.props.error;

    if (isAuthenticated) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <section className="reg_log_container">
          <div style={{}}>
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
          <p className="">
            Already have an account? <Link to="/login">Sing in</Link>
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

export default connect(mapStateToProps, { registerUser })(Register);
