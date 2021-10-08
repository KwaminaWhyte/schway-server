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
import styled from "styled-components";

// import device from "../device";

import "./style.css";
import { logoutUser } from "../../redux/actions/authAction";

const SideNavigationContainer = styled.aside`
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  background-color: #ffffff;
  align-items: center;
  bottom: 0;
  border-right: 0.5px solid #ebebeb;
  /* box-shadow: 0px 2px 4px 3px #55555557; */

  @media (max-width: 800px) {
    width: 0;
    position: fixed;
    transition-duration: 1s;
    z-index: 1200;
    margin-left: -80vw;
  }
`;

const SideNavButton = styled(NavLink)`
  display: flex;
  text-decoration: none;
  margin: 6px 0;
  padding: 5px 20px;
  border-radius: 20px;
  transition-duration: 0.5s;
  color: grey;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  width: 70%;

  svg {
    margin-right: 12px;
    background-color: #e1e1e1;
    padding: 5px;
    border-radius: 8px;
  }

  &.active {
    transition-duration: 0.5s;
    transform: translateX(10px);
    border-radius: 20px 0px 0px 20px;
    color: blueviolet;
  }
`;
class SideNavigation extends Component {
  closeSideMenu = () => {
    document.getElementById("side_menu").style = "width: 0;";
  };

  render() {
    let { user, isLoading } = this.props.auth;

    if (isLoading) {
      return null;
    }

    return (
      <SideNavigationContainer className="SideNavigation">
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
          <img src={user?.profile_img} alt="profile2" className="side_dp" />

          <NavLink
            className="side_pro_link"
            exact={true}
            to={`/profile/${user?.username}/${user?._id}`}
          >
            <h6>
              {user?.firstname} {user?.lastname}
            </h6>
            @{user?.username}
          </NavLink>
        </section>

        <SideNavButton exact to="/">
          <FiHome className="icon_style" size={30} />
          Home
        </SideNavButton>

        <SideNavButton to="/messages">
          <IoIosChatbubbles className="icon_style" size={30} />
          Messages
        </SideNavButton>

        <SideNavButton exact to="/notifications">
          <IoIosNotificationsOutline className="icon_style" size={30} />
          Notifications
        </SideNavButton>

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
      </SideNavigationContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutUser })(SideNavigation);
