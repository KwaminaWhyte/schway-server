import React, { Component } from "react";
import { connect } from "react-redux";

import "./profile.css";
import { fetchUser } from "../../redux/actions/userAction";

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
            <h1>
              {user.firstname} {user.lastname}
            </h1>
            <p style={{ fontSize: 12, color: "grey" }}>
              <i>@{user.username}</i>
            </p>
            <p style={{ fontSize: 14 }}>UI/UX Developer @app_deity</p>
          </div>
        </section>

        <section
          style={{
            display: "flex",
            width: "95%",
            margin: "50px auto 10px auto",
            padding: 15,
            backgroundColor: "white",
            borderRadius: 20,
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
