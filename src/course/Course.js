import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { truncate } from "lodash/string";
import "./Course.scss";

function Course({ course }) {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          {truncate(course.title, { length: 20 })}
        </p>
      </header>
      <div className={classnames("card-content", "lms-course__description")}>
        <div className="content">
          {truncate(course.description, { length: 100 })}
        </div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Open
        </a>
      </footer>
    </div>
  );
}

Course.propTypes = {
  course: PropTypes.object.isRequired
};

export default Course;
