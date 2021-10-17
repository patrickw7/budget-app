import React, { useState, useRef } from "react";
import useInput from "./hooks/UseInput";
import { v4 as uuidv4 } from "uuid";

import FirstList from "./FirstList";
import SecondList from "./SecondList";
import Budget from "./Budget/Budget";

const Calculator = () => {
  const category = ["", "bills", "clubs", "cars", "website"];
  const [name, handleSetName, resetName] = useInput("");
  const [cost, handleSetCost, resetCost] = useInput("");
  const [option, handleSetOption, resetOption] = useInput("");
  const [radio1, setRadio1] = useState(false);
  const [radio2, setRadio2] = useState(false);
  const [sum, setSum] = useState(0);
  const [income, setIncome] = useState([]);
  const [expense, setExpenses] = useState([]);
  const budgetRef = useRef();

  const handleRadio1 = () => {
    setRadio1("incomes");
    setRadio2(false);
  };

  const handleRadio2 = () => {
    setRadio2("expenses");
    setRadio1(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (radio1 === "incomes") {
      const incomeItem = {
        id: uuidv4(),
        type: radio1,
        name: name,
        amount: parseInt(cost, 10),
        category: option
      };
      setSum(sum + incomeItem.amount);
      setIncome([...income, incomeItem]);
      resetName("");
      resetCost("");
      resetOption("");
      setRadio1(false);
      setRadio2(false);
      handleBudget();
    } else {
      const expenseItem = {
        id: uuidv4(),
        type: radio2,
        name: name,
        amount: parseInt(-cost, 10),
        category: option
      };
      setSum(sum + expenseItem.amount);
      setExpenses([...expense, expenseItem]);
      resetName("");
      resetCost("");
      resetOption("");
      setRadio1(false);
      setRadio2(false);
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
    if (sum >= 0) {
      budgetRef.current.style.color = "#2ecc71";
    } else {
      budgetRef.current.style.color = "#e74c3c";
    }
  };

  return (
    <div className="calc">
      <h1>Kalkulator Wydatków</h1>
      <FirstList income={income} handleDeleteIncome={handleDeleteIncome} />
      <div className="form">
        <div>
          <label>Przychód</label>
          <input
            type="radio"
            value={radio1}
            checked={radio1}
            onChange={handleRadio1}
          />

          <label> Wydatek</label>
          <input
            type="radio"
            value={radio2}
            checked={radio2}
            onChange={handleRadio2}
          />
        </div>
        <input
          value={name}
          onChange={handleSetName}
          type="text"
          placeholder="Nazwa"
        />
        <input
          value={cost}
          onChange={handleSetCost}
          type="number"
          placeholder="Kwota"
        />
        <select name="category" value={option} onChange={handleSetOption}>
          {category.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleClick}>Dodaj</button>
      </div>
      <SecondList expense={expense} handleDeleteExpense={handleDeleteExpense} />
      <Budget ref={budgetRef} sum={sum} />
    </div>
  );
};

export default Calculator;