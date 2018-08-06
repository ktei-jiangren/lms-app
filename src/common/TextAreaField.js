import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function TextAreaField({ className, label, error, ...other }) {
  return (
    <div className="field">
      {label !== undefined && <label className="label">{label}</label>}
      <div className={"control"}>
        <textarea
          className={classnames(
            "textarea",
            { "is-danger": !!error },
            className
          )}
          {...other}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
}

TextAreaField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  error: PropTypes.string
};

export default TextAreaField;
