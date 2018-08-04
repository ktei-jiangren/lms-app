import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./app.scss";

import App from "./app/App";

// import Login from "./login/Login";

axios.defaults.baseURL = API_URL || process.env.API_URL;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "access_token"
)}`;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.href = `${HOST_URL || process.env.HOST_URL}/login`;
    }
    return error;
  }
);

ReactDOM.render(<App />, document.getElementById("app"));
