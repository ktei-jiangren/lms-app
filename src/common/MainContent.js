import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./MainContent.scss";
import SideNav from "./SideNav";

function MainContent({ children, className, ...other }) {
  return (
    <React.Fragment>
      <SideNav />
      <div
        className={classnames("contaienr lms-main-content", className)}
        {...other}
      >
        {children}
      </div>
    </React.Fragment>
  );
}

MainContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default MainContent;
