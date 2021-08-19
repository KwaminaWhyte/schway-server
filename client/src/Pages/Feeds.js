import React, { Component } from "react";
import { connect } from "react-redux";

import FeedCard from "../Components/FeedCard";
import TopNavigation from "../Components/TopNavigation";
import { fetchFeeds, newFeed } from "../redux/actions/feedAction";
import { Container, Spacer } from "../Components/BaseComponents";

class Feeds extends Component {
  state = {
    feeds: [],
    user: "",
    body: "",
    mediaUrl: "",
  };

  componentDidMount() {
    this.props.fetchFeeds();

    let user = this.props.user.username;
    this.setState({ user });
  }

  handleModalText = (e) => {
    e.preventDefault();

    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let { feeds } = this.props;

    return (
      <Container>
        <TopNavigation pageTitle="Home" rightContents />
        <Spacer className="nav-spacer" />

        {feeds && feeds.map((feed) => <FeedCard key={feed._id} feed={feed} />)}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feeds: state.feeds.feeds,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  fetchFeeds,
  newFeed,
})(Feeds);
