import React, { Component } from "react";
import { IoIosSearch } from "react-icons/io";

import "./style.css";

export default class SearchField extends Component {
  render() {
    return (
      <div className="SearchFieldContainer">
        <div className="SearchField">
          <IoIosSearch size={20} color="blue" />
          <input
            style={{
              border: "none",
              flex: 1,
              fontSize: 17,
              backgroundColor: "#e1e1e1",
              padding: "0 8px",
            }}
            placeholder="Search Schway"
            type="text"
            name="search"
            id="search"
            onChange={this.handleSearch}
            onFocus={this.openSearchBox}
            // onKeyUp={}
            // min-height: 100px;
            // max-height: calc(80vh - 53px);
            // box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px
            // overflow-y: auto;
            // position: absolute;
            // overscroll-behavior: contain;
          />
        </div>
      </div>
    );
  }
}
