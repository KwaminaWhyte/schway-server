import React, { Component } from "react";
import {
  IoIosAddCircleOutline,
  IoIosPaperPlane,
  IoIosMenu,
  IoIosArrowBack,
} from "react-icons/io";
import "./messages.css";

import { messages } from "../../assets/data";

export default class Chats extends Component {
  state = {
    userId: 1,
  };

  closeChat = () => {
    document.getElementById("chat_section").style = "margin-left: 100vw;";
    // document.getElementById("msg_section").style = "margin-left: 0vw;";
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
      <div className="chat_container">
        <section
          style={{
            position: "fixed",
            top: 0,
            backgroundColor: "white",
            height: 55,
            padding: "5px 0",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderBottom: "0.3px solid #e1e1e1",
          }}
        >
          <IoIosArrowBack
            className="chat_back_btn"
            onClick={this.closeChat}
            style={{
              fontWeight: "bold",
              padding: 5,
              color: "grey",
            }}
            // color="red"
            size={40}
          />

          <img
            style={{
              width: 35,
              height: 35,
              borderRadius: "50%",
              marginLeft: 8,
            }}
            src={require("../../assets/img/profile.jpg")}
            alt=""
          />
          <div
            style={{ display: "flex", flexDirection: "column", marginLeft: 12 }}
          >
            <h6>{this.props.name}</h6>
            <p style={{ fontSize: 12, color: "grey" }}>Last seen 6 hours ago</p>
          </div>

          <div style={{ marginLeft: "auto", marginRight: 8 }}>
            <IoIosMenu />
          </div>
        </section>

        <div style={{ height: 55 }}></div>

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
                  width: "100%",
                }}
                src={require("../../assets/img/profile.jpg")}
                alt=""
              />
            ) : null}

            <p style={{ margin: 8 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
              at, asperiores soluta quam eos voluptatem magnam rerum! A
              distinctio laborum dolorem necessitatibus inventore placeat
              ducimus!
            </p>
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
      </div>
    );
  }
}
