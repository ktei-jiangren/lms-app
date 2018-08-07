import React from "react";
import classnames from "classnames";
import axios from "axios";
import TextField from "../common/TextField";
import Button from "../common/Button";
import Notification from "../common/Notification";
import { getValidationErrors, getHostUrl } from "../common/helper";
import * as yup from "yup";
import { pick } from "lodash/object";
import * as LoginAPI from "./LoginAPI";

const schema = yup.object().shape({
  username: yup
    .string()
    .label("Username")
    .required(),
  password: yup
    .string()
    .label("Password")
    .required()
});

export default class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLoggingIn: false,
      validationErrors: {},
      loginError: ""
    };
  }

  handleFieldChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    // Validate user input
    const userInput = pick(this.state, ["username", "password"]);
    try {
      await schema.validate(userInput);
    } catch (err) {
      const validationErrors = getValidationErrors(err);
      this.setState({ validationErrors });
      return;
    }

    // Try to login
    try {
      this.setState({ validationErrors: {}, isLoggingIn: true });
      const response = await LoginAPI.getAccessToken(
        userInput.username,
        userInput.password
      );
      this.setState({ loginError: "", isLoggingIn: false });

      // Update bearer token
      axios.defaults.headers.common.Authorization = `Bearer ${
        response.access_token
      }`;
      localStorage.setItem("access_token", response.access_token);
      window.location.href = getHostUrl();
    } catch (err) {
      this.setState({
        loginError:
          err.error_description || "Sorry, error occurred when logging in",
        isLoggingIn: false
      });
    }
  };

  render() {
    return (
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-grey has-text-centered">
                Login LMS
              </h3>
              <p className="subtitle has-text-grey has-text-centered">
                Please login to proceed.
              </p>
              <div className={classnames("box")}>
                {this.state.loginError && (
                  <Notification type="danger">
                    {this.state.loginError}
                  </Notification>
                )}
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    name="username"
                    value={this.state.username}
                    placeholder="Enter username"
                    error={this.state.validationErrors["username"]}
                    leftIcon="user"
                    onChange={this.handleFieldChange}
                  />
                  <TextField
                    name="password"
                    value={this.state.password}
                    type="password"
                    leftIcon="lock"
                    placeholder="Enter password"
                    error={this.state.validationErrors["password"]}
                    onChange={this.handleFieldChange}
                  />
                  <Button
                    buttonType="primary"
                    fullWidth
                    size="medium"
                    type="submit"
                    loading={this.state.isLoggingIn}
                  >
                    Login
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
