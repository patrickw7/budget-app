import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ children, type }) => {
  return (
    <button type={type} className='confirmBtn'>
      {children}
    </button>
  );
};

Button.propTypes = {
children: PropTypes.string
};

export default Button;
