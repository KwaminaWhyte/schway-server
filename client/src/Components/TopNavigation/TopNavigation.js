import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
// import { FaBars } from "react-icons/fa";

import "./style.css";
import { storage } from "../../firebase";
import { newFeed } from "../../redux/actions/feedAction";

class TopNavigation extends Component {
  state = {
    feedModal: false,

    user: "",
    body: "",
    mediaUrl: "",
    mediaType: "",
    uploadProgress: 0,
  };

  componentDidMount() {
    let user = this.props.user._id;
    this.setState({ user });
  }

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
    let { user, body, mediaUrl, mediaType } = this.state;

    if (body !== "") {
      this.props.newFeed({
        user,
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
    } else {
      alert("Type something");
    }
  };

  openSearchBox = (e) => {
    e.preventDefault();

    console.log("showing search box");
  };

  handleSearch = (e) => {
    e.preventDefault();
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.feeds;
      newList = currentList.filter((feed) => {
        const lc = feed.user.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.feeds;
    }
    this.setState({ feeds: newList });
  };

  openSideMenu = () => {
    document.getElementById("side_menu").style = "width: 65vw; margin-left: 0";
  };

  render() {
    return (
      <>
        <nav className="TopNavigation">
          {/* <img
            onClick={this.openSideMenu}
            className="toggle_bars"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginLeft: 8,
            }}
            src={require("../../assets/img/profile.jpg")}
            alt=""
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
        </nav>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.feedModal}
          onHide={() => this.setState({ feedModal: false })}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <form
              className="new_feed_form_container"
              onSubmit={this.submitNewFeed}
            >
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
            </form>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { newFeed })(TopNavigation);
