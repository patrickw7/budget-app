import React from 'react';
import PropTypes from 'prop-types';

import './ExpensesList.scss';
import ExpensesItem from '../ExpensesItem';

const ExpensesList = ({ expense, handleDeleteExpenseItem }) => {
  return (
    <div className='expensesList'>
      <h2>Expenses</h2>
      <div className='expensesContainer'>
        {expense.map((item, i) => {
          return (
            <ExpensesItem
              key={`exp-${i}`}
              expense={item}
              handleDeleteExpenseItem={handleDeleteExpenseItem}
            />
          );
        })}
      </div>
    </div>
  );
};

ExpensesList.propTypes = {
  expense: PropTypes.array,
  handleDeleteExpense: PropTypes.func,
};

export default ExpensesList;
