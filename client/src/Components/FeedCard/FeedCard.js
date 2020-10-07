import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  IoIosChatboxes,
  IoIosShareAlt,
  IoIosHeart,
  IoIosMenu,
} from "react-icons/io";
import TimeAgo from "react-timeago";
import ReactPlayer from "react-player";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";

import "./style.css";
import { deleteFeed } from "../../redux/actions/feedAction";
import { fetchComments, newComment } from "../../redux/actions/commentAction";

class FeedCard extends Component {
  state = {
    feedDetailsModal: false,

    user: "",
    body: "",
    feed_id: "",
  };

  componentDidMount() {
    let user = this.props.user._id;
    this.setState({ user });
  }

  fileTypeChanger = (type, url) => {
    if (type === "audio/mpeg")
      return (
        <audio
          controls={true}
          style={{
            width: "100%",
            zIndex: 120,
            borderRadius: 20,
          }}
          name="my_awesome_audio"
          src={url}
        ></audio>
      );
    else if (type === "video/mp4")
      return <ReactPlayer url={url} controls={true} width="100%" />;
    else if (type === "image/png" || "image/jpeg")
      return (
        <img
          style={{
            width: "100%",
            borderRadius: 20,
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
    let { feed_id, user, body } = this.state;
    this.props.newComment({ feed_id, user, body });
    this.setState({ body: "" });

    this.props.fetchComments(feed_id);
  };

  feedDropDown = () => {};

  render() {
    let { feed, comments } = this.props;

    return (
      <div className="FeedCard">
        <section
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
          }}
        >
          <div className="feed_dp_container">
            <img
              className="feed_dp"
              src={require("../../assets/img/profile2.jpg")}
              alt=""
            />

            <div
              style={{
                zIndex: 12,
              }}
            >
              <h6>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/profile/${feed.user}`}
                >
                  {feed.user.username}
                </Link>
              </h6>
              {/* <p style={{ fontSize: 12 }}>Winneba</p> */}
              <p style={{ fontSize: 12, margin: 0, padding: 0 }}>
                <TimeAgo date={feed.timestamp} />
              </p>
            </div>
          </div>

          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Content
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <p style={{ margin: 8 }}>
                    <strong>Report Feed</strong>
                  </p>

                  <p
                    style={{ margin: 8, color: "red" }}
                    onClick={() => this.props.deleteFeed(feed._id)}
                  >
                    <strong>Delete Feed</strong>
                  </p>
                </Popover.Content>
              </Popover>
            }
          >
            <IoIosMenu className="mainmenubtn" size={20} />
          </OverlayTrigger>
        </section>

        <p style={{ margin: "5px 20px" }}>{feed.body}</p>

        <section>
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

        <section
          style={{
            padding: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              margin: "5px 0",
            }}
          >
            <div className="feed_btm_icn">
              <IoIosHeart color="red" size={18} /> <p>344</p>
            </div>
            <div
              onClick={() => {
                this.setState({
                  feedDetailsModal: true,
                  feed_id: feed._id,
                });
                this.props.fetchComments(feed._id);
              }}
              className="feed_btm_icn"
            >
              <IoIosChatboxes /> 12k
            </div>
            <div className="feed_btm_icn" style={{ marginLeft: "auto" }}>
              <IoIosShareAlt />
              Share
            </div>
          </div>
        </section>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.feedDetailsModal}
          onHide={() => this.setState({ feedDetailsModal: false })}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <section>
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

            <form
              className="new_feed_form_container"
              onSubmit={this.submitNewComment}
              style={{
                display: "flex",
                flexDirection: "row",
                height: "fit-contents",
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
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
                  fontSize: 19,
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
            </form>

            <section>
              <h6>{comments.length} Comments</h6>

              {comments.map((comment) => (
                <div
                  key={comment._id}
                  style={{
                    backgroundColor: "#e1e1e1",
                    margin: 5,
                    display: "flex",
                    flexDirection: "column",
                    padding: 4,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={require("../../assets/img/profile2.jpg")}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 26,
                        marginTop: "auto",
                        marginLeft: 8,
                        marginBottom: 6,
                      }}
                      alt=""
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
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  deleteFeed,
  fetchComments,
  newComment,
})(FeedCard);
