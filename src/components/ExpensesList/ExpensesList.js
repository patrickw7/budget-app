import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./ExpensesList.scss";
import ExpensesItem from "../ExpensesItem";
import { CalculatorContext } from "../../utils/context/CalculatorProvider";

const ExpensesList = ({ handleDeleteListItem }) => {
  const { expense } = useContext(CalculatorContext);
  return (
    <div className="expensesList">
      <h2>Expenses</h2>
      <div className="expensesContainer">
        {expense.map((item) => (
          <ExpensesItem key={item.id} expense={item} handleDeleteListItem={handleDeleteListItem} />
        ))}
      </div>
    </div>
  );
};
export default ExpensesList;

ExpensesList.propTypes = {
  expense: PropTypes.array,
  handleDeleteListItem: PropTypes.func
};
