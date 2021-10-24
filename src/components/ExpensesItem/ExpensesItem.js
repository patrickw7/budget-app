import React from "react";

import './ExpenseItem.scss'

const ExpensesItem = ({ expense, handleDeleteExpense }) => {
  const { id, name, amount, category } = expense;

  return (
    <React.Fragment>
      <div className="expenseItem" key={id}>
        <h3>{name}</h3>
        <span>{amount}$</span>
        <span>Category: {category}</span>
        <button onClick={() => handleDeleteExpense(id)}>delete</button>
      </div>
    </React.Fragment>
  );
};

export default ExpensesItem;