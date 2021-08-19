import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { FaBars } from "react-icons/fa";

import { storage } from "../firebase";
import { newFeed, fetchFeeds } from "../redux/actions/feedAction";
import { FormContainer, TopNavigationContainer } from "./BaseComponents";

class TopNavigation extends Component {
  state = {
    feedModal: false,

    body: "",
    mediaUrl: "",
    mediaType: "",
    uploadProgress: 0,
  };

  uploadImage = (image) => {
    // check every file type and direct all media to their respective folders

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ uploadProgress });
      },
      (error) => {
        console.log("error", error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ mediaUrl: url });
            console.log(url);
          });
      }
    );
  };

  handleFeedModalFile = (e) => {
    e.preventDefault();
    this.setState({
      mediaType: e.target.files[0].type,
    });

    this.uploadImage(e.target.files[0]);
  };

  handleFeedModalText = (e) => {
    e.preventDefault();

    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitNewFeed = (e) => {
    e.preventDefault();
    let { body, mediaUrl, mediaType } = this.state;

    if (body !== "") {
      this.props.newFeed({
        body,
        mediaUrl,
        mediaType,
      });
      this.setState({
        feedModal: false,
        body: "",
        mediaUrl: "",
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
                rows="10"
                placeholder="What's on your mind?"
                style={{ resize: "none", fontSize: 19 }}
              ></textarea>

              <progress
                style={{ color: "blueviolet", width: "100%" }}
                value={this.state.uploadProgress}
                max="100"
              />

              <input
                style={{
                  border: "none",
                  marginBottom: 12,
                }}
                onChange={this.handleFeedModalFile}
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
