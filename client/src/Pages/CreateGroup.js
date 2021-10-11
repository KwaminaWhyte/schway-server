import React, { Component } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { connect } from "react-redux";

import { Container } from "../Components/BaseComponents";
import TopNavigation from "../Components/TopNavigation";
import { newGroup } from "../redux/actions/group";

class CreateGroup extends Component {
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
            placeholder="Group Name"
          />

          <input
            type="text"
            name="handle"
            id=""
            value={handle}
            onChange={this.handleText}
            placeholder="Group Handle"
          />

          <p onClick={() => this.props.newGroup({ name, handle })}>
            Create Group
          </p>
        </form>
      </Container>
    );
  }
}

export default connect(null, { newGroup })(CreateGroup);
