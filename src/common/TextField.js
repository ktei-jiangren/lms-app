import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextField({ className, label, ...other }) {
  return (
    <div className="field">
      {label !== undefined && <label className="label">{label}</label>}
      <div className="control">
        <input className={classnames("input", className)} {...other} />
      </div>
      {/* <p className="help is-danger">This field is required</p> */}
    </div>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default TextField;
