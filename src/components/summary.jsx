import React, { Component } from "react";

class Summary extends Component {
  render() {
    return <div id="summary-div">{this.props.renderSummary()}</div>;
  }
}

export default Summary;
