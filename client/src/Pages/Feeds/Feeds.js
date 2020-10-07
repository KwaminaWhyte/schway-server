import React, { Component } from "react";
import { connect } from "react-redux";
// import Modal from "react-modal";
// import { IoIosCloseCircle } from "react-icons/io ";

import "./feeds.css";
import FeedCard from "../../Components/FeedCard";
import RightFeed from "../../Components/RightFeed";
import { fetchFeeds, newFeed } from "../../redux/actions/feedAction";

class Feeds extends Component {
  state = {
    feeds: [],
    modalIsOpen: false,
    feedDetails: false,

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

  handleSearch = (e) => {
    e.preventDefault();
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.feeds;
      newList = currentList.filter((feed) => {
        const lc = feed.user.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.feeds;
    }
    this.setState({ feeds: newList });
  };

  render() {
    let { feeds } = this.props;

    return (
      <div className="Feeds">
        <section className="main_feeds_container">
          {feeds &&
            feeds.map((feed) => <FeedCard key={feed._id} feed={feed} />)}
        </section>

        <section className="right_bar_container">
          <RightFeed />
        </section>
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
