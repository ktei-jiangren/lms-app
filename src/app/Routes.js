import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import CourseList from "../course/CourseList";
import CourseDetails from "../course/CourseDetails";
import StudentList from "../student/StudentList";
import StudentDetails from "../student/StudentDetails";
import Login from "../login/Login";
import NotFound from "../error/NotFound";

export default () => (
  <Switch>
    <Redirect exact path="/" to="/dashboard" />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/courses" component={CourseList} />
    <Route exact path="/courses/:id(\d+|create)" component={CourseDetails} />
    <Route exact path="/students" component={StudentList} />
    <Route exact path="/students/:id(\d+|create)" component={StudentDetails} />
    <Route exact path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Switch>
);
