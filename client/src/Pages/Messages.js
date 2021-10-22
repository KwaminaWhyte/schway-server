import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import TimeAgo from "react-timeago";

import { fetchUser } from "../redux/actions/userAction";
import TopNavigation from "../Components/TopNavigation";
import { Container, Spacer } from "../Components/BaseComponents";

const MessageSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  border-right: 0.3px solid #c7c7c7;

  .msg_item_container {
    background-color: white;
    padding: 12px;
    text-decoration: none;
    transition-duration: 0.5s;
    border-bottom: 0.3px solid #c7c7c7;
  }

  .msg_item_container_active {
    transition-duration: 0.5s;
    background-color: #f3f3f3;
  }

  @media (max-width: 600px) {
    width: 100vw;
    border: none;
    height: calc(100vh - 87px);
  }
`;

class Messages extends Component {
  state = {
    chatId: "",
    name: "",

    search: "",
    showPannel: false,
  };

  componentDidMount() {
    this.props.fetchUser(this.props.computedMatch.params.username);
    document.title = "Schway | Messages";
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

  someUser = (users, cUser) => {
    let user = users.filter((uto) => uto._id !== cUser);
    return user;
  };

  render() {
    let { user } = this.props;
    console.log(user);

    return (
      <Container>
        <TopNavigation pageTitle=" Messages" />
        <Spacer />

        <MessageSection>
          {user?.conversations?.map((message) => (
            <NavLink
              key={message?._id}
              exact
              to={`/messages/${message?._id}`}
              className="msg_item_container"
              activeClassName="msg_item_container_active"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {this.someUser(message?.participants, user._id).map((user) => (
                  <img
                    key={user?._id}
                    style={{ width: 60, height: 60, borderRadius: "50%" }}
                    src={user?.profile_img}
                    alt=""
                  />
                ))}

                <div style={{ marginLeft: 12 }}>
                  {this.someUser(message?.participants, user._id).map(
                    (user) => (
                      <p
                        key={user?._id}
                        style={{
                          fontWeight: "bold",
                          color: "#131313",
                          fontSize: 17,
                        }}
                      >
                        {user?.username}
                      </p>
                    )
                  )}

                  <p style={{ color: "#5e5e5e" }}>someting else</p>
                </div>

                <p
                  style={{
                    marginLeft: "auto",
                    color: "#5e5e5e",
                    fontSize: 14,
                  }}
                >
                  <TimeAgo date={message?.updatedAt} />
                </p>
              </div>
            </NavLink>
          ))}
        </MessageSection>

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

        <div
          style={{
            marginTop: "auto",
            marginLeft: "auto",
          }}
        >
          {this.state.showPannel ? (
            <div style={{ height: 250, width: 200, overflowY: "scroll" }}>
              {user?.following?.map((follow) => (
                <Link
                  to={`messages/6165dac379db3dc336866f0e`}
                  key={follow?._id}
                >
                  {follow?.username}
                </Link>
              ))}
            </div>
          ) : null}

          <p
            style={{ color: "#fff", backgroundColor: "blue" }}
            onClick={() =>
              this.setState({ showPannel: !this.state.showPannel })
            }
          >
            Start
          </p>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, { fetchUser })(Messages);
