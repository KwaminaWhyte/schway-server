import React, { Component } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const SearchFieldContainer = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  top: 0px;
  padding: 5px 0;
  z-index: 100;
  width: 100%;
  height: 55px;
  background-color: white;
  border-bottom: 0.5px solid #ebebeb;

  @media (max-width: 600px) {
    height: 45px;
  }

  .SearchField {
    margin: 0 12px;
    border-radius: 20px;
    height: 36px;
    padding: 0 6px;
    font-size: 16px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    width: 75%;
  }
`;

const ResultContainer = styled.div`
  max-height: 70vh;
  min-height: 50px;
  width: 375px;
  background-color: white;
  border-radius: 12px;
  right: 10px;
  top: 48px;
  position: absolute;
  padding: 5px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  overscroll-behavior: contain;

  @media (max-width: 600px) {
    display: none;
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
          <ResultContainer>
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
                    display: "flex",
                    borderBottom: "1px solid #e1e1e1",
                    marginTop: 5,
                    marginBottom: 5,
                    padding: "2px 10px",
                    flexDirection: "row",
                  }}
                >
                  {feed?.mediaUrl ? (
                    <img
                      src={feed?.mediaUrl}
                      alt=""
                      srcSet=""
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 1,
                      }}
                    />
                  )}

                  <div>
                    <p>{feed.user.username}</p>
                    <p>{feed.body}</p>
                  </div>
                </div>
              </Link>
            ))}
          </ResultContainer>
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

export default connect(mapStateToProps, {})(SearchField);
