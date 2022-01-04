import React from "react";
import PropTypes from "prop-types";

import "./IncomesList.scss";
import IncomesItem from "../IncomesItem";

const IncomesList = ({ income, handleDeleteListItem }) => {
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
