import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import { fetchUsers } from "../../redux/actions/userAction";
import TopNavigation from "../../Components/TopNavigation";

class Messages extends Component {
  state = {
    // chats: chats,
    chatId: "",
    name: "",

    search: "",
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleTextInput = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // handleSearch = (e) => {
  //   e.preventDefault();
  //   let currentList = [];
  //   let newList = [];

  //   if (e.target.value !== "") {
  //     currentList = chats;
  //     console.log(currentList);
  //     newList = currentList.filter((chat) => {
  //       const lc = chat.name.toLowerCase();
  //       const filter = e.target.value.toLowerCase();
  //       return lc.includes(filter);
  //     });
  //   } else {
  //     newList = chats;
  //   }
  //   this.setState({ chats: newList });
  // };

  openChat = () => {
    // document.getElementById("msg_section").style =
    //   "margin-left: -100%; width: 0";
    // document.getElementById("chat_section").style = "margin-left: 0;";
  };

  render() {
    let { users } = this.props;

    return (
      <div className="Messages">
        <TopNavigation pageTitle=" Messages" />
        <div className="nav-spacer"></div>

        <section className="msg_section">
          {users.map((user) => (
            <NavLink
              key={user._id}
              exact
              // onClick={() => {
              //   this.setState({ chatId: user._id, name: user.username });
              //   this.openChat();
              // }}
              to={`${this.props.computedMatch.url}/${user.username}`}
              className="msg_item_container"
              activeClassName="msg_item_container_active"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: 60, height: 60, borderRadius: "50%" }}
                  src="https://i.ibb.co/PQ3rWhH/profile.jpg"
                  alt="profile"
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
                  14:02
                </p>
              </div>
            </NavLink>
          ))}

          <div style={{ height: 20 }}>.</div>
        </section>

        {/* <section id="chat_section" className="chat_section">
            <Route
              exact
              path={`${this.props.computedMatch.url}/${this.state.name}`}
              render={(props) => (
                <Chats
                  {...props}
                  chatId={this.state.chatId}
                  name={this.state.name}
                />
              )}
            />
          </section> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { fetchUsers })(Messages);
