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

import "./style.css";
import { logoutUser } from "../../redux/actions/authAction";

class SideNavigation extends Component {
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
          }}
        >
          <FaTimesCircle
            className="close_side_btn"
            style={{ margin: "8px 0 20px auto" }}
            onClick={this.closeSideMenu}
            size={30}
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
            exact={true}
            to={`/profile/${user.username}`}
          >
            <h6>
              {user.firstname} {user.lastname}
            </h6>
            @{user.username}
          </NavLink>
        </section>

        <NavLink
          exact
          activeClassName="side_btn_active"
          className="side_btn"
          to="/"
        >
          <FiHome className="icon_style" size={30} />
          Home
        </NavLink>

        <NavLink
          activeClassName="side_btn_active"
          className="side_btn"
          to="/messages"
        >
          <IoIosChatbubbles className="icon_style" size={30} />
          Messages
        </NavLink>

        <NavLink
          exact
          activeClassName="side_btn_active"
          className="side_btn"
          to="/notifications"
        >
          <IoIosNotificationsOutline className="icon_style" size={30} />
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

        <IoIosLogOut
          onClick={() => this.props.logoutUser()}
          className="icon_style"
          style={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            marginTop: "auto",
            marginBottom: 20,
          }}
          size={30}
        />
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
