import React, { useState, useRef, useEffect } from 'react';
import useInput from '../hooks/UseInput';
import { v4 as uuidv4 } from 'uuid';

import './Calculator.scss';
import Header from '../Header';
import IncomesList from '../IncomesList';
import ExpensesList from '../ExpensesList';
import Budget from '../Budget';
import Button from '../Button';

const Calculator = () => {
  const category = ['', 'Bills', 'Work', 'Home', 'Shopping', 'Savings'];
  const [name, handleSetName, resetName] = useInput('');
  const [cost, handleSetCost, resetCost] = useInput('');
  const [option, handleSetOption, resetOption] = useInput('');
  const [radioIncome, setRadioIncome] = useState(false);
  const [radioExpense, setRadioExpense] = useState(false);
  const [sumOfBudget, setSumOfBudget] = useState(0);
  const [income, setIncome] = useState([]);
  const [expense, setExpenses] = useState([]);
  const budgetRef = useRef();
  const [radioWarning, setRadioWarning] = useState(false);
  const categoryWarningRef = useRef();
  const costWarningRef = useRef();
  const nameWarningRef = useRef();

  const inputValidation = (addItem) => {
    if (name === '') {
      nameWarningRef.current.style.border = '2px solid red';
    } else {
      nameWarningRef.current.style.border = 'none';
    }
    if ((radioIncome && radioExpense) === false) {
      setRadioWarning(true);
    }
    if (cost <= 0) {
      costWarningRef.current.style.border = '2px solid red';
    } else {
      costWarningRef.current.style.border = 'none';
    }
    if (option === '') {
      categoryWarningRef.current.style.border = '2px solid red';
    } else {
      categoryWarningRef.current.style.border = 'none';
    }
    if (
      name !== '' &&
      (radioIncome || radioExpense) !== false &&
      cost > 0 &&
      option !== ''
    ) {
      setRadioWarning(false);
      addItem();
    }
  };

  const handleRadioIncome = () => {
    setRadioIncome('incomes');
    setRadioExpense(false);
  };

  const handleRadioExpense = () => {
    setRadioExpense('expenses');
    setRadioIncome(false);
  };

  const handleBudgetValueColor = () => {
    if (sumOfBudget >= 0) {
      budgetRef.current.style.color = '#038003';
    } else {
      budgetRef.current.style.color = '#e74c3c';
    }
  };

  const handleResetInputs = () => {
    resetName('');
    resetCost('');
    resetOption('');
    setRadioIncome(false);
    setRadioExpense(false);
  };

  const addIncomeItem = () => {
    const incomeItem = {
      id: uuidv4(),
      type: radioIncome,
      name: name,
      amount: parseInt(cost, 10),
      category: option,
    };
    setSumOfBudget(sumOfBudget + incomeItem.amount);
    setIncome([...income, incomeItem]);
    handleResetInputs();
  };

  const addExpenseItem = () => {
    const expenseItem = {
      id: uuidv4(),
      type: radioExpense,
      name: name,
      amount: parseInt(-cost, 10),
      category: option,
    };
    setSumOfBudget(sumOfBudget + expenseItem.amount);
    setExpenses([...expense, expenseItem]);
    handleResetInputs();
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (radioIncome === 'incomes') {
      inputValidation(addIncomeItem);
    } else {
      inputValidation(addExpenseItem);
    }
  };

  const handleDeleteIncome = (id) => {
    const newIncomeArr = income.filter((element) => element.id !== id);
    const newSum = income.find((element) => element.id === id);
    setIncome(newIncomeArr);
    setSumOfBudget(sumOfBudget - newSum.amount);
  };

  const handleDeleteExpense = (id) => {
    const newExpenseArr = expense.filter((element) => element.id !== id);
    const newSum = expense.find((element) => element.id === id);
    setExpenses(newExpenseArr);
    setSumOfBudget(sumOfBudget - newSum.amount);
  };

  useEffect(() => {
    handleBudgetValueColor();
  });

  return (
    <React.Fragment>
      <Header />
      <div>
        <div>
          <label className='radioLabel'>
            <input
              type='radio'
              value={radioIncome}
              checked={radioIncome}
              onChange={handleRadioIncome}
            />
            Income
          </label>
          <label className='radioLabel'>
            <input
              type='radio'
              value={radioExpense}
              checked={radioExpense}
              onChange={handleRadioExpense}
            />
            Expense
          </label>
          {radioWarning === true ? (
            <p className='warning'>This field is required</p>
          ) : null}
        </div>
        <div className='inputsContainer'>
          <input
            className='budgetInput'
            value={name}
            onChange={handleSetName}
            type='text'
            placeholder='Name'
            ref={nameWarningRef}
          />
          <input
            className='budgetInput'
            value={cost}
            onChange={handleSetCost}
            type='number'
            placeholder='Cost'
            ref={costWarningRef}
          />
          <select
            className='categoryList'
            name='category'
            value={option}
            onChange={handleSetOption}
            onBlur={handleSetOption}
            ref={categoryWarningRef}
          >
            {category.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Button handleClick={handleAddItem}>Add item</Button>
        </div>
      </div>
      <Budget ref={budgetRef} sumOfBudget={sumOfBudget} />
      <div className='listsContainer'>
        <IncomesList income={income} handleDeleteIncome={handleDeleteIncome} />
        <ExpensesList
          expense={expense}
          handleDeleteExpense={handleDeleteExpense}
        />
      </div>
    </React.Fragment>
  );
};

export default Calculator;
