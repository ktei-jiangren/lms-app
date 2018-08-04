import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-4 is-offset-4">
            <h3 className="title has-text-grey is-size-2">Oops! 404 :(</h3>
            <p className="has-text-grey is-size-4">
              We're sorry, the page you want to see is not there.
            </p>
            <p>
              <NavLink to="/">Take me back to dashboard</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
