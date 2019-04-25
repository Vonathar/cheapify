import React, { Component } from "react";
import logo from "../img/logo.png";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img src={logo} width="75" height="75" alt="logo" />
            Cheapify
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;
