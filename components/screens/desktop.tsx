import React, { Component } from "react";
import ContentArea from "../parts/contentportion";
import Dock from "../parts/dock";
import BackgroundImage from "../utils/background";

export default class Desktop extends Component {
  render() {
    return (
      <div  overflow-hidden="true">
        <BackgroundImage />
        <div className="text-white">
          <ContentArea  />
          <Dock />
        </div>
      </div>
    );
  }
}
