import React, { Component } from "react";
import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import { Button } from "./BaseComponents";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const ModalContainer = styled.section`
  display: ${(props) => (props.display ? "block" : "none")};
  position: fixed; /* Stay in place */
  z-index: 200; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 6% auto; /* 15% from the top and centered */
  border: 1px solid #888;
  width: 45%; /* Could be more or less, depending on screen size */
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.5s;
  border-radius: 12px;

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0px;
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e1;
  padding: 5px 20px;
  background-color: ${(props) => (props.prompt ? "red" : null)};
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;

  p {
    font-weight: bold;
    color: ${(props) => (props.prompt ? "white" : "black")};
  }
`;

const ModalBody = styled.div`
  border-bottom: 1px solid #e1e1e1;
  padding: 10px 20px;

  div {
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
  }

  div input {
    border: none;
    border-bottom: 1px solid blue;
    margin-top: 5px;
    font-size: 17px;
    transition-duration: 0.5s;
  }

  div input:focus-within {
    border-bottom: 2px solid blue;
    transition-duration: 0.5s;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  padding: 5px 20px;
`;

class Modal extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    profile_img: "",

    file: null,
    base64URL: "",
  };
  getUserData = async () => {};

  componentDidMount() {
    let { username, email, firstname, lastname } = this.props.user;
    this.setState({ username, email, firstname, lastname });
  }

  onTextChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  handleFileInputChange = (e) => {
    // console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;
        // console.log("File Is", file);
        this.setState({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0],
    });
  };

  render() {
    let { firstname, lastname, username, email, base64URL } = this.state;

    return (
      <ModalContainer display={this.props.display}>
        <ModalContent>
          <ModalHeader prompt={this.props.prompt}>
            <p>{this.props.title}</p>

            <IoCloseCircle
              color={this.props.prompt ? "white" : "red"}
              size={25}
              onClick={this.props.closeModal}
            />
          </ModalHeader>

          <ModalBody>
            {this.props.prompt ? (
              <p>
                Are you sure you want to {this.props.promptMessage}{" "}
                <b>{this.props.username}</b> ?
              </p>
            ) : (
              <>
                <div>
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    onChange={this.onTextChange}
                    required
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstname}
                    placeholder="Enter firstname"
                  />
                </div>

                <div>
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    onChange={this.onTextChange}
                    required
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastname}
                    placeholder="Enter lastname"
                  />
                </div>

                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    onChange={this.onTextChange}
                    required
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    placeholder="Enter Username"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.onTextChange}
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter Email..."
                  />
                </div>

                <input
                  style={{
                    border: "none",
                    marginBottom: 12,
                  }}
                  onChange={this.handleFileInputChange}
                  type="file"
                />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() =>
                this.props.onUserUpdate({
                  firstname,
                  lastname,
                  username,
                  email,
                  profile_img: base64URL,
                })
              }
              style={{ marginLeft: "auto" }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(mapStateToProps, null)(withRouter(Modal));
