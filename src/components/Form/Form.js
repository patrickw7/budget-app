import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import { useForm } from "react-hook-form";
import "./Form.scss";

import { category, addNewItem, handleSnackBar } from "../../utils";
import { validationSchema } from "../../utils/validationSchema";
import YupValidationResolver from "../../utils/YupValidationResolver";
import Button from "../Button";
import Budget from "../Budget";

const Form = ({
  income,
  setIncome,
  expense,
  setExpenses,
  setIsOpen,
  sumOfBudget,
  setSumOfBudget
}) => {
  const resolver = YupValidationResolver(validationSchema);
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors }
  } = useForm({ resolver });

  const handleAddNewItem = (data) => {
    const itemType = data.budgetItemType;
    const amount = parseInt(data.amount, 10);
    if (itemType === "income") {
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

  const errorMessages = Object.keys(errors).length ? (
    <ul className="validationList">
      {Object.values(errors).map(({ message }) => (
        <li className="validationError" key={uuid()}>
          {message.message}
        </li>
      ))}
    </ul>
  ) : null;
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(handleAddNewItem)}>
        <label className="radioLabel">
          <input type="radio" value="income" {...register("budgetItemType")} />
          Income
        </label>
        <label className="radioLabel">
          <input type="radio" value="expense" {...register("budgetItemType")} />
          Expense
        </label>
        <input className="budgetInput" type="text" placeholder="Name" {...register("name")} />

        <input className="budgetInput" type="number" placeholder="Amount" {...register("amount")} />
        <select className="categoryList" name="category" {...register("category")}>
          {category.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <Button type="submit">Add item</Button>
      </form>
      <div>{errorMessages}</div>
      <Budget sumOfBudget={sumOfBudget} />
    </React.Fragment>
  );
};
export default Form;

Form.propTypes = {
  income: PropTypes.array,
  setIncome: PropTypes.func,
  expense: PropTypes.array,
  setExpenses: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  sumOfBudget: PropTypes.number,
  setSumOfBudget: PropTypes.func
};
