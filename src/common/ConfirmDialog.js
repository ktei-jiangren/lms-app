import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "./Button";

function ConfirmDialog({
  active,
  title,
  children,
  onPositive,
  onNegative,
  positiveButtonProps = {},
  negativeButtonProps = {}
}) {
  return (
    <div className={classnames("modal", { "is-active": active })}>
      <div className="modal-background" onClick={onNegative} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onNegative} />
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          <Button
            buttonType="success"
            style={{ width: 150 }}
            onClick={onPositive}
            {...positiveButtonProps}
          >
            Yes
          </Button>
          <Button
            style={{ width: 150 }}
            onClick={onNegative}
            {...negativeButtonProps}
          >
            Cancel
          </Button>
        </footer>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onPositive: PropTypes.func,
  onNegative: PropTypes.func,
  positiveButtonProps: PropTypes.object,
  negativeButtonProps: PropTypes.object
};

export default ConfirmDialog;
