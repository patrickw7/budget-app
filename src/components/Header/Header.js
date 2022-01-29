import React from "react";
import propTypes from "prop-types";

import "./Header.scss";

const Header = ({ children }) => {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};
export default React.memo(Header);

Header.propTypes = {
  children: propTypes.string
};
