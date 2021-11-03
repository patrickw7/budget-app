import React from 'react';
import PropTypes from 'prop-types';

import './IncomesList.scss';
import IncomesItem from '../IncomesItem';

const IncomesList = ({ income, handleDeleteIncomeItem }) => {
  return (
    <div className='incomesList'>
      <h2>Incomes</h2>
      <div className='incomesContainer'>
        {income.map((item, i) => {
          return (
            <IncomesItem
              key={`inc-${i}`}
              income={item}
              handleDeleteIncomeItem={handleDeleteIncomeItem}
            />
          );
        })}
      </div>
    </div>
  );
};

IncomesList.propTypes = {
  income: PropTypes.array,
  handleDeleteIncome: PropTypes.func,
};

export default IncomesList;
