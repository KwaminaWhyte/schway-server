import React, { Component } from "react";
import { connect } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

import TopNavigation from "../Components/TopNavigation";
import { Container, Spacer } from "../Components/BaseComponents";
import { fetchUser } from "../redux/actions/userAction";

class Followings extends Component {
  componentDidMount() {
    document.title = "Schway | Profile";
    this.props.fetchUser(this.props.match.params.username);
  }

  render() {
    let { user } = this.props;

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
                  Following & Followers
                </h1>
              </div>
            </div>
          }
        />

        <Spacer />

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 10,
          }}
        >
          <section>
            <h1>Followers</h1>
            {user?.followers?.map((follower) => (
              <div key={follower._id}>
                <p>{follower.username}</p>
              </div>
            ))}
          </section>

          <section>
            <h1>Following</h1>
            {user?.following?.map((follow) => (
              <div key={follow._id}>
                <p>{follow.username}</p>
              </div>
            ))}
          </section>
        </section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
})(Followings);
