import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import TopNavigation from "../Components/TopNavigation";
import { Container } from "../Components/BaseComponents";
import { getGroup, newChat } from "../redux/actions/group";
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
  display: flex;
  flex-direction: column;
  padding: 3px;
  width: 83%;
  border-radius: 12px;
  margin-top: 9px;
  margin-bottom: 9px;
  margin-right: 6px;
  box-shadow: 0px 0px 4px 0px #00000071;
  cursor: normal;
`;

class Group extends Component {
  state = {
    message: "",
  };

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);

    setTimeout(() => {
      document.title = "Schway |g " + this.props.group.name;
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
    this.props.newChat(this.props.match.params.id, body);
    this.setState({ message: "" });
  };

  render() {
    let { group, chats, user } = this.props;

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
                  src={group?.profileImg}
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
                    {group?.name}
                  </h1>
                  <p style={{ fontSize: 12, color: "grey" }}>{group?.bio}</p>
                </div>
              </div>
            }
          />

          <section style={{ marginTop: 20 }}>
            {chats.map((chat) => (
              <BroadcastBubble
                key={chat._id}
                className="chat_bubble"
                style={{
                  backgroundColor:
                    user?._id === chat?.user?._id ? "white" : "#0000ff98",
                  marginLeft: user?._id === chat?.user?._id ? "auto" : 6,
                  color: user?._id === chat?.user?._id ? "#1a1a1a" : "white",
                }}
              >
                <p>@{chat?.user?.username}</p>
                <p style={{ margin: 8 }}>{chat.body}</p>
                {chat?.mediaUrl ? (
                  <img
                    src={chat.mediaUrl}
                    alt=""
                    srcSet=""
                    style={{ borderRadius: 12, width: "100%" }}
                  />
                ) : null}

                <span
                  style={{
                    fontSize: 11,
                    marginLeft: "auto",
                    marginRight: 6,
                  }}
                >
                  <i>
                    <TimeAgo date={chat?.timestamp} />
                  </i>
                </span>
              </BroadcastBubble>
            ))}
          </section>

          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </Container>

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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    group: state.groups.group,
    chats: state.groups.chats,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { getGroup, newChat })(Group);
