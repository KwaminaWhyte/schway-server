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
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <img
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                  marginRight: 10,
                }}
                src={require("../../assets/img/profile3.jpg")}
                alt=""
              />
              <div style={{ fontSize: 15 }}>
                <h6>Mark Zuk</h6>
                <p>@markbhdhdfhj33</p>
              </div>

              <p
                style={{
                  backgroundColor: "blueviolet",
                  borderRadius: 20,
                  fontSize: 11,
                  padding: "5px 6px",
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: "auto",
                }}
              >
                FOLLOW
              </p>
            </div>
          ))}

          <p
            style={{
              backgroundColor: "white",
              padding: "6px 10px",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Show More
          </p>
        </div>

        <div className="sm_info_container">
          <h6 style={{ margin: 10 }}>Events taoday</h6>

          <div
            style={{
              background: `url(${require("../../assets/img/profile.jpg")}) center`,
              borderRadius: 20,
              height: 220,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              color: "white",
            }}
          >
            <div
              style={{
                marginTop: "auto",
                backgroundColor: "#00000071",
                borderRadius: 20,
                padding: 10,
              }}
            >
              <p>
                some events detals asufga yasgfi asfiga ufguai fiagfi iygas
                ayisg
              </p>

              <div
                style={{
                  borderTop: "1px solid #e1e1e1",
                  paddingTop: 10,
                  marginTop: 10,
                  paddingLeft: 12,
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
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
          <h6>some tother</h6>

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
