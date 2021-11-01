import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ handleClick, children }) => {
  return (
    <button onClick={handleClick} className='confirmBtn'>
      {children}
    </button>
  );
};

Button.propTypes = {
handleClick: PropTypes.func,
children: PropTypes.string
};

export default Button;
