import React from 'react';
import PropTypes from 'prop-types';

import './ExpenseItem.scss';

const ExpensesItem = ({ expense, handleDeleteExpense }) => {
  const { id, name, amount, category } = expense;

  return (
    <React.Fragment>
      <div className='expenseItem' key={id}>
        <h3>{name}</h3>
        <span>{amount}$</span>
        <span>Category: {category}</span>
        <button onClick={() => handleDeleteExpense(id)}>Delete</button>
      </div>
    </React.Fragment>
  );
};

ExpensesItem.propTypes = {
  expense: PropTypes.object,
  handleDeleteExpense: PropTypes.func
};

export default ExpensesItem;
