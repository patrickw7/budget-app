import React from 'react';
import PropTypes from 'prop-types';

import './IncomesItem.scss';

const IncomesItem = ({ income, handleDeleteIncomeItem }) => {
  const { id, name, amount, category } = income;
  const handleDeleteItem = () => handleDeleteIncomeItem(id);

  return (
    <React.Fragment>
      <div className='incomesItem' key={id}>
        <h3>{name}</h3>
        <span>{amount}$</span>
        <span>Category: {category}</span>
        <button onClick={handleDeleteItem}>Delete</button>
      </div>
    </React.Fragment>
  );
};

IncomesItem.propTypes = {
  income: PropTypes.object,
  handleDeleteIncome: PropTypes.func,
};

export default IncomesItem;
