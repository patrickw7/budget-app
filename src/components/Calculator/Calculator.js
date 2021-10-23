import React, { useState, useRef } from "react";
import useInput from "../hooks/UseInput";
import { v4 as uuidv4 } from "uuid";

import './Calculator.scss'
import Header from "../Header";
import IncomesList from "../IncomesList";
import ExpensesList from "../ExpensesList";
import Budget from "../Budget";
import Button from '../Button';

const Calculator = () => {
  const category = ["", "Bills", "Work", "Home", "Shopping", "Savings"];
  const [name, handleSetName, resetName] = useInput("");
  const [cost, handleSetCost, resetCost] = useInput("");
  const [option, handleSetOption, resetOption] = useInput("");
  const [radioIncome, setRadioIncome] = useState(false);
  const [radioExpense, setRadioExpense] = useState(false);
  const [sum, setSum] = useState(0);
  const [income, setIncome] = useState([]);
  const [expense, setExpenses] = useState([]);
  const budgetRef = useRef();

  const handleRadioIncome = () => {
    setRadioIncome("incomes");
    setRadioExpense(false);
  };

  const handleRadioExpense = () => {
    setRadioExpense("expenses");
    setRadioIncome(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (radioIncome === "incomes") {
      const incomeItem = {
        id: uuidv4(),
        type: radioIncome,
        name: name,
        amount: parseInt(cost, 10),
        category: option
      };
      setSum(sum + incomeItem.amount);
      setIncome([...income, incomeItem]);
      resetName("");
      resetCost("");
      resetOption("");
      setRadioIncome(false);
      setRadioExpense(false);
      handleBudget();
    } else {
      const expenseItem = {
        id: uuidv4(),
        type: radioExpense,
        name: name,
        amount: parseInt(-cost, 10),
        category: option
      };
      setSum(sum + expenseItem.amount);
      setExpenses([...expense, expenseItem]);
      resetName("");
      resetCost("");
      resetOption("");
      setRadioIncome(false);
      setRadioExpense(false);
      handleBudget();
    }
  };

  const handleDeleteIncome = (id) => {
    const newIncomeArr = income.filter((element) => element.id !== id);
    const newSum = income.find((element) => element.id === id);
    setIncome(newIncomeArr);
    setSum(sum - newSum.amount);
  };

  const handleDeleteExpense = (id) => {
    const newExpenseArr = expense.filter((element) => element.id !== id);
    const newSum = expense.find((element) => element.id === id);
    setExpenses(newExpenseArr);
    setSum(sum - newSum.amount);
  };

  const handleBudget = () => {
    if (sum > 0) {
      budgetRef.current.style.color = "#2ecc71";
    } else {
      budgetRef.current.style.color = "#e74c3c";
    }
  };

  return (
    <React.Fragment>
     <Header/>
      <div className="calculatorContainer">
        <div>
          <label className="radioLabel">Income</label>
          <input
            type="radio"
            value={radioIncome}
            checked={radioIncome}
            onChange={handleRadioIncome}
          />

          <label className="radioLabel"> Expense</label>
          <input
            type="radio"
            value={radioExpense}
            checked={radioExpense}
            onChange={handleRadioExpense}
          />
        </div>
        <input
        className="budgetInput"
          value={name}
          onChange={handleSetName}
          type="text"
          placeholder="Name"
        />
        <input
        className="budgetInput"
          value={cost}
          onChange={handleSetCost}
          type="number"
          placeholder="Cost"
        />
        <select className="categoryList" name="category" value={option} onChange={handleSetOption}>
          {category.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Button handleClick={handleClick}>Add item</Button>
        
      </div>

      <Budget ref={budgetRef} sum={sum} />

      <div className="listsContainer">
      <IncomesList income={income} handleDeleteIncome={handleDeleteIncome} />
      <ExpensesList expense={expense} handleDeleteExpense={handleDeleteExpense} />
      </div>
    </React.Fragment>
  );
};

export default Calculator;