import React from "react";

const IncomeItem = ({ income, handleDeleteIncome }) => {
  const { id, name, amount, category } = income;

  return (
    <React.Fragment>
      <div className="card" key={id}>
        <h3>{name}</h3>
        <span>{amount}$</span>
        <span>{category}</span>
        <button onClick={() => handleDeleteIncome(id)}>delete</button>
      </div>
    </React.Fragment>
  );
};

export default IncomeItem;