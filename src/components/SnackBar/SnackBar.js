import React from "react";
import PropTypes from "prop-types";

import "./SnackBar.scss";

const SnackBar = ({ children }) => {
  return (
    <div className="snackBar">
      <p>{children}</p>
    </div>
  );
};
export default SnackBar;

SnackBar.propTypes = {
  children: PropTypes.string
};
