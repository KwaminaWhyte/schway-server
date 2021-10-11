import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import TopNavigation from "../Components/TopNavigation";
import { Container } from "../Components/BaseComponents";
import { getGroups } from "../redux/actions/group";

const GroupCard = styled(Link)`
  margin: 5px;
  display: flex;
  background-color: ${(props) => (props.bg ? props.bg : "#e1e1e1")};
  border-radius: 12px;
  padding: 5px 12px;
  justify-content: space-between;

  .admin {
    align-items: flex-end;
  }
`;

class Groups extends Component {
  componentDidMount() {
    document.title = "Schway | Groups";
    this.props.getGroups();
  }

  render() {
    let groups = this.props.groups;

    return (
      <Container>
        <TopNavigation pageTitle="Groups" />

        <section>
          {groups?.map((group) => (
            <GroupCard
              to={`/groups/${group._id}`}
              key={group._id}
              bg={group?.settings?.theme?.background}
            >
              <div>
                <p>{group?.name}</p>
                <p>@{group?.handle}</p>
              </div>
              <img
                src={group?.profileImage}
                alt=""
                srcSet=""
                style={{ height: 70, width: 70, borderRadius: "100%" }}
              />
              <div className="admin">
                <p>{group?.admin.username}</p>
                <p>{group?.verified ? "Verified" : null}</p>
              </div>
            </GroupCard>
          ))}
        </section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups.groups,
  };
};

export default connect(mapStateToProps, { getGroups })(Groups);
