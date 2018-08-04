import React from "react";
import ReactDOM from "react-dom";
import "./app.scss";

import App from "./app/App";

// import Login from "./login/Login";

const Index = () => {
  return <App />;
};

ReactDOM.render(<Index />, document.getElementById("index"));
