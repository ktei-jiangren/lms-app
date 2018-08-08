import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar has-shadow is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item lms-navbar__logo" to="/">
            LMS
          </Link>

          <div className="navbar-burger burger" data-target="navMenu">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
