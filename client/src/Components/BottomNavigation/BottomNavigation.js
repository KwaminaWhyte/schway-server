import React, { Component } from "react";
import {
  IoMdHome,
  IoIosNotifications,
  IoIosChatbubbles,
  IoIosPerson,
} from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import "./style.css";
import { connect } from "react-redux";

class BottomNavigation extends Component {
  render() {
    let { user } = this.props.auth;

    return (
      <div className="BottomNavigation">
        <NavLink
          exact
          to="/"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <IoMdHome size={30} />
        </NavLink>

        <NavLink
          exact
          to="/search"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <FiSearch size={30} />
        </NavLink>

        <NavLink
          exact
          to="/notifications"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <IoIosNotifications size={30} />
        </NavLink>

        <NavLink
          exact
          to="/messages"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <IoIosChatbubbles size={30} />
        </NavLink>

        <NavLink
          exact
          to={`/profile/${user?.username}/${user?._id}`}
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <IoIosPerson size={30} />
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(BottomNavigation);
