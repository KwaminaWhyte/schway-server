import React, { Component } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
// import TopNavigation from "../../Components/TopNavigation";
import "./style.css";

// import SearchField from "../../Components/SearchField";
import { Container, Spacer } from "../../Components/BaseComponents";
import { trends } from "../../assets/data";
import { fetchFeeds } from "../../redux/actions/feedAction";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    feeds: [],
  };

  componentDidMount() {
    this.props.fetchFeeds();
  }

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
      <Container>
        {/* <TopNavigation pageTitle={<SearchField />} rightContents /> */}

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
          onKeyUp={this.handleSearch}
        />
        <Spacer />

        <section>
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
        </section>

        <img
          className="cover_image"
          src="https://i.ibb.co/WDp45B1/diana-simumpande-GSPFj-HIx2t-E-unsplash.jpg"
          alt="banner"
        />

        <section>
          <div className="ig_img_sty">
            <img
              style={{
                width: "100%",
                border: "1px solid white",
              }}
              src="https://i.ibb.co/PQ3rWhH/profile.jpg"
              alt="profile"
            />

            <img
              style={{
                width: "100%",
                border: "1px solid white",
              }}
              src="https://i.ibb.co/PQ3rWhH/profile.jpg"
              alt="profile"
            />
            <img
              style={{
                width: "100%",
                border: "1px solid white",
              }}
              src="https://i.ibb.co/PQ3rWhH/profile.jpg"
              alt="profile"
            />
          </div>

          <div style={{ marginBottom: 1 }}>
            <h5 className="srh_cat_title">Trends for you</h5>

            {trends.map((trend) => (
              <div key={trend.id} className="tren_4_u">
                <p>{trend.name}</p>
              </div>
            ))}
          </div>

          <div>
            <h5 className="srh_cat_title">What's hapenning</h5>

            {trends.map((trend) => (
              <div
                key={trend.id}
                style={{
                  display: "flex",
                  height: 120,
                  borderBottom: "1px solid #e1e1e1",
                }}
                className="whats_hapenning"
              >
                <div style={{ flex: 1 }}>
                  <p style={{ color: "grey" }}>{trend.name}</p>
                  <h5 style={{ fontWeight: "bold" }}>
                    Doloribus maiores officia earum harum sit
                  </h5>
                </div>

                <img
                  style={{
                    width: 100,
                    height: 100,
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: 8,
                    border: "1px solid white",
                    borderRadius: 12,
                  }}
                  src={trend.imgUrl}
                  alt="profile"
                />
              </div>
            ))}
          </div>

          <div>
            <h5 className="srh_cat_title">Web development</h5>

            {trends.map((trend) => (
              <div
                key={trend.id}
                style={{
                  display: "flex",
                  height: "fit-contents",
                  borderBottom: "1px solid #e1e1e1",
                  // flexDirection: "column",
                  padding: 8,
                }}
                className=""
              >
                <img
                  style={{
                    width: 50,
                    height: 50,
                    marginBottom: "auto",
                    marginRight: 8,
                    borderRadius: 50,
                  }}
                  src="https://i.ibb.co/PQ3rWhH/profile.jpg"
                  alt="profile"
                />

                <div>
                  <h5 style={{ fontWeight: "bold" }}>username</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Doloribus maiores officia earum harum sit
                  </p>

                  <img
                    style={{
                      width: "100%",
                      height: 200,
                      borderRadius: 12,
                    }}
                    src={trend.imgUrl}
                    alt="profile"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feeds: state.feeds.feeds,
  };
};

export default connect(mapStateToProps, { fetchFeeds })(Search);
