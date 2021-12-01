import React from 'react';

import './SnackBar.scss';

const SnackBar = ({ children }) => {
  return (
    <div className='snackBar'>
      <p>{children}</p>
    </div>
  );
};

export default SnackBar;
