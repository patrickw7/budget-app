import React from 'react';
import PropTypes from 'prop-types';

import './ExpenseItem.scss';

const ExpensesItem = ({ expense, handleDeleteExpenseItem }) => {
  const { id, name, amount, category } = expense;
  const handleDeleteItem = () => handleDeleteExpenseItem(id);

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
  handleDeleteExpense: PropTypes.func,
};

export default ExpensesItem;
