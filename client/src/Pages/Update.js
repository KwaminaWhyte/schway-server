import React, { Component } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { connect } from "react-redux";
// import styled from "styled-components";

import TopNavigation from "../Components/TopNavigation";

import { Container, Spacer } from "../Components/BaseComponents";
import { updateUser } from "../redux/actions/authAction";
import { getBase64 } from "../assets/fileHandler";

export class Update extends Component {
  state = {
    firstname: this.props.user.firstname,
    lastname: this.props.user.lastname,
    username: this.props.user.username,
    email: this.props.user.email,
    profile_img: this.props.user.profile_img,
    cover_img: this.props.user.cover_img,
  };

  onTextChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let { username, firstname, lastname, email, profile_img, cover_img } =
      this.state;

    return (
      <Container>
        <TopNavigation
          pageTitle={
            <div style={{ display: "flex", alignItems: "center" }}>
              <IoIosArrowBack
                className="chat_back_btn"
                onClick={() => this.props.history.goBack()}
                style={{
                  fontWeight: "bold",
                  padding: 2,
                  color: "grey",
                }}
                size={40}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 12,
                }}
              >
                <h1 style={{ fontWeight: "bold", fontSize: 23 }}>
                  Update Profile
                </h1>
              </div>
            </div>
          }
        />

        <Spacer />

        <form
          method="post"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src={profile_img}
            style={{
              width: 80,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt="profile_image"
          />

          <img
            src={cover_img}
            style={{
              width: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt="cover_image"
          />

          <div>
            <label htmlFor="firstname">Firstname</label>
            <input
              onChange={this.onTextChange}
              required
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              placeholder="Enter firstname"
            />
          </div>

          <div>
            <label htmlFor="lastname">Lastname</label>
            <input
              onChange={this.onTextChange}
              required
              type="text"
              name="lastname"
              id="lastname"
              value={lastname}
              placeholder="Enter lastname"
            />
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={this.onTextChange}
              required
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Enter Username"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={this.onTextChange}
              required
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter Email..."
            />
          </div>

          <input
            style={{
              border: "none",
              marginBottom: 12,
            }}
            onChange={(e) => {
              getBase64(e.target.files[0]).then((res) =>
                this.setState({ profile_img: res })
              );
            }}
            type="file"
          />

          <input
            style={{
              border: "none",
              marginBottom: 12,
            }}
            onChange={(e) => {
              getBase64(e.target.files[0]).then((res) =>
                this.setState({ cover_img: res })
              );
            }}
            type="file"
          />

          <p
            onClick={() =>
              this.props.updateUser({
                firstname,
                lastname,
                username,
                email,
                profile_img,
                cover_img,
              })
            }
          >
            Update User
          </p>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUser })(Update);
