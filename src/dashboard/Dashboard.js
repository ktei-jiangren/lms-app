import React from "react";
import { Link } from "react-router-dom";
import MainContent from "../common/MainContent";
import "./Dashboard.scss";

export default function Dashboard() {
  return (
    <MainContent>
      <h1 className="title is-size-1 lms-dashboard__title has-text-grey">
        Welcome to LMS
      </h1>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child notification is-primary">
            <p className="title">Courses</p>
            <p className="subtitle">
              All kinds of courses needed for IT industry
            </p>
            <a className="button is-primary is-inverted is-outlined lms-dashboard__tile-button">
              Add new course
            </a>
            <Link
              to="/courses"
              className="button is-primary is-inverted is-outlined lms-dashboard__tile-button"
            >
              All courses
            </Link>
          </article>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification is-info">
            <p className="title">Lecturers</p>
            <p className="subtitle">Best lecturers in IT world</p>
            <a className="button is-info is-inverted is-outlined lms-dashboard__tile-button">
              Add new lecturer
            </a>
            <a className="button is-info is-inverted is-outlined lms-dashboard__tile-button">
              All lecturers
            </a>
          </article>
        </div>
      </div>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-6">
          <article className="tile is-child notification is-warning">
            <p className="title">Students</p>
            <p className="subtitle">Hard-working and smart students</p>
            <a className="button is-warning is-inverted is-outlined lms-dashboard__tile-button">
              Add new student
            </a>
            <a className="button is-warning is-inverted is-outlined lms-dashboard__tile-button">
              All students
            </a>
          </article>
        </div>
      </div>
    </MainContent>
  );
}
