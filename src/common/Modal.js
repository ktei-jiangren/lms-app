import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function Modal({ show, children }) {
  return (
    <div className={classnames("modal", { "is-acive": show })}>
      <div className="modal-background" />
      <div className="modal-content">{children}</div>
      <button className="modal-close is-large" aria-label="close" />
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
};
