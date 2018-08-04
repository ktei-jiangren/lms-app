import React from "react";
import classnames from "classnames";
import TextField from "../common/TextField";

export default class Login extends React.Component {
  render() {
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-grey">Login LMS</h3>
              <p className="subtitle has-text-grey">Please login to proceed.</p>
              <div className={classnames("box")}>
                <form>
                  <TextField placeholder="Enter username" />
                  <TextField type="password" placeholder="Enter password" />
                  <button className="button is-block is-primary is-fullwidth">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
