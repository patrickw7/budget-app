import React, { useEffect, useContext } from "react";

import "./Calculator.scss";
import {
  findAmountOfDeletingItem,
  findItemToDelete,
  handleSnackBar,
  addNewItem
} from "../../utils";
import { CalculatorContext } from "../../utils/context/CalculatorProvider";
import IncomesList from "../IncomesList";
import ExpensesList from "../ExpensesList";
import Form from "../Form/Form";
import SnackBar from "../SnackBar/SnackBar";

const Calculator = () => {
  const {
    income,
    setIncome,
    expense,
    setExpenses,
    sumOfBudget,
    setSumOfBudget,
    isOpen,
    setIsOpen
  } = useContext(CalculatorContext);

  const handleAddNewItem = React.useCallback((data) => {
    const itemType = data.budgetItemType;
    const amount = parseInt(data.amount, 10);
    if (itemType === "income") {
      const newIncome = addNewItem(data);
      setIncome([...income, newIncome]);
      setSumOfBudget(sumOfBudget + amount);
      handleSnackBar(setIsOpen);
      return;
    }
    const newExpense = addNewItem(data);
    setExpenses([...expense, newExpense]);
    setSumOfBudget(sumOfBudget + -amount);
    handleSnackBar(setIsOpen);
    return;
  });

  const handleDeleteListItem = React.useCallback((id, typeOfItem) => {
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
  });

  useEffect(() => {
    return () => {
      clearTimeout(handleSnackBar);
    };
  }, [sumOfBudget]);
  return (
    <>
      <Form handleAddNewItem={handleAddNewItem} />
      <div className="listsContainer">
        <IncomesList handleDeleteListItem={handleDeleteListItem} />
        <ExpensesList handleDeleteListItem={handleDeleteListItem} />
      </div>
      {isOpen && <SnackBar>The item has been added !</SnackBar>}
    </>
  );
};
export default Calculator;
