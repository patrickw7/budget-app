import React, { useState, useEffect } from "react";

import "./Calculator.scss";
import { incomesListArray } from "../../mockedData/incomesListArray";
import { expensesListArray } from "../../mockedData/expensesListArray";
import {
  findAmountOfDeletingItem,
  findItemToDelete,
  initialBudgetValue,
  handleSnackBar
} from "../../utils";
import IncomesList from "../IncomesList";
import ExpensesList from "../ExpensesList";
import Form from "../Form/Form";
import SnackBar from "../SnackBar/SnackBar";

const Calculator = () => {
  const [income, setIncome] = useState(incomesListArray);
  const [expense, setExpenses] = useState(expensesListArray);
  const [isOpen, setIsOpen] = useState(false);
  const [sumOfBudget, setSumOfBudget] = useState(initialBudgetValue(income, expense));

  const handleDeleteListItem = (id, typeOfItem) => {
    if (typeOfItem === "income") {
      const newIncomeList = findItemToDelete(id, income);
      const amountOfDeletedIncome = findAmountOfDeletingItem(id, income);
      setIncome(newIncomeList);
      return setSumOfBudget(sumOfBudget - amountOfDeletedIncome);
    }
    const newExpenseList = findItemToDelete(id, expense);
    const amountOfDeletedExpense = findAmountOfDeletingItem(id, expense);
    setExpenses(newExpenseList);
    setSumOfBudget(sumOfBudget - amountOfDeletedExpense);
    return;
  };

  useEffect(() => {
    return () => {
      clearTimeout(handleSnackBar);
    };
  }, [sumOfBudget]);
  return (
    <div>
      <Form
        income={income}
        setIncome={setIncome}
        expense={expense}
        setExpenses={setExpenses}
        setIsOpen={setIsOpen}
        sumOfBudget={sumOfBudget}
        setSumOfBudget={setSumOfBudget}
      />
      <div className="listsContainer">
        <IncomesList income={income} handleDeleteListItem={handleDeleteListItem} />
        <ExpensesList expense={expense} handleDeleteListItem={handleDeleteListItem} />
      </div>
      {isOpen && <SnackBar>The item has been added !</SnackBar>}
    </div>
  );
};
export default Calculator;
