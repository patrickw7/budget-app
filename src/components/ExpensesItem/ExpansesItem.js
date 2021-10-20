import React from "react";

const ExpensesItem = ({ expense, handleDeleteExpense }) => {
  const { id, name, amount, category } = expense;

  return (
    <React.Fragment>
      <div className="card" key={id}>
        <h3>{name}</h3>
        <span>{amount}$</span>
        <span>{category}</span>
        <button onClick={() => handleDeleteExpense(id)}>delete</button>
      </div>
    </React.Fragment>
  );
};

export default ExpensesItem;