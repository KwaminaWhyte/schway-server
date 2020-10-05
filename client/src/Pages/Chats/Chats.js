import React, { Component } from "react";
import {
  IoIosAddCircleOutline,
  IoIosPaperPlane,
  IoIosMenu,
} from "react-icons/io";
import "./messages.css";

import { messages } from "../../assets/data";

export default class Chats extends Component {
  state = {
    userId: 1,
  };

  render() {
    if (this.props.chatId === "") {
      return (
        <section
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Start Chat here</h1>
        </section>
      );
    }

    return (
      <div
        style={{
          height: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <section
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            height: 35,
            padding: 5,
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 1px 3px 3px #e1e1e1",
          }}
        >
          <img
            style={{ width: 35, height: 35, borderRadius: "50%" }}
            src={require("../../assets/img/profile.jpg")}
            alt=""
          />
          <div
            style={{ display: "flex", flexDirection: "column", marginLeft: 12 }}
          >
            <h1>{this.props.name}</h1>
            <p style={{ fontSize: 12, color: "grey" }}>Last seen 6 hours ago</p>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <IoIosMenu />
          </div>
        </section>

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
            {message.imgUrl ? (
              <img
                style={{
                  borderRadius: 12,
                  marginBottom: 12,
                  width: "100%",
                }}
                src={require("../../assets/img/profile.jpg")}
                alt=""
              />
            ) : null}

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
              at, asperiores soluta quam eos voluptatem magnam rerum! A
              distinctio laborum dolorem necessitatibus inventore placeat
              ducimus!
            </p>
            <span
              style={{
                fontSize: 11,
                marginLeft: message.userId === 1 ? "auto" : 6,
                marginRight: message.userId === 1 ? 6 : "auto",
              }}
            >
              <i>05:06</i>
            </span>
          </div>
        ))}

        <section className="add_msg_container">
          <IoIosAddCircleOutline size={30} color="blue" />
          <input
            className="message_input_field"
            type="text"
            placeholder="type message"
          />

          <IoIosPaperPlane
            size={20}
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
      </div>
    );
  }
}
