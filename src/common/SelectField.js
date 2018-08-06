import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function SelectField({ className, label, error, children, ...other }) {
  return (
    <div className="field">
      {label !== undefined && <label className="label">{label}</label>}
      <div className="control">
        <div className="select">
          <select
            className={classnames({ "is-danger": !!error }, className)}
            {...other}
          >
            {children}
          </select>
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
}

SelectField.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
  label: PropTypes.node,
  error: PropTypes.string
};

export default SelectField;
