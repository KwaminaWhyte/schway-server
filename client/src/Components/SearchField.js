import React, { Component } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchFeeds } from "../redux/actions/feedAction";

const SearchFieldContainer = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  top: 0px;
  padding: 5px 0;
  z-index: 1000;
  width: 100%;
  height: 55px;
  background-color: white;

  .SearchField {
    flex: 1;
    margin: 0 12px;
    border-radius: 20px;
    height: 36px;
    padding: 0 6px;
    font-size: 16px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
  }
`;
class SearchField extends Component {
  state = {
    searchBox: false,
    feeds: [],
  };

  openSearchBox = (e) => {
    e.preventDefault();
    this.setState({
      searchBox: !this.state.searchBox,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    let currentList = [];
    let newList = [];

    if (e.target.value !== "") {
      currentList = this.props.feeds;

      newList = currentList.filter((feed) => {
        let lc = feed.body.toLowerCase();
        let filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.feeds;
    }
    this.setState({ feeds: newList });
  };

  render() {
    return (
      <SearchFieldContainer>
        <div className="SearchField">
          <IoIosSearch size={20} color="blue" />
          <input
            style={{
              border: "none",
              flex: 1,
              fontSize: 17,
              backgroundColor: "#f1f1f1",
              padding: "0 8px",
            }}
            placeholder="Search Schway"
            type="text"
            name="search"
            id="search"
            onFocus={this.openSearchBox}
            // onBlur={this.openSearchBox}
            // onChange={}
            onKeyUp={this.handleSearch}
          />
        </div>

        {this.state.searchBox ? (
          <div
            style={{
              maxHeight: "70vh",
              minHeight: 50,
              width: 375,
              backgroundColor: "white",
              borderRadius: 12,
              right: 10,
              top: 48,
              position: "absolute",
              padding: 5,
              boxShadow: "0px 3px 20px rgba(0, 0, 0, 0.2)",
              overflowY: "auto",
              overscrollBehavior: "contain",
            }}
          >
            {this.state.feeds.map((feed) => (
              <Link
                // onClick={this.openSearchBox}
                key={feed._d}
                exact="true"
                to={`/feeds/d/${feed._id}`}
                style={{
                  borderBottom: "1px solid grey",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid #e1e1e1",
                    marginTop: 5,
                    marginBottom: 5,
                    padding: "2px 10px",
                  }}
                >
                  <p>{feed.user.username}</p>
                  <p>{feed.body}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </SearchFieldContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feeds: state.feeds.feeds,
  };
};

export default connect(mapStateToProps, { fetchFeeds })(SearchField);