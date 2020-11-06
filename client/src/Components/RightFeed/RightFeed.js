import React, { Component } from "react";
import { IoIosEye, IoIosChatboxes } from "react-icons/io";

import "./style.css";
import { follow } from "../../assets/data";

export default class RightFeed extends Component {
  render() {
    return (
      <section style={{ position: "sticky", top: 60 }}>
        <div className="sm_info_container">
          <h6 style={{ margin: 10, fontWeight: "bold" }}>Who to follow</h6>

          {follow.map((item) => (
            <div key={item.id} className="follow_sug_item">
              <img
                className="sug_pr_img"
                src={require("../../assets/img/profile3.jpg")}
                alt=""
              />
              <div style={{ fontSize: 15 }}>
                <h6 style={{ margin: 0, padding: 0, fontWeight: "bold" }}>
                  {item.name}
                </h6>
                <p style={{ margin: 0, padding: 0 }}>@markbhdhdfhj33</p>
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
              background: `url(${require("../../assets/img/profile.jpg")}) center`,
            }}
          >
            <div className="event_details_con">
              <p>
                some events detals asufga yasgfi asfiga ufguai fiagfi iygas
                ayisg
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
      </section>
    );
  }
}
