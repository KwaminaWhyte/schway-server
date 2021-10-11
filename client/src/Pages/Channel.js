import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import TopNavigation from "../Components/TopNavigation";
import { Container } from "../Components/BaseComponents";
import { getChannel, newBroadcast } from "../redux/actions/channel";
import {
  IoIosAddCircleOutline,
  IoIosArrowBack,
  IoIosPaperPlane,
} from "react-icons/io";

const MessageFieldCon = styled.section`
  display: flex;
  background-color: white;
  bottom: 0;
  height: 55px;
  align-items: center;
  padding: 5px;
  width: 100%;
  border-top: 0.5px solid #ebebeb;
  z-index: 100;
  margin-top: auto;
`;

const BroadcastBubble = styled.div`
  border-radius: 12px;
  padding: 5px;
  background-color: #dadada;
  margin: 5px 10px;
`;

class Channel extends Component {
  state = {
    message: "",
  };

  componentDidMount() {
    this.props.getChannel(this.props.match.params.id);

    setTimeout(() => {
      document.title = "Schway |c " + this.props.channel.name;
    }, 1000);

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  broadcastMessage = () => {
    let body = this.state.message;
    this.props.newBroadcast(this.props.match.params.id, body);
    this.setState({ message: "" });
  };

  render() {
    let { channel, broadcasts, user } = this.props;

    return (
      <>
        <Container style={{}}>
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

                <img
                  src={channel?.profileImg}
                  alt=""
                  srcSet=""
                  style={{ height: 40, width: 40, borderRadius: 12 }}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 12,
                  }}
                >
                  <h1 style={{ fontWeight: "bold", fontSize: 16 }}>
                    {channel?.name}
                  </h1>
                  <p style={{ fontSize: 12, color: "grey" }}>{channel?.bio}</p>
                </div>
              </div>
            }
          />

          <section style={{ marginTop: 20 }}>
            {broadcasts.map((broadcast) => (
              <BroadcastBubble key={broadcast._id}>
                <p>{broadcast?.body}</p>

                <div className="feed_media_container">
                  {broadcast?.mediaUrl ? (
                    <img
                      src={broadcast.mediaUrl}
                      alt=""
                      srcSet=""
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 1,
                      }}
                    />
                  )}
                </div>

                <TimeAgo date={broadcast?.timestamp} />
              </BroadcastBubble>
            ))}
          </section>

          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </Container>

        {user?._id !== channel?.admin?._id ? null : (
          <MessageFieldCon className="add_msg_container">
            <IoIosAddCircleOutline size={30} color="blue" />
            <input
              className="message_input_field"
              type="text"
              placeholder="type message"
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
            />

            <IoIosPaperPlane
              onClick={() => this.broadcastMessage()}
              size={25}
              style={{
                backgroundColor: "blue",
                padding: 4,
                borderRadius: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              color="white"
            />
          </MessageFieldCon>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    channel: state.channels.channel,
    broadcasts: state.channels.broadcasts,
  };
};

export default connect(mapStateToProps, { getChannel, newBroadcast })(Channel);
