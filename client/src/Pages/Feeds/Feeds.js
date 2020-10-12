import React, { Component } from "react";
import { connect } from "react-redux";
import Pusher from "pusher-js";

import "./feeds.css";
import FeedCard from "../../Components/FeedCard";
import TopNavigation from "../../Components/TopNavigation";
import { fetchFeeds } from "../../redux/actions/feedAction";

class Feeds extends Component {
  state = {
    feeds: [],
  };

  componentDidMount() {
    this.props.fetchFeeds();

    let user = this.props.user.username;
    this.setState({ user, feeds: this.props.feeds });

    const pusher = new Pusher("aba59cc7ba83cc677c53", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("feeds");
    channel.bind("inserted", (newFeed) => {
      // alert(JSON.stringify(newFeed));

      this.props.fetchFeeds();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }

  render() {
    let { feeds } = this.props;
    console.log(this.state.feeds);

    return (
      <div className="Feeds">
        <TopNavigation pageTitle="Home" rightContents />
        <div className="nav-spacer"></div>

        {feeds && feeds.map((feed) => <FeedCard key={feed._id} feed={feed} />)}
      </div>
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
})(Feeds);
