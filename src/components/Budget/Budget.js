import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./Budget.scss";
import { CalculatorContext } from "../../utils/context/CalculatorProvider";

const Budget = () => {
  const { sumOfBudget } = useContext(CalculatorContext);
  return (
    <div>
      <h2 className="budgetText">
        My budget:{" "}
        <span className={sumOfBudget >= 0 ? "budgetPlus" : "budgetMinus"}>{sumOfBudget}$</span>
      </h2>
    </div>
  );
};
export default Budget;

Budget.propTypes = {
  sumOfBudget: PropTypes.number
};
