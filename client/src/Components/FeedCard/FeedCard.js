import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { IoIosHeart, IoIosMenu } from "react-icons/io";
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

  fileTypeChanger2 = (type, url) => {
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
            border: "0.3px solid #e1e1e1",
          }}
          src={url}
          alt=""
        />
      );
  };

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
            height: 240,
            border: "0.3px solid #e1e1e1",
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
      <NavLink to={`/feeds/${feed._id}`} className="FeedCard">
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
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: 15,
                  display: "flex",
                }}
                to={`/profile/${feed.user.username}`}
              >
                <p style={{ fontWeight: "bold", margin: 0, padding: 0 }}>
                  {feed.user.firstname} {feed.user.lastname}
                </p>
                <span style={{ color: "grey", marginLeft: 8 }}>
                  @{feed.user.username}
                </span>
              </Link>
              {/* <p style={{ fontSize: 12 }}>Winneba</p> */}

              <p style={{ fontSize: 12, margin: 0, padding: 0 }}>
                <TimeAgo date={feed.timestamp} />
              </p>

              <p style={{ margin: "0", whiteSpace: "pre-wrap", fontSize: 15 }}>
                {feed.body}
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
                  <p style={{ margin: 8, cursor: "pointer" }}>
                    <strong>Report Feed</strong>
                  </p>

                  {feed.user._id === this.props.user._id ? (
                    <p
                      style={{ margin: 8, color: "red", cursor: "pointer" }}
                      onClick={() => this.props.deleteFeed(feed._id)}
                    >
                      <strong>Delete Feed</strong>
                    </p>
                  ) : null}
                </Popover.Content>
              </Popover>
            }
          >
            <IoIosMenu className="mainmenubtn" size={20} />
          </OverlayTrigger>
        </section>

        <section
          style={{
            width: "87%",
            marginLeft: "auto",
            marginRight: 10,
          }}
        >
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
              <IoIosHeart color="red" size={20} /> <p>344</p>
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
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.00881 5.00881C5.13222 3.32652 6.5362 2 8.25 2H17.25C19.8734 2 22 4.12665 22 6.75V12.75C22 14.4638 20.6735 15.8678 18.9912 15.9912C18.8678 17.6735 17.4638 19 15.75 19H10.6667L7 21.75C6.17595 22.368 5 21.7801 5 20.75V18.9905C3.32189 18.8629 2 17.4608 2 15.75V8.25C2 6.5362 3.32652 5.13222 5.00881 5.00881ZM6.51772 5H15.75C17.5449 5 19 6.45507 19 8.25V14.4823C19.8481 14.361 20.5 13.6316 20.5 12.75V6.75C20.5 4.95507 19.0449 3.5 17.25 3.5H8.25C7.36838 3.5 6.63903 4.15193 6.51772 5ZM5.25 17.5H6.5V20.25L10.1667 17.5H15.75C16.7165 17.5 17.5 16.7165 17.5 15.75V8.25C17.5 7.2835 16.7165 6.5 15.75 6.5H5.25C4.2835 6.5 3.5 7.2835 3.5 8.25V15.75C3.5 16.7165 4.2835 17.5 5.25 17.5Z"
                  fill="#212121"
                />
              </svg>
              12k
            </div>
            <div className="feed_btm_icn" style={{ marginLeft: "auto" }}>
              <svg
                height="20"
                viewBox="0 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Solid">
                  <path d="m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z" />
                  <path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z" />
                </g>
              </svg>
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
                this.fileTypeChanger2(feed.mediaType, feed.mediaUrl)
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
      </NavLink>
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
