import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  IoIosAddCircleOutline,
  IoIosPaperPlane,
  IoIosArrowBack,
} from "react-icons/io";

import "./style.css";
import { messages } from "../../assets/data";
import TopNavigation from "../../Components/TopNavigation/TopNavigation";

class Chats extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  render() {
    return (
      <div className="Chats">
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
                  cursor: 'pointer'
                }}
                size={40}
              />

              <img
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginLeft: 8,
                }}
                src="https://i.ibb.co/WH1qmRS/grahame-jenkins-ua9b-UXz-UUpw-unsplash.jpg"
                alt="profile"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 12,
                }}
              >
                <p style={{ fontWeight: "bold", fontSize: 16 }}>
                  {this.props.computedMatch.params.username}
                </p>
                <p style={{ fontSize: 12, color: "grey" }}>
                  Last seen recently
                </p>
              </div>
            </div>
          }
        />
        <div className="nav-spacer"></div>

        <section className="chat_section">
          {messages.map((message) => (
            <div
              key={message.id}
              className="chat_bubble"
              style={{
                backgroundColor: message.userId === 1 ? "white" : "#0000ff98",
                marginLeft: message.userId === 1 ? "auto" : 6,
                color: message.userId === 1 ? "#1a1a1a" : "white",
              }}
            >
              {message.imgUrl !== "" ? (
                <img
                  style={{
                    borderRadius: 12,
                    width: "100%",
                  }}
                  src={message.imgUrl}
                  alt="profile"
                />
              ) : null}

              <p style={{ margin: 8 }}>{message.text}</p>
              <span
                style={{
                  fontSize: 11,
                  marginLeft: "auto",
                  marginRight: 6,
                }}
              >
                <i>05:06</i>
              </span>
            </div>
          ))}
        </section>

        <section className="add_msg_container">
          <IoIosAddCircleOutline size={30} color="blue" />
          <input
            className="message_input_field"
            type="text"
            placeholder="type message"
          />

          <IoIosPaperPlane
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
        </section>

        <div
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export default withRouter(Chats);
