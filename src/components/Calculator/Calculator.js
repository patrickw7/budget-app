import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';

import './Calculator.scss';
import { incomesListArray } from '../../data';
import { expensesListArray } from '../../data';
import IncomesList from '../IncomesList';
import ExpensesList from '../ExpensesList';
import Budget from '../Budget';
import Button from '../Button';

const Calculator = () => {
  const [income, setIncome] = useState(incomesListArray);
  const [expense, setExpenses] = useState(expensesListArray);
  const budgetRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const category = ['', 'Bills', 'Work', 'Food', 'Hobby', 'Holiday', 'Other'];
  const budgetStateColor = {
    plus: '#038003',
    minus: '#e74c3c',
    neutral: '#505050',
  };

  const initialBudgetValue = () => {
    const incomesAmount = income.reduce(
      (incomeValue, { amount }) => incomeValue + amount,
      0
    );
    const expensesAmount = expense.reduce(
      (expenseValue, { amount }) => expenseValue + amount,
      0
    );
    return incomesAmount + expensesAmount;
  };
  const [sumOfBudget, setSumOfBudget] = useState(initialBudgetValue);

  const addIncomeItem = (data) => {
    const { budgetItemType, name, amount, category } = data;
    const itemID = uuidv4();
    const amountValue = parseInt(amount, 10);
    const incomeItem = {
      id: itemID,
      type: budgetItemType,
      name: name,
      amount: amountValue,
      category: category,
    };
    setSumOfBudget(sumOfBudget + incomeItem.amount);
    setIncome([...income, incomeItem]);
  };

  const addExpenseItem = (data) => {
    const { budgetItemType, name, amount, category } = data;
    const itemID = uuidv4();
    const amountValue = parseInt(-amount, 10);
    const expenseItem = {
      id: itemID,
      type: budgetItemType,
      name: name,
      amount: amountValue,
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

  const handleDeleteIncomeItem = (id) => {
    const newIncomeArr = income.filter((item) => item.id !== id);
    const newSum = income.find((item) => item.id === id);
    setIncome(newIncomeArr);
    setSumOfBudget(sumOfBudget - newSum.amount);
  };

  const handleDeleteExpenseItem = (id) => {
    const newExpenseArr = expense.filter((item) => item.id !== id);
    const newSum = expense.find((item) => item.id === id);
    setExpenses(newExpenseArr);
    setSumOfBudget(sumOfBudget - newSum.amount);
  };

  const handleBudgetValueColor = () => {
    if (sumOfBudget > 0) {
      budgetRef.current.style.color = budgetStateColor.plus;
    } else if (sumOfBudget < 0) {
      budgetRef.current.style.color = budgetStateColor.minus;
    } else {
      budgetRef.current.style.color = budgetStateColor.neutral;
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
            <p className='warning'>Please choose type of item!</p>
          )}
        </div>
        <div>
          <input
            className='budgetInput'
            type='text'
            placeholder='Name'
            {...register('name', {
              required: true,
              maxLength: 32,
            })}
          />
          {errors?.name?.type === 'required' && (
            <p className='warning'>Name field is required!</p>
          )}
          {errors?.name?.type === 'maxLength' && (
            <p className='warning'>Name cannot exceed 32 characters!</p>
          )}
        </div>
        <div>
          <input
            className='budgetInput'
            type='number'
            placeholder='Amount'
            {...register('amount', { required: true, min: 1 })}
          />
          {errors.amount && <p className='warning'>Put correct value!</p>}
        </div>
        <div>
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
          {errors.category && <p className='warning'>Choose category!</p>}
        </div>
        <div>
          <Button type='submit'>Add item</Button>
        </div>
      </form>
      <Budget ref={budgetRef} sumOfBudget={sumOfBudget} />
      <div className='listsContainer'>
        <IncomesList
          income={income}
          handleDeleteIncomeItem={handleDeleteIncomeItem}
        />
        <ExpensesList
          expense={expense}
          handleDeleteExpenseItem={handleDeleteExpenseItem}
        />
      </div>
    </div>
  );
};

export default Calculator;
