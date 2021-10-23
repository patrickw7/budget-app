import React from "react";

import './ExpensesList.scss'
import ExpensesItem from "../ExpensesItem";

const ExpensesList = ({ expense, handleDeleteExpense }) => {
  return (
    <div className="expensesList">
      <h2>Expenses</h2>
      {expense.map((item, i) => {
        return (
          <ExpensesItem
            key={i}
            expense={item}
            handleDeleteExpense={handleDeleteExpense}
          />
        );
      })}
    </div>
  );
};

export default ExpensesList;