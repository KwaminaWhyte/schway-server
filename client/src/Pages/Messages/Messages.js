import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./chats.css";
import Chats from "../Chats";
import { chats } from "../../assets/data";
import { fetchUser } from "../../redux/actions/userAction";

class Messages extends Component {
  state = {
    chats: chats,
    chatId: "",
    name: "",

    search: "",
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  handleTextInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = chats;
      console.log(currentList);
      newList = currentList.filter((chat) => {
        const lc = chat.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = chats;
    }
    this.setState({ chats: newList });
  };

  render() {
    let { users } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          width: "calc(100vw - 200px)",
          position: "fixed",
        }}
      >
        <section
          style={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflowX: "hidden",
            overflowY: "auto",
            borderRight: "1px solid grey",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              height: 35,
              padding: 5,
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 1px 3px 3px #e1e1e1",
              zIndex: 200,
            }}
          >
            <h1>Chats</h1>

            <input
              style={{ borderRadius: 20, border: "none", padding: 10, flex: 1 }}
              onChange={this.handleSearch}
              type="search"
              name="search"
              placeholder="search..."
              id="search"
            />
          </div>
          {users.map((user) => (
            <NavLink
              key={user._id}
              exact
              onClick={() =>
                this.setState({ chatId: user._id, name: user.username })
              }
              to={`${this.props.match.url}/${user.username}`}
              className="chat_item_container"
              activeClassName="chat_item_container_active"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: 60, height: 60, borderRadius: "50%" }}
                  src={require("../../assets/img/profile.jpg")}
                  alt=""
                />
                <div style={{ marginLeft: 12 }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "#131313",
                      fontSize: 17,
                    }}
                  >
                    {user.username}
                  </p>
                  <p style={{ color: "#5e5e5e" }}>someting else</p>
                </div>

                <p
                  style={{
                    marginLeft: "auto",
                    color: "#5e5e5e",
                    fontSize: 14,
                  }}
                >
                  timestamp
                </p>
              </div>

              <p style={{ margin: "7px 20px", color: "#292929" }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>

              <div className="chat_files_container">
                <p className={`chat_file doc_file`}>document.docx</p>
                <p className="chat_file img_file">image.jpg</p>
                <p className="chat_file audio_file">music.mp3</p>
                <p className="chat_file video_file">video.mp4</p>
              </div>
            </NavLink>
          ))}

          <div style={{ height: 20 }}>.</div>
        </section>

        <section
          style={{
            // flex: 1,
            width: "55%",
          }}
        >
          <Route
            exact
            path={`${this.props.match.url}/${this.state.name}`}
            render={(props) => (
              <Chats
                {...props}
                chatId={this.state.chatId}
                name={this.state.name}
              />
            )}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { fetchUser })(Messages);
