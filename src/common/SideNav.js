import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.scss";

export default function SideNav() {
  return (
    <aside className="lms-sidenav">
      <div className="menu">
        <p className="menu-label">Quick links</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink to="/lecturers">Lecturers</NavLink>
          </li>
          <li>
            <NavLink to="/students">Students</NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
