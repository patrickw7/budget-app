import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './Calculator.scss';
import { incomesListArray } from '../../mockedData/incomesListArray';
import { expensesListArray } from '../../mockedData/expensesListArray';
import {
  addNewItem,
  category,
  findAmountOfDeletingItem,
  findItemToDelete,
  handleBudgetValueColor,
  initialBudgetValue,
  handleSnackBar,
} from '../../utils';
import IncomesList from '../IncomesList';
import ExpensesList from '../ExpensesList';
import Budget from '../Budget';
import Button from '../Button';
import SnackBar from '../SnackBar/SnackBar';

const Calculator = () => {
  const [income, setIncome] = useState(incomesListArray);
  const [expense, setExpenses] = useState(expensesListArray);
  const [isOpen, setIsOpen] = useState(false);
  const [sumOfBudget, setSumOfBudget] = useState(
    initialBudgetValue(income, expense)
  );
  const budgetRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddNewItem = (data) => {
    const itemType = data.budgetItemType;
    const amount = parseInt(data.amount, 10);
    if (itemType === 'income') {
      const newIncome = addNewItem(data);
      setIncome([...income, newIncome]);
      setSumOfBudget(sumOfBudget + amount);
      handleSnackBar(setIsOpen);
      return reset();
    }
    const newExpense = addNewItem(data);
    setExpenses([...expense, newExpense]);
    setSumOfBudget(sumOfBudget + -amount);
    handleSnackBar(setIsOpen);
    return reset();
  };

  const handleDeleteListItem = (id, typeOfItem) => {
    if (typeOfItem === 'income') {
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
    handleBudgetValueColor(sumOfBudget, budgetRef);
    return () => {
      clearTimeout(handleSnackBar);
    };
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
          handleDeleteListItem={handleDeleteListItem}
        />
        <ExpensesList
          expense={expense}
          handleDeleteListItem={handleDeleteListItem}
        />
      </div>
      {isOpen === true ? (
        <SnackBar isOpen={isOpen}>The item has been added !</SnackBar>
      ) : null}
    </div>
  );
};
export default Calculator;