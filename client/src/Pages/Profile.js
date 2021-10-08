import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { withRouter } from "react-router-dom";

import { fetchUser } from "../redux/actions/userAction";
import { updateUser } from "../redux/actions/authAction";
import { fetchUserFeeds } from "../redux/actions/feedAction";
import { follow, unfollow } from "../redux/actions/followingsAction";
import TopNavigation from "../Components/TopNavigation";
import FeedCard from "../Components/FeedCard";
import { Container } from "../Components/BaseComponents";
import Modal from "../Components/Modal";

const CoverImage = styled.img`
  background-repeat: no-repeat;
  background-size: cover;
  height: 230px;
  width: 100%;
  object-fit: cover;
`;
class Profile extends Component {
  state = {
    feedModal: false,

    body: "",
    mediaType: "",

    showModal: false,
    user: null,
  };

  componentDidMount() {
    document.title = "Schway | Profile";
    this.props.fetchUser(this.props.match.params.username);
    this.props.fetchUserFeeds(this.props.match.params.id);
  }

  render() {
    let { user, feeds, currentUser } = this.props;

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
                <p style={{ fontWeight: "bold", fontSize: 16 }}>
                  {user.username}
                </p>
                <p style={{ fontSize: 12, color: "grey" }}>
                  {feeds.length} Posts
                </p>
              </div>
            </div>
          }
        />
        <div className="nav-spacer"></div>

        <CoverImage
          src="https://i.ibb.co/WDp45B1/diana-simumpande-GSPFj-HIx2t-E-unsplash.jpg"
          alt=""
        />

        <section
          style={{
            marginTop: "-35px",
            padding: 10,
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "red",
          }}
        >
          <div style={{ display: "flex" }}>
            <img
              style={{
                width: 100,
                height: 100,
                borderRadius: "100%",
                border: "2px solid white",
              }}
              src={user.profile_img}
              alt=""
            />

            {currentUser?._id === user?._id ? (
              <p
                onClick={() => {
                  this.setState({ showModal: true });
                  this.setState({ user });
                }}
                style={{
                  color: "white",
                  backgroundColor: "purple",
                  padding: "4px 12px",
                  borderRadius: 12,
                  marginTop: "auto",
                  fontSize: 12,
                }}
              >
                Edit Profile
              </p>
            ) : null}

            <div style={{ marginTop: 30, marginLeft: 30 }}>
              <p>{user?.followers?.length} followers</p>
              <p>{user?.following?.length} Following</p>
            </div>

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                marginTop: "auto",
                alignItems: "center",
              }}
            >
              {/* <p>im</p>
              <p>me</p> */}
              {currentUser?._id === user?._id ? null : (
                <p
                  onClick={() => this.props.follow({ userId: user?._id })}
                  style={{
                    backgroundColor: "blueviolet",
                    borderRadius: 20,
                    padding: "5px 15px",
                    color: "white",
                    fontWeight: "bold",
                    marginLeft: 8,
                  }}
                >
                  Follow
                </p>
              )}
            </div>
          </div>
          <div style={{}}>
            <p style={{ fontSize: 23, fontWeight: "bold" }}>
              {user.firstname} {user.lastname}
            </p>
            <p style={{ fontSize: 13, color: "grey" }}>
              <i>@{user.username}</i>
            </p>
            {/* <p style={{ fontSize: 14 }}>UI/UX Developer @app_deity</p> */}
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            laboriosam quae quos facilis, libero neque earum unde illo
            provident, corrupti labore nemo
          </p>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "30px auto",
          }}
        >
          {feeds &&
            feeds.map((feed) => <FeedCard key={feed._id} feed={feed} />)}
        </section>

        <Modal
          display={this.state.showModal ? "block" : "none"}
          title="UPDATE ACCOUNT DETAILS"
          user={user}
          onUserUpdate={(data) => {
            this.props.updateUser(data);
            this.setState({ showModal: false });
          }}
          closeModal={() => this.setState({ showModal: false })}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    user: state.users.user,
    feeds: state.feeds.userFeeds,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchUserFeeds,
  updateUser,
  follow,
  unfollow,
})(withRouter(Profile));
