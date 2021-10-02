import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  IoIosChatbubbles,
  IoIosHeart,
  IoIosMenu,
  IoIosShare,
} from "react-icons/io";
import TimeAgo from "react-timeago";
import ReactPlayer from "react-player";
import { OverlayTrigger, Popover } from "react-bootstrap";

import { deleteFeed } from "../redux/actions/feedAction";
import { fetchComments } from "../redux/actions/commentAction";
import { FeedCardContainer } from "./BaseComponents";

class FeedCard extends Component {
  state = {
    playing: false,
  };

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
          id="video"
          url={url}
          playing={this.state.playing}
          width="100%"
        />
      );
    else if (type === "image/png" || "image/jpeg")
      return (
        <img
          loading="lazy"
          style={{
            width: "100%",
            borderRadius: 20,
            height: 240,
            border: "0.3px solid #e1e1e1",
            objectFit: "cover",
          }}
          src={url}
          alt=""
        />
      );
  };

  render() {
    let { feed } = this.props;

    return (
      <FeedCardContainer>
        <section className="feed_card_top">
          <div className="feed_dp_container">
            <img className="feed_dp" src={feed?.user?.profile_img} alt="" />
            <Link
              className="feed_card_profile_link"
              to={`/profile/${feed?.user?.username}`}
            >
              <p>
                {feed?.user?.firstname} {feed.user?.lastname}
              </p>
              <span>
                @{feed?.user?.username}{" "}
                <TimeAgo className="timestamp" date={feed?.timestamp} />
              </span>
            </Link>
          </div>

          <OverlayTrigger
            style={{ zIndex: 10 }}
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Content
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <p disable style={{ margin: 8, cursor: "pointer" }}>
                    <strong>Report Feed</strong>
                  </p>

                  {feed?.user?._id === this.props.user._id ? (
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
            <Link to="#" className="mainmenubtn">
              <IoIosMenu size={20} />
            </Link>
          </OverlayTrigger>
        </section>

        <Link
          style={{
            margin: "0",
            flex: 1,
            marginLeft: 60,
          }}
          to={`/feeds/d/${feed?._id}`}
        >
          <p
            style={{
              whiteSpace: "pre-wrap",
              fontSize: 15,
              marginBottom: 5,
            }}
          >
            {feed?.body}
          </p>

          <section className="feed_media_container">
            {feed?.mediaUrl ? (
              this.fileTypeChanger(feed?.mediaType, feed?.mediaUrl)
            ) : (
              <div
                style={{
                  height: 1,
                }}
              />
            )}
          </section>
        </Link>

        <section
          style={{
            padding: "3px 12px",
            marginTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div className="feed_btm_icn">
              <IoIosHeart color="red" size={25} />
              <p> {feed?.likes?.length}</p>
            </div>
            <div className="feed_btm_icn">
              <IoIosChatbubbles size={25} />
              {feed?.comments?.length}
            </div>

            <IoIosShare style={{ marginLeft: "auto" }} size={25} />
          </div>
        </section>
      </FeedCardContainer>
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
})(FeedCard);
