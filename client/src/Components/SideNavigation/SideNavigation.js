import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  IoIosChatbubbles,
  IoIosNotificationsOutline,
  IoIosLogOut,
} from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { GiPerson } from "react-icons/gi";

import "./style.css";
import { logoutUser } from "../../redux/actions/authAction";

class SideNavigation extends Component {
  state = {};

  componentDidMount() {
    // console.log(this.props);
  }

  closeSideMenu = () => {
    document.getElementById("side_menu").style = "width: 0;";
  };

  render() {
    let { user } = this.props.auth;

    return (
      <nav id="side_menu" className="SideNavigation">
        <section
          style={{
            marginBottom: 20,
            background: `url(${require("../../assets/img/profile3.jpg")}) center`,
            backgroundSize: "cover",
            width: "inherit",
            color: "white",
            height: 190,
            display: "flex",
            flexDirection: "column",
            // padding: 7,
          }}
        >
          <FaTimesCircle
            style={{ margin: "8px 0 20px auto" }}
            onClick={this.closeSideMenu}
            size={40}
          />
          <img
            src={require("../../assets/img/profile2.jpg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              marginTop: "auto",
              marginLeft: 8,
              marginBottom: 6,
            }}
            alt=""
          />
          <NavLink
            style={{
              color: "white",
              textDecoration: "none",
              backgroundColor: "#00000071",
              padding: 8,
              width: "fit-contents",
            }}
            exact
            to={`${this.props.url}profile/${user.username}`}
          >
            <h1>
              {user.firstname} {user.lastname}
            </h1>
            @{user.username}
          </NavLink>
        </section>

        <NavLink
          exact
          activeClassName="side_btn_active"
          className="side_btn"
          to={`${this.props.url}`}
        >
          <FiHome className="icon_style" size={18} />
          Feeds
        </NavLink>
        <NavLink
          // exact
          activeClassName="side_btn_active"
          className="side_btn"
          to={`${this.props.url}messages`}
        >
          <IoIosChatbubbles className="icon_style" size={18} />
          Messages
        </NavLink>
        <NavLink
          exact
          activeClassName="side_btn_active"
          className="side_btn"
          to={`${this.props.url}contacts`}
        >
          <GiPerson className="icon_style" size={18} />
          Contacts
        </NavLink>
        <NavLink
          exact
          activeClassName="side_btn_active"
          className="side_btn"
          to={`${this.props.url}notifications`}
        >
          <IoIosNotificationsOutline className="icon_style" size={18} />
          Notifications
        </NavLink>
        {/* <NavLink
          exact
          activeClassName="side_btn_active"
          className="side_btn"
          to={`${this.props.url}settings`}
        >
          <FiSettings className="icon_style" size={18} />
          Settings
        </NavLink> */}

        <NavLink
          onClick={() => this.props.logoutUser()}
          exact
          style={{
            color: "red",
            textDecoration: "none",
            padding: 8,
            fontWeight: "bold",
            marginTop: "auto",
            marginBottom: 20,
          }}
          to="/"
        >
          <IoIosLogOut
            className="icon_style"
            style={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
            }}
            size={18}
          />
        </NavLink>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(SideNavigation);
