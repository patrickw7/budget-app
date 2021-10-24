import React from "react";

import './IncomesItem.scss'

const IncomesItem = ({ income, handleDeleteIncome }) => {
  const { id, name, amount, category } = income;

  return (
    <React.Fragment>
      <div className="incomesItem" key={id}>
        <h3>{name}</h3>
        <span>{amount}$</span>
        <span>Category: {category}</span>
        <button onClick={() => handleDeleteIncome(id)}>delete</button></div>
    </React.Fragment>
  );
};

export default IncomesItem;