import React, { Component } from "react";
import { IoIosEye, IoIosChatboxes } from "react-icons/io";
import styled from "styled-components";

import "./style.css";
import { follow } from "../../assets/data";

const RightComponent = styled.aside`
  width: 350px;
  border-left: 0.5px solid #ebebeb;
  position: sticky;
  top: 0;
`;

export default class RightFeed extends Component {
  render() {
    return (
      <RightComponent style={{}}>
        <div className="sm_info_container">
          <h6 style={{ margin: 10, fontWeight: "bold" }}>Who to follow</h6>
          {/* <img src="https://i.ibb.co/xYsXbgV/profile3.jpg" alt="profile3" border="0">
<img src="https://i.ibb.co/mctW4PR/planet-extinction.jpg" alt="planet-extinction" border="0">
<img src="https://i.ibb.co/PQ3rWhH/profile.jpg" alt="profile" border="0">
<img src="https://i.ibb.co/ZxWh6dj/profile2.jpg" alt="profile2" border="0"> */}
          {follow.map((item) => (
            <div key={item.id} className="follow_sug_item">
              <img className="sug_pr_img" src={item.imgUrl} alt="." />
              <div style={{ fontSize: 15 }}>
                <h6 style={{ margin: 0, padding: 0, fontWeight: "bold" }}>
                  {item.name}
                </h6>
                <p style={{ margin: 0, padding: 0 }}>@{item.name}</p>
              </div>

              <p className="follow_btn">FOLLOW</p>
            </div>
          ))}

          <p className="show_more_btn">Show More</p>
        </div>

        <div className="sm_info_container">
          <h6 style={{ margin: 10 }}>Events taoday</h6>

          <div
            className="event_item"
            style={{
              background: `url('https://i.ibb.co/PQ3rWhH/profile.jpg') center`,
              objectFit: "cover",
            }}
          >
            <div className="event_details_con">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                nostrum iusto voluptates modi sequi corporis earum praesentium
                odit!
              </p>

              <div className="event_icons_con">
                <p>
                  <IoIosEye /> 355
                </p>

                <p>
                  <IoIosChatboxes /> 200
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="sm_info_container">
          <h6>some other event</h6>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            doloremque eveniet eius obcaecati animi illum incidunt ratione quo
            nihil nostrum, eum temporibus, quod distinctio praesentium
            accusantium quia, accusamus nisi laboriosam!
          </p>
        </div> */}
      </RightComponent>
    );
  }
}
