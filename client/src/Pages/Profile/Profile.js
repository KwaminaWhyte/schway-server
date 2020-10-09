import React, { Component } from "react";
import { connect } from "react-redux";

import "./profile.css";
import { fetchUser } from "../../redux/actions/userAction";
import TopNavigation from "../../Components/TopNavigation/TopNavigation";

class Profile extends Component {
  state = {};

  componentDidMount() {
    // let userID = this.props.match.params.username;
    // console.log(this.props.match);
    // this.setState({ userID });
    // this.props.fetchUser(username);
  }

  render() {
    let { user } = this.props;

    return (
      <div className="Profile">
        <TopNavigation pageTitle={user.username} />

        <section
          className="cover_image"
          style={{
            background: `url(${require("../../assets/img/profile.jpg")}) center`,
          }}
        ></section>

        <section
          style={{ marginTop: "-80px", marginLeft: 35, display: "flex" }}
        >
          <img
            style={{
              width: 130,
              height: 130,
              borderRadius: 20,
              boxShadow: "0px 1px 5px 1px black",
            }}
            src={require("../../assets/img/profile.jpg")}
            alt=""
          />
          <div style={{ marginTop: "auto", marginLeft: 12 }}>
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
    // user: state.user.user,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(Profile);
