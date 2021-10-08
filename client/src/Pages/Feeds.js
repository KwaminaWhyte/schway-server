import React, { Component } from "react";
import { connect } from "react-redux";

import FeedCard from "../Components/FeedCard";
import TopNavigation from "../Components/TopNavigation";
import { fetchFeeds } from "../redux/actions/feedAction";
import { Container, Spacer } from "../Components/BaseComponents";
// import Loading from "../Components/Loading";

class Feeds extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchFeeds();
  }

  render() {
    let { feeds } = this.props;

    // if (feeds === []) {
    //   return <Loading />;
    // }

    return (
      <Container>
        <TopNavigation pageTitle="Home" rightContents />
        <Spacer className="nav-spacer" />

        {feeds?.map((feed) => (
          <FeedCard key={feed._id} feed={feed} />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feeds: state.feeds.feeds,
  };
};

export default connect(mapStateToProps, {
  fetchFeeds,
})(Feeds);
