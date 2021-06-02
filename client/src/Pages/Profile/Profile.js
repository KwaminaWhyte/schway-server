import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

import "./profile.css";
import { fetchUser } from "../../redux/actions/userAction";
import TopNavigation from "../../Components/TopNavigation/TopNavigation";

class Profile extends Component {
  state = {};

  componentDidMount() {
    // let userID = this.props.match.params.username;
    // console.log(this.props.match);
    // this.setState({ userID });
    this.props.fetchUser(this.props.computedMatch.params.username);
  }

  render() {
    let { user } = this.props;

    return (
      <div className="Profile">
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
                <p style={{ fontSize: 12, color: "grey" }}>12 Tweets</p>
              </div>
            </div>
          }
        />
        <div className="nav-spacer"></div>

        <img
          className="cover_image"
          src="https://i.ibb.co/WDp45B1/diana-simumpande-GSPFj-HIx2t-E-unsplash.jpg"
          alt="banner"
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
              alt="profile"
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
        </section>
        <section
          style={{
            display: "flex",
            width: "100%",
            margin: "30px auto 10px auto",
            padding: 15,
            backgroundColor: "grey",
          }}
        >
          <p>Profile Page</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(withRouter(Profile));
