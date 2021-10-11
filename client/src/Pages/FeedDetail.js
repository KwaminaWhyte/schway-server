import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import ReactPlayer from "react-player";
import { IoIosArrowBack } from "react-icons/io";

import TopNavigation from "../Components/TopNavigation";

import { deleteFeed, fetchFeed } from "../redux/actions/feedAction";
import { newComment } from "../redux/actions/commentAction";
import { FormContainer, Container, Spacer } from "../Components/BaseComponents";

class FeedDetail extends Component {
  state = {
    body: "",
    feed_id: "",

    playing: true,
  };

  componentDidMount() {
    this.props.fetchFeed(this.props.computedMatch.params.id);

    this.setState({
      feed_id: this.props.computedMatch.params.id,
    });
  }

  fileTypeChanger = (type, url) => {
    if (type === "audio")
      return (
        <audio
          controls={true}
          style={{
            width: "100%",
            borderRadius: 20,
          }}
          name="my_awesome_audio"
          src={url}
        ></audio>
      );
    else if (type === "video")
      return (
        <ReactPlayer
          onClick={() => this.setState({ playing: !this.state.playing })}
          volume={0.6}
          url={url}
          playing={this.state.playing}
          width="100%"
        />
      );
    else if (type === "image")
      return (
        <img
          style={{
            width: "98%",
            borderRadius: 12,
            border: "0.3px solid #e1e1e1",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={url}
          alt=""
        />
      );
  };

  handleCommentText = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitNewComment = (e) => {
    e.preventDefault();
    let { feed_id, body } = this.state;
    this.props.newComment({ feed_id, body });
    this.setState({ body: "" });
    this.props.fetchFeed(this.props.match.params.id);
  };

  render() {
    let { feed, comments } = this.props;

    return (
      <Container className="FeedDetail">
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

              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: 23,
                }}
              >
                Feed
              </h1>
            </div>
          }
        />
        <Spacer />

        <Link
          to={`/profile/${feed?.user?.username}/${feed?.user?._id}`}
          style={{ display: "flex", alignItems: "center", margin: 5 }}
        >
          <img
            style={{ height: 60, width: 60, borderRadius: 30 }}
            src={feed?.user?.profile_img}
            alt=""
          />

          <div
            style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
          >
            <p style={{ fontWeight: "bold" }}>
              {feed?.user?.firstname} {feed.user?.lastname}
            </p>
            <p>@{feed?.user?.username}</p>
          </div>
        </Link>

        <section style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", padding: 8 }}>
            <p style={{ margin: "5px 20px" }}>{feed.body}</p>

            {feed.mediaUrl ? (
              this.fileTypeChanger(feed.mediaType, feed.mediaUrl)
            ) : (
              <div
                style={{
                  height: 1,
                }}
              />
            )}
          </div>

          <FormContainer
            onSubmit={this.submitNewComment}
            style={{
              display: "flex",
              flexDirection: "row",
              height: "fit-contents",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 10,
              padding: 8,
            }}
          >
            <textarea
              onChange={this.handleCommentText}
              name="body"
              value={this.state.body}
              cols="30"
              rows="2"
              aria-multiline
              placeholder="Add a comment"
              style={{
                resize: "none",
                fontSize: 16,
                flex: 1,
                margin: "0 5px 0 0",
                padding: "3px 10px",
                borderRadius: 12,
              }}
            ></textarea>
            {/*    <IoIosPaperPlane
              type="submit"
              size={25}
              color="purple"
              onClick={() => this.submitNewComment}
            /> */}
            <input
              style={{
                display: "flex",
                margin: 0,
                justifyContent: "center",
                alignItems: "center",
                width: 30,
                height: 30,
                padding: 0,
              }}
              type="submit"
              value=">"
            />
          </FormContainer>

          <section>
            <h6 style={{ padding: 8 }}>{comments.length} Comments</h6>

            {comments &&
              comments.map((comment) => (
                <div
                  key={comment._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 4,
                    borderTop: "1px solid #e1e1e1",
                    margin: 4,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={comment.user?.profile_img}
                      alt="."
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 26,
                        marginTop: "auto",
                        marginLeft: 8,
                        marginBottom: 6,
                      }}
                    />

                    <div style={{ marginLeft: 12 }}>
                      <h6>{comment.user?.username}</h6>
                      <p style={{ fontSize: 12, padding: 0, margin: 0 }}>
                        <TimeAgo date={comment.timestamp} />
                      </p>
                    </div>
                  </div>

                  <p style={{ marginLeft: 50, whiteSpace: "pre-wrap" }}>
                    {comment.body}
                  </p>
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
    user: state.auth.user,
    feed: state.feeds.feed,
    comments: state.feeds.comments,
  };
};

export default connect(mapStateToProps, {
  deleteFeed,
  newComment,
  fetchFeed,
})(FeedDetail);
