import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Login from "../login/Login";
import NotFound from "../error/NotFound";

export default () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Switch>
);
