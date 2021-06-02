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
          className="side_cover_img"
          style={{
            background: `url('https://i.ibb.co/xYsXbgV/profile3.jpg') center`,
          }}
        >
          <FaTimesCircle
            className="close_side_btn"
            onClick={this.closeSideMenu}
            size={30}
          />
          <img
            src="https://i.ibb.co/ZxWh6dj/profile2.jpg"
            alt="profile2"
            className="side_dp"
          />

          <NavLink
            className="side_pro_link"
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
          className="icon_style sign_out_btn"
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
