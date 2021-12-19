import React from 'react';
import PropTypes from 'prop-types';

import './ExpensesList.scss';
import ExpensesItem from '../ExpensesItem';

const ExpensesList = ({ expense, handleDeleteListItem }) => {
  return (
    <div className='expensesList'>
      <h2>Expenses</h2>
      <div className='expensesContainer'>
        {expense.map((item) =>
          <ExpensesItem
            key={item.id}
            expense={item}
            handleDeleteListItem={handleDeleteListItem}
          />
        )}
      </div>
    </div>
  );
};

ExpensesList.propTypes = {
  expense: PropTypes.array,
  handleDeleteListItem: PropTypes.func,
};
export default ExpensesList;
