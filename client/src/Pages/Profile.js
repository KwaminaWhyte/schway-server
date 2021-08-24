import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

import { fetchUser } from "../redux/actions/userAction";
import { fetchUserFeeds } from "../redux/actions/feedAction";
import TopNavigation from "../Components/TopNavigation";
import FeedCard from "../Components/FeedCard";
import { Container } from "../Components/BaseComponents";

const CoverImage = styled.img`
  background-repeat: no-repeat;
  background-size: cover;
  height: 230px;
  width: 100%;
  object-fit: cover;
  /* border-radius: 25px; */
  /* margin: 10px auto 10px auto; */
  /* box-shadow: 0px 3px 4px 1px #727272; */
`;
class Profile extends Component {
  state = {};

  componentDidMount() {
    // let userID = this.props.match.params.username;
    // console.log(this.props.match);
    // this.setState({ userID });
    this.props.fetchUser(this.props.computedMatch.params.username);
    this.props.fetchUserFeeds();
  }

  render() {
    let { user, feeds } = this.props;

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
                <p style={{ fontSize: 12, color: "grey" }}>12 Posts</p>
              </div>
            </div>
          }
        />
        <div className="nav-spacer"></div>

        <CoverImage
          src="https://i.ibb.co/WDp45B1/diana-simumpande-GSPFj-HIx2t-E-unsplash.jpg"
          alt="."
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
              src="https://i.ibb.co/WH1qmRS/grahame-jenkins-ua9b-UXz-UUpw-unsplash.jpg"
              alt="."
            />

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
              <p
                style={{
                  backgroundColor: "blueviolet",
                  borderRadius: 20,
                  padding: "5px 15px",
                  color: "white",
                  fontWeight: "bold",
                  marginLeft: 8,
                }}
              >
                Following
              </p>
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    feeds: state.feeds.userFeeds,
  };
};

export default connect(mapStateToProps, { fetchUser, fetchUserFeeds })(
  withRouter(Profile)
);
