import React from "react";
import PropTypes from "prop-types";

import "./ExpenseItem.scss";

const ExpensesItem = ({ expense, handleDeleteListItem }) => {
  const { id, name, amount, type, category } = expense;
  const handleDeleteItem = React.useCallback(() => handleDeleteListItem(id, type));

  return (
    <div className="expenseItem" key={id}>
      <h3>{name}</h3>
      <span>{amount}$</span>
      <span>Category: {category}</span>
      <button onClick={handleDeleteItem}>Delete</button>
    </div>
  );
};
export default ExpensesItem;

ExpensesItem.propTypes = {
  expense: PropTypes.object,
  handleDeleteListItem: PropTypes.func
};
