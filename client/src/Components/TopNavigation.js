import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";

import { newFeed, fetchFeeds } from "../redux/actions/feedAction";
import { FormContainer, TopNavigationContainer } from "./BaseComponents";

class TopNavigation extends Component {
  state = {
    feedModal: false,

    body: "",
    mediaType: "",

    file: null,
    base64URL: "",
  };

  getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  handleFileInputChange = (e) => {
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;
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
      mediaType: e.target.files[0].type,
    });
  };

  handleFeedModalText = (e) => {
    e.preventDefault();

    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitNewFeed = (e) => {
    e.preventDefault();
    let { body, base64URL, mediaType } = this.state;

    if (body !== "") {
      this.props.newFeed({
        body,
        media: base64URL,
        mediaType,
      });

      this.setState({
        feedModal: false,
        body: "",
        mediaType: "",
      });

      this.props.fetchFeeds();
    } else {
      alert("Type something");
    }
  };

  openSideMenu = () => {
    document.getElementById("side_menu").style = "width: 65vw; margin-left: 0";
  };

  render() {
    return (
      <>
        <TopNavigationContainer>
          {/* <img
            onClick={this.openSideMenu}
            className="toggle_bars"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginLeft: 8,
            }}
                    src="https://i.ibb.co/PQ3rWhH/profile.jpg" alt="profile"

          /> */}

          <div style={{ width: 15, height: 15 }}></div>

          <div style={{ fontSize: 23, fontWeight: "bold", marginLeft: 8 }}>
            {this.props.pageTitle}
          </div>

          <div style={{ marginLeft: "auto", display: "flex" }}>
            {this.props.rightContents}

            <IoIosAddCircleOutline
              onClick={() => this.setState({ feedModal: true })}
              className="nav_icon_sty"
              size={20}
              color="blueviolet"
            />
          </div>
        </TopNavigationContainer>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.feedModal}
          onHide={() => this.setState({ feedModal: false })}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <FormContainer onSubmit={this.submitNewFeed}>
              <textarea
                onChange={this.handleFeedModalText}
                name="body"
                value={this.state.body}
                cols="30"
                rows="4"
                placeholder="What's on your mind?"
                style={{ resize: "none", fontSize: 19 }}
              ></textarea>

              <img
                style={{ width: "100%", marginTop: 20 }}
                src={this.state.base64URL}
                alt=""
              />

              <input
                style={{
                  border: "none",
                  marginBottom: 12,
                }}
                onChange={this.handleFileInputChange}
                type="file"
              />
            </FormContainer>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.submitNewFeed}>
              Post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     // user: state.auth.user,
//   };
// };

export default connect(null, { newFeed, fetchFeeds })(TopNavigation);
