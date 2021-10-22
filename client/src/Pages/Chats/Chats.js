import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TimeAgo from "react-timeago";
import styled from "styled-components";

import {
  IoIosAddCircleOutline,
  IoIosPaperPlane,
  IoIosArrowBack,
} from "react-icons/io";
import { connect } from "react-redux";

import "./style.css";
import TopNavigation from "../../Components/TopNavigation";
import { getConversation, newMessage } from "../../redux/actions/chat";
import { Container } from "../../Components/BaseComponents";

// import { io } from "socket.io-client";
// const socket = io();

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
class Chats extends Component {
  state = {
    message: "",
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
    this.props.getConversation(this.props.computedMatch.params.id);
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  render() {
    let { user, conversation, messages } = this.props;
    let toUser = conversation?.participants?.filter(
      (uto) => uto._id !== user._id
    );

    return (
      <Container>
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
                  cursor: "pointer",
                }}
                size={40}
              />

              {toUser?.map((user) => (
                <img
                  key={user._id}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginLeft: 8,
                  }}
                  src={user?.profile_img}
                  alt=""
                />
              ))}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 12,
                }}
              >
                {toUser?.map((user) => (
                  <p
                    key={user._id}
                    style={{ fontWeight: "bold", fontSize: 16 }}
                  >
                    {user?.username}
                  </p>
                ))}

                <p style={{ fontSize: 12, color: "grey" }}>
                  Last seen recently
                </p>
              </div>
            </div>
          }
        />

        <section className="chat_section">
          {messages.map((message) => (
            <div
              key={message._id}
              className="chat_bubble"
              style={{
                backgroundColor:
                  message?.sender === user?._id ? "white" : "#0000ff98",
                marginLeft: message?.sender === user?._id ? "auto" : 6,
                color: message?.sender === user?._id ? "#1a1a1a" : "white",
              }}
            >
              {message?.mediaUrl !== "" ? (
                <img
                  style={{
                    borderRadius: 12,
                    width: "100%",
                  }}
                  src={message?.mediaUrl}
                  alt=""
                />
              ) : null}

              <p style={{ margin: 8 }}>{message.body}</p>
              <span
                style={{
                  fontSize: 11,
                  marginLeft: "auto",
                  marginRight: 6,
                }}
              >
                <i>
                  <TimeAgo date={message?.createdAt} />
                </i>
              </span>
            </div>
          ))}
        </section>

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
            onClick={() => {
              this.props.newMessage(
                { body: this.state.message },
                this.props.computedMatch.params.id
              );
              this.setState({ message: "" });
            }}
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

        <div
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    conversation: state.chats.conversation,
    messages: state.chats.messages,
  };
};
export default connect(mapStateToProps, { getConversation, newMessage })(
  withRouter(Chats)
);
