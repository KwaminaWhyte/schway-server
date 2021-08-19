import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import ReactPlayer from "react-player";
import { IoIosArrowBack } from "react-icons/io";

import TopNavigation from "../Components/TopNavigation";

import { deleteFeed, fetchFeed } from "../redux/actions/feedAction";
import { fetchComments, newComment } from "../redux/actions/commentAction";
import { FormContainer, Container, Spacer } from "../Components/BaseComponents";

class FeedDetail extends Component {
  state = {
    body: "",
    feed_id: "",

    playing: true,
  };

  componentDidMount() {
    this.props.fetchFeed(this.props.computedMatch.params.id);
    this.props.fetchComments(this.props.computedMatch.params.id);

    this.setState({
      feed_id: this.props.computedMatch.params.id,
    });
  }

  fileTypeChanger = (type, url) => {
    if (type === "audio/mpeg")
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
    else if (type === "video/mp4")
      return (
        <ReactPlayer
          onClick={() => this.setState({ playing: !this.state.playing })}
          volume={0.6}
          url={url}
          playing={this.state.playing}
          width="100%"
        />
      );
    else if (type === "image/png" || "image/jpeg")
      return (
        <img
          style={{
            width: "98%",
            borderRadius: 20,
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
    this.props.fetchComments(feed_id);
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

              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 23,
                }}
              >
                Feed
              </p>
            </div>
          }
        />
        <Spacer className="nav-spacer" />

        <div style={{ width: "100%" }}>
          <section
            style={{ display: "flex", flexDirection: "column", padding: 8 }}
          >
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
          </section>

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
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://i.ibb.co/ZxWh6dj/profile2.jpg"
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
                      <h6>{comment.user.username}</h6>
                      <p style={{ fontSize: 12, padding: 0, margin: 0 }}>
                        <TimeAgo date={comment.timestamp} />
                      </p>
                    </div>
                  </div>

                  <p style={{ marginLeft: 50 }}>{comment.body}</p>
                </div>
              ))}
          </section>

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
              rows="1"
              placeholder="Add a comment"
              style={{
                resize: "none",
                fontSize: 16,
                flex: 1,
                margin: "0 5px 0 0",
              }}
            ></textarea>

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
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    user: state.auth.user,
    feed: state.feeds.feed,
  };
};

export default connect(mapStateToProps, {
  deleteFeed,
  fetchComments,
  newComment,
  fetchFeed,
})(withRouter(FeedDetail));
