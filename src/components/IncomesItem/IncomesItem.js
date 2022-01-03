import React from 'react';
import PropTypes from 'prop-types';

import './IncomesItem.scss';

const IncomesItem = ({ income, handleDeleteListItem }) => {
  const { id, name, amount, type, category } = income;
  const handleDeleteItem = () => handleDeleteListItem(id, type);

  return (
    <div className="incomesItem" key={id}>
      <h3>{name}</h3>
      <span>{amount}$</span>
      <span>Category: {category}</span>
      <button onClick={handleDeleteItem}>Delete</button>
    </div>
  );
};
export default IncomesItem;

IncomesItem.propTypes = {
  income: PropTypes.object,
  handleDeleteListItem: PropTypes.func
};
