import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./IncomesList.scss";
import IncomesItem from "../IncomesItem";
import { CalculatorContext } from "../../utils/context/CalculatorProvider";

const IncomesList = ({ handleDeleteListItem }) => {
  const { income } = useContext(CalculatorContext);
  return (
    <div className="incomesList">
      <h2>Incomes</h2>
      <div className="incomesContainer">
        {income.map((item) => (
          <IncomesItem key={item.id} income={item} handleDeleteListItem={handleDeleteListItem} />
        ))}
      </div>
    </div>
  );
};
export default IncomesList;

IncomesList.propTypes = {
  income: PropTypes.array,
  handleDeleteListItem: PropTypes.func
};
