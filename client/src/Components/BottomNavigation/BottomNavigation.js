import React, { Component } from "react";
import {
  IoIosSearch,
  IoIosNotificationsOutline,
  IoIosChatbubbles,
} from "react-icons/io";
import { FiHome } from "react-icons/fi";

import { NavLink } from "react-router-dom";

import "./style.css";

export default class BottomNavigation extends Component {
  render() {
    return (
      <div className="BottomNavigation">
        <NavLink
          exact
          to="/"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <FiHome size={30} />
        </NavLink>

        <NavLink
          exact
          to="/search"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <IoIosSearch size={30} />
        </NavLink>

        <NavLink
          exact
          to="/notifications"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <IoIosNotificationsOutline size={30} />
        </NavLink>

        <NavLink
          exact
          to="/messages"
          className="bottom_nav_icons"
          activeClassName="bottom_nav_icons_active"
        >
          <IoIosChatbubbles size={30} />
        </NavLink>
      </div>
    );
  }
}
