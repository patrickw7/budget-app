import React from "react";

import './IncomesList.scss'
import IncomesItem from "../IncomesItem";

const IncomesList = ({ income, handleDeleteIncome }) => {
  return (
    <div className="incomesList">
      <h2>Incomes</h2>
      <div className="incomesContainer">
      {income.map((item, i) => {
        return (
          <IncomesItem
            key={i}
            income={item}
            handleDeleteIncome={handleDeleteIncome}
          />
        );
      })}
      </div>
    </div>
  );
};

export default IncomesList;