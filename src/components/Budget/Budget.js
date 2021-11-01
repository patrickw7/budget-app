import React from 'react';
import PropTypes from 'prop-types';

import './Budget.scss';

const Budget = React.forwardRef((props, budgetRef) => {
  return (
    <div>
      <h2 className='budgetText'>
        My budget: <span ref={budgetRef}>{props.sumOfBudget}$</span>
      </h2>
    </div>
  );
});

Budget.propTypes = {
sumOfBudget: PropTypes.number
};

export default Budget;
