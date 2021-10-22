import React, { Component } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { connect } from "react-redux";

import { Container } from "../Components/BaseComponents";
import TopNavigation from "../Components/TopNavigation";
import { newChannel } from "../redux/actions/channel";

class CreateChannel extends Component {
  state = {
    name: "",
    handle: "",
  };

  handleText = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    let { name, handle } = this.state;
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
                }}
                size={40}
              />
              <p>Create Channel</p>
            </div>
          }
        />

        <form action="">
          <input
            type="text"
            name="name"
            id=""
            value={name}
            onChange={this.handleText}
            placeholder="Channel Name"
          />

          <input
            type="text"
            name="handle"
            id=""
            value={handle}
            onChange={this.handleText}
            placeholder="Channel Handle"
          />

          <p onClick={() => this.props.newChannel({ name, handle })}>
            Create Channel
          </p>
        </form>
      </Container>
    );
  }
}

export default connect(null, { newChannel })(CreateChannel);
