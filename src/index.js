import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { getApiUrl, getHostUrl } from "./common/helper";
import "./app.scss";
import "react-toastify/dist/ReactToastify.css";

import App from "./app/App";

// import Login from "./login/Login";

axios.defaults.baseURL = getApiUrl();
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.href = `${getHostUrl()}#/login`;
    }
    return error;
  }
);

ReactDOM.render(<App />, document.getElementById("app"));
