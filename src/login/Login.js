import React from "react";
import classnames from "classnames";
import axios from "axios";
import TextField from "../common/TextField";
import Button from "../common/Button";
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

  handleOnSubmit = async e => {
    e.preventDefault();
    try {
      const val = await schema.validate(
        pick(this.state, ["username", "password"]),
        {
          abortEarly: false
        }
      );
      this.setState({ validationErrors: {}, isLoggingIn: true });
      const response = await LoginAPI.getAccessToken(
        val.username,
        val.password
      );
      this.setState({ loginError: "", isLoggingIn: false });
      delete axios.defaults.headers.common.Authorization;
      axios.defaults.headers.common.Authorization = `Bearer ${
        response.access_token
      }`;
      localStorage.setItem("access_token", response.access_token);
      window.location.href = `${HOST_URL}`;
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = err.inner.reduce((x, y) => {
          x[y.path] = y.message;
          return x;
        }, {});
        this.setState({ validationErrors, isLoggingIn: false });
      } else {
        this.setState({
          loginError: err.error_description,
          isLoggingIn: false
        });
      }
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
                  <div className="notification is-danger">
                    {this.state.loginError}
                  </div>
                )}
                <form onSubmit={this.handleOnSubmit}>
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
