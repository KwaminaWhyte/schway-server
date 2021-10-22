import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import TopNavigation from "../Components/TopNavigation";
import { Container } from "../Components/BaseComponents";
import {
  getNotifications,
  readNotification,
} from "../redux/actions/notificationAction";

class Notifications extends Component {
  componentDidMount() {
    document.title = "Schway | Notificatons";
    this.props.getNotifications();
  }

  render() {
    let notifications = this.props.notifications;

    return (
      <Container>
        <TopNavigation pageTitle="Notifications" />
        <div></div>

        {!notifications ? (
          <section
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <p style={{ fontSize: 23, fontWeight: "bold" }}>
              Nothing to see here -- yet
            </p>

            <p style={{ color: "grey", textAlign: "center" }}>
              When someone mentions you, you'll find it here.
            </p>
          </section>
        ) : (
          <section
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              marginTop: 70,
              // alignItems: "center",
            }}
          >
            {notifications.map((notification) => (
              <Link
                to={`${notification?.link}`}
                key={notification._id}
                onClick={() => this.props.readNotification(notification?._id)}
                style={{
                  padding: 12,
                  borderBottom: "1px solid #dddddd",
                  backgroundColor: notification?.read ? null : "#eeeeee",
                  flexDirection: "row",
                  display: "flex",
                }}
              >
                <img
                  src={notification?.sender?.profile_img}
                  style={{ width: 55, height: 55, borderRadius: 30 }}
                  alt=""
                  srcSet=""
                />
                <div>
                  <p>
                    {notification?.sender?.username} {notification?.message}
                  </p>
                  <TimeAgo
                    className="timestamp"
                    date={notification?.timestamp}
                  />
                </div>
              </Link>
            ))}
          </section>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications.notifications,
  };
};

export default connect(mapStateToProps, { getNotifications, readNotification })(
  Notifications
);
