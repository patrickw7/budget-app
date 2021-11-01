import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import './Calculator.scss';
import IncomesList from '../IncomesList';
import ExpensesList from '../ExpensesList';
import Budget from '../Budget';
import Button from '../Button';

const Calculator = () => {
  const [sumOfBudget, setSumOfBudget] = useState(0);
  const [income, setIncome] = useState([]);
  const [expense, setExpenses] = useState([]);
  const budgetRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const category = ['', 'Bills', 'Work', 'Home', 'Shopping', 'Savings'];
  const budgetStateColor = {
    plus: '#038003',
    minus: '#e74c3c'
  };

  const addIncomeItem = (data) => {
    const { budgetItemType, name, amount, category } = data;
    const itemID = uuidv4();
    const incomeItem = {
      id: itemID,
      type: budgetItemType,
      name: name,
      amount: parseInt(amount, 10),
      category: category,
    };
    setSumOfBudget(sumOfBudget + incomeItem.amount);
    setIncome([...income, incomeItem]);
  };

  const addExpenseItem = (data) => {
    const { budgetItemType, name, amount, category } = data;
    const itemID = uuidv4();
    const expenseItem = {
      id: itemID,
      type: budgetItemType,
      name: name,
      amount: parseInt(-amount, 10),
      category: category,
    };
    setSumOfBudget(sumOfBudget + expenseItem.amount);
    setExpenses([...expense, expenseItem]);
  };

  const handleAddNewItem = (data) => {
    const itemType = data.budgetItemType;
    if (itemType === 'income') {
      addIncomeItem(data);
    } else {
      addExpenseItem(data);
    }
    reset();
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

  const handleBudgetValueColor = () => {
    if (sumOfBudget >= 0) {
      budgetRef.current.style.color = budgetStateColor.plus;
    } else {
      budgetRef.current.style.color = budgetStateColor.minus;
    }
  };

  useEffect(() => {
    handleBudgetValueColor();
  });

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddNewItem)}>
      <div>
        <label className='radioLabel'>
          <input
            type='radio'
            value='income'
            {...register('budgetItemType', { required: true })}
          />
          Income
        </label>
        <label className='radioLabel'>
          <input
            type='radio'
            value='expense'
            {...register('budgetItemType', { required: true })}
          />
          Expense
        </label>
        {errors.budgetItemType && (
          <p className='warning'>Please choose type of item</p>
        )}
        </div>
        <input
          className='budgetInput'
          type='text'
          placeholder='Name'
          {...register('name', {
            required: true,
            maxLength: 32
          })}
        />
        {errors?.name?.type === 'required' && (
          <p className='warning'>This field is required</p>
        )}
        {errors?.name?.type === 'maxLength' && (
          <p className='warning'>Name cannot exceed 32 characters</p>
        )}
        <input
          className='budgetInput'
          type='number'
          placeholder='Amount'
          {...register('amount', { required: true, min: 1 })}
        />
        {errors.amount && (
          <p className='warning'>
            The value of the field needs to be higher than 0
          </p>
        )}
        <select
          className='categoryList'
          name='category'
          {...register('category', { required: true })}
        >
          {category.map((category, i) => (
            <option key={`cat-${i}`} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className='warning'>Choose category from the list!</p>
        )}
        <Button type='submit'>Add item</Button>
      </form>

      <Budget ref={budgetRef} sumOfBudget={sumOfBudget} />
      <div className='listsContainer'>
        <IncomesList income={income} handleDeleteIncome={handleDeleteIncome} />
        <ExpensesList
          expense={expense}
          handleDeleteExpense={handleDeleteExpense}
        />
      </div>
    </div>
  );
};

export default Calculator;
