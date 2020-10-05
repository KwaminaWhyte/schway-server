import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";

import {
  IoIosSearch,
  IoIosAddCircleOutline,
  IoIosNavigate,
  IoIosCloseCircle,
  IoIosImages,
  IoIosMusicalNotes,
  IoIosVideocam,
  IoIosPaperPlane,
} from "react-icons/io";

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

  submitNewFeed = (e) => {
    e.preventDefault();
    let { user, body, mediaUrl } = this.state;

    if (body !== "") {
      this.props.newFeed({ user, body, mediaUrl });
      this.setState({ modalIsOpen: false });
    } else {
      alert("Type something");
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.feeds;
      console.log(currentList);
      newList = currentList.filter((feed) => {
        const lc = feed.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.feeds;
    }
    this.setState({ feeds: newList });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  closeDetailModal = () => {
    this.setState({ feedDetails: false });
  };

  render() {
    let { feeds } = this.props;

    return (
      <div className="Feeds">
        <section className="main_feeds_container">
          <section className="search_bar_container">
            <IoIosSearch size={20} color="blue" />
            <input
              style={{
                flex: 1,
                margin: "0 12px",
                borderRadius: 12,
                border: "none",
              }}
              placeholder="search..."
              // onChange={this.handleSearch}
              type="search"
              name="search"
              id="search"
            />

            <p
              style={{
                fontSize: 11,
                backgroundColor: "#e1e1e1",
                borderRadius: 12,
                padding: "5px 8px",
                fontWeight: "bold",
              }}
            >
              FILTERS
            </p>
            <IoIosAddCircleOutline
              onClick={() => this.setState({ modalIsOpen: true })}
              style={{
                backgroundColor: "#e1e1e1",
                borderRadius: 20,
                padding: 4,
                marginLeft: 8,
              }}
              size={20}
              color="blueviolet"
            />

            <Link style={{}} to="/explore">
              <IoIosNavigate
                style={{
                  backgroundColor: "#e1e1e1",
                  borderRadius: 20,
                  padding: 4,
                  marginLeft: 8,
                }}
                size={20}
                color="blueviolet"
              />
            </Link>
          </section>

          {/* {users.map((user) => (
            <h1>{user.username}</h1>
          ))} */}

          {feeds &&
            feeds.map((feed) => (
              <FeedCard
                key={feed._id}
                feed={feed}
                // user={users.filter((user) => user._id === feed.userId)}
              />
            ))}
        </section>

        <section className="right_bar_container">
          <RightFeed />
        </section>

        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.326)",
              zIndex: 310,
              display: "flex",
            },
            content: {
              // top: "30%",
              // left: "50%",
              // right: "auto",
              // bottom: "auto",
              // marginRight: "-50%",
              // transform: "translate(-50%, -50%)",

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
            onClick={this.closeModal}
            size={20}
            color="red"
            style={{ marginLeft: "auto" }}
          />
          <h1>Create feed</h1>
          <form
            className="new_feed_form_container"
            onSubmit={this.submitNewFeed}
          >
            <textarea
              onChange={this.handleModalText}
              name="body"
              value={this.state.body}
              id=""
              cols="30"
              rows="10"
              placeholder="What's on your mind?"
            ></textarea>

            {/* <input
              onChange={this.handleModalText}
              name="mediaUrl"
              value={this.state.mediaUrl}
              type="file"
            /> */}
            {/* <input
              onChange={this.handleModalText}
              type="text"
              placeholder="media"
              name="mediaUrl"
              value={this.state.mediaUrl}
            /> */}

            <section style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "rgba(137, 43, 226, 0.19)",
                  borderRadius: 20,
                  padding: "8px 12px",
                  width: "fit-contents",
                  display: "flex",
                  margin: 6,
                }}
              >
                <IoIosImages size={20} color="blueviolet" />
                <p style={{ marginLeft: 6 }}>Image</p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(137, 43, 226, 0.19)",
                  borderRadius: 20,
                  padding: "8px 12px",
                  width: "fit-contents",
                  display: "flex",
                  margin: 6,
                }}
              >
                <IoIosMusicalNotes size={20} color="blueviolet" />
                <p style={{ marginLeft: 6 }}>Audio</p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(137, 43, 226, 0.19)",
                  borderRadius: 20,
                  padding: "8px 12px",
                  width: "fit-contents",
                  display: "flex",
                  margin: 6,
                }}
              >
                <IoIosVideocam size={20} color="blueviolet" />
                <p style={{ marginLeft: 6 }}>Video</p>
              </div>
            </section>

            <IoIosPaperPlane size={20} />
            <input type="submit" value="POST" />
          </form>
        </Modal>

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
