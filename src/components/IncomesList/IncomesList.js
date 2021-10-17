import React from "react";

import IncomesItem from "../IncomesItem";

const IncomesList = ({ income, handleDeleteIncome }) => {
  return (
    <div className="firstList">
      <h2>Przychody</h2>
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
  );
};

export default IncomesList;