import React, { Component } from "react";

import TopNavigation from "../Components/TopNavigation";
import { Container } from "../Components/BaseComponents";

export default class Notifications extends Component {
  render() {
    return (
      <Container>
        <TopNavigation pageTitle="Notifications" />
        <div className="nav-spacer"></div>

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
      </Container>
    );
  }
}
