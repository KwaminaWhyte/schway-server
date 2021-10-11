import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

import { fetchUser } from "../redux/actions/userAction";
import { fetchUserFeeds } from "../redux/actions/feedAction";
import { follow, unfollow } from "../redux/actions/followingsAction";
import TopNavigation from "../Components/TopNavigation";
import FeedCard from "../Components/FeedCard";
import { Container } from "../Components/BaseComponents";

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
                <h1 style={{ fontWeight: "bold", fontSize: 16 }}>
                  {user.username}
                </h1>
                <p style={{ fontSize: 12, color: "grey" }}>
                  {feeds.length} Posts
                </p>
              </div>
            </div>
          }
        />

        <CoverImage src={user?.cover_img} alt="" />

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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                marginTop: "auto",
              }}
            >
              {currentUser?._id === user?._id ? (
                <Link
                  to="/update"
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
                </Link>
              ) : null}
            </div>

            <div
              style={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Link to="/create_channel">Create Channel</Link>
              <Link to="/create_group">Create Group</Link>
            </div>

            <Link
              to={`/followings/${user?.username}`}
              style={{
                color: "white",
                backgroundColor: "purple",
                padding: "4px 12px",
                borderRadius: 12,
                marginTop: "auto",
                fontSize: 12,
              }}
            >
              {user?.followers?.length} Fllowers / {user?.following?.length}{" "}
              Following
            </Link>

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

          <p>{user?.bio}</p>
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    user: state.user.user,
    feeds: state.feeds.userFeeds,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  fetchUserFeeds,
  follow,
  unfollow,
})(Profile);
