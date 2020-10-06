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

import "./style.css";
import { deleteFeed } from "../../redux/actions/feedAction";
// import { fetchUser } from "../../redux/actions/userAction";

class FeedCard extends Component {
  state = {};

  componentDidMount() {}

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

  render() {
    let { feed } = this.props;

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

            <div style={{ zIndex: 12 }}>
              <h1>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/profile/${feed.user}`}
                >
                  {feed.user}
                </Link>
              </h1>
              <p style={{ fontSize: 12 }}>Winneba</p>
              <p style={{ fontSize: 12 }}>
                <TimeAgo date={feed.timestamp} />
              </p>
            </div>
          </div>

          <IoIosMenu
            onClick={() => this.props.deleteFeed(feed._id)}
            size={20}
          />
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
            <div className="feed_btm_icn">
              <IoIosChatboxes /> 12k
            </div>
            <div className="feed_btm_icn" style={{ marginLeft: "auto" }}>
              <IoIosShareAlt />
              Share
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // users: state.user.user,
  };
};

export default connect(mapStateToProps, { deleteFeed })(FeedCard);
