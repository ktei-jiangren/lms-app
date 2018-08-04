import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <nav className="navbar has-shadow is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="../">
                <img
                  src="http://bulma.io/images/bulma-logo.png"
                  alt="Bulma: a modern CSS framework based on Flexbox"
                />
              </a>

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
        <Routes />
      </React.Fragment>
    </Router>
  );
}
