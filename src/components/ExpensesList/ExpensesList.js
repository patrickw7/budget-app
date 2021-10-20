import React from "react";

import ExpensesItem from "../ExpensesItem";

const ExpensesList = ({ expense, handleDeleteExpense }) => {
  return (
    <div className="secondList">
      <h2>Wydatki</h2>
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