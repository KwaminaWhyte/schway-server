import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import TimeAgo from "react-timeago";

import TopNavigation from "../Components/TopNavigation";
import { Container } from "../Components/BaseComponents";
import { getChannels } from "../redux/actions/channel";

const ChannelCard = styled(Link)`
  margin: 5px;
  display: flex;
  background-color: ${(props) => (props.bg ? props.bg : "#e1e1e1")};
  border-radius: 12px;
  padding: 5px 12px;
  justify-content: space-between;

  .admin {
    /* background-color: yellow; */
    align-items: flex-end;
  }
`;

class Channels extends Component {
  componentDidMount() {
    document.title = "Schway | Channels";
    this.props.getChannels();
  }

  render() {
    let channels = this.props.channels;

    return (
      <Container>
        <TopNavigation pageTitle="Channels" />

        <section>
          {channels?.map((channel) => (
            <ChannelCard
              to={`/channels/${channel._id}`}
              key={channel._id}
              bg={channel?.settings?.theme?.background}
            >
              <div>
                <p>{channel?.name}</p>
                <p>@{channel?.handle}</p>
              </div>
              <img
                src={channel?.profileImage}
                alt=""
                srcSet=""
                style={{ height: 70, width: 70, borderRadius: "100%" }}
              />
              <div className="admin">
                <p>{channel?.admin.username}</p>
                <p>{channel?.verified ? "Verified" : null}</p>
              </div>
            </ChannelCard>
          ))}
        </section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channels: state.channels.channels,
  };
};

export default connect(mapStateToProps, { getChannels })(Channels);
