import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import { useForm } from "react-hook-form";
import "./Form.scss";

import { category } from "../../utils";
import { validationSchema } from "../../utils/validationSchema";
import YupValidationResolver from "../../utils/YupValidationResolver";
import Button from "../Button";
import Budget from "../Budget";

const Form = ({ handleAddNewItem, sumOfBudget }) => {
  const resolver = YupValidationResolver(validationSchema);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({ resolver });

  const errorMessages = Object.keys(errors).length ? (
    <ul className="validationList">
      {Object.values(errors).map(({ message }) => (
        <li className="validationError" key={uuid()}>
          {message.message}
        </li>
      ))}
    </ul>
  ) : null;

  const handleAddNewItemControl = (data) => {
    handleAddNewItem(data);
    return reset();
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(handleAddNewItemControl)}>
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
  handleAddNewItem: PropTypes.func,
  sumOfBudget: PropTypes.number
};
