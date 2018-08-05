import React from "react";
import "./Loader.scss";

export default function Loader() {
  return (
    <div className="lms-loader">
      <i className="fas fa-spinner fa-spin fa-3x lms-loader__spinner" />
    </div>
  );
}
