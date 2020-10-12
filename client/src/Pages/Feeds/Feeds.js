import React, { Component } from "react";
import { connect } from "react-redux";
import Pusher from "pusher-js";

import "./feeds.css";
import FeedCard from "../../Components/FeedCard";
import TopNavigation from "../../Components/TopNavigation";
import { fetchFeeds, newFeed } from "../../redux/actions/feedAction";

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

    const pusher = new Pusher("aba59cc7ba83cc677c53", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("feeds");
    channel.bind("inserted", function (newFeed) {
      alert(JSON.stringify(newFeed));

      this.setState((prevState) => {
        return {
          feeds: newFeed,
        };
      });
    });
  }

  handleModalText = (e) => {
    e.preventDefault();

    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    let { feeds } = this.props;

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
  newFeed,
})(Feeds);
