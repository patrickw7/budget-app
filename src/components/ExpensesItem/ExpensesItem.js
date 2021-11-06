import React from 'react';
import PropTypes from 'prop-types';

import './ExpenseItem.scss';

const ExpensesItem = ({ expense, handleDeleteListItem }) => {
  const { id, name, amount, type, category } = expense;
  const handleDeleteItem = () => handleDeleteListItem(id,type);

  return (
    <React.Fragment>
      <div className='expenseItem' key={id}>
        <h3>{name}</h3>
        <span>{amount}$</span>
        <span>Category: {category}</span>
        <button onClick={handleDeleteItem}>Delete</button>
      </div>
    </React.Fragment>
  );
};

ExpensesItem.propTypes = {
  expense: PropTypes.object,
  handleDeleteListItem: PropTypes.func,
};

export default ExpensesItem;
