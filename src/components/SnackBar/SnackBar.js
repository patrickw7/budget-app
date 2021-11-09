import React from 'react';

import './SnackBar.scss';

const SnackBar = ({ children, isOpen }) => {
  return (
    <div className='snackBar' isOpen={isOpen}>
      <p>{children}</p>
    </div>
  );
};

export default SnackBar;
