import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";

import { IoIosCloseCircle } from "react-icons/io";

import "./feeds.css";
import FeedCard from "../../Components/FeedCard";
import RightFeed from "../../Components/RightFeed";
import { fetchFeeds, newFeed } from "../../redux/actions/feedAction";
// import { fetchComments } from "../../redux/actions/commentAction";
// import { fetchUser } from "../../redux/actions/userAction";

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
    // this.props.fetchComments();

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

  closeDetailModal = () => {
    this.setState({ feedDetails: false });
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

        <Modal
          ariaHideApp={false}
          isOpen={this.state.feedDetails}
          onRequestClose={this.closeDetailModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.326)",
              zIndex: 310,
              display: "flex",
            },
            content: {
              width: "50%",
              height: "fit-contents",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "column",
              borderRadius: 12,
              border: "none",
            },
          }}
          contentLabel="Example Modal"
        >
          <IoIosCloseCircle
            onClick={this.closeDetailModal}
            size={20}
            color="red"
            style={{ marginLeft: "auto" }}
          />

          <section>
            <h1>feed details</h1>
          </section>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feeds: state.feeds.feeds,
    user: state.auth.user,
    // comments: state.comments.comments,
    // users: state.users.users,
  };
};

export default connect(mapStateToProps, {
  fetchFeeds,
  newFeed,
  // fetchComments,
  //  fetchUser
})(Feeds);
