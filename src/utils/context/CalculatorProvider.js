import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

import { incomesListArray } from "../../mockedData/incomesListArray";
import { expensesListArray } from "../../mockedData/expensesListArray";
import { calculateBudget } from "..";

export const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [income, setIncome] = useState(incomesListArray);
  const [expense, setExpenses] = useState(expensesListArray);
  const [sumOfBudget, setSumOfBudget] = useState(calculateBudget(income, expense));
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CalculatorContext.Provider
      value={{
        income,
        setIncome,
        expense,
        setExpenses,
        sumOfBudget,
        setSumOfBudget,
        isOpen,
        setIsOpen
      }}>
      {children}
    </CalculatorContext.Provider>
  );
};

CalculatorProvider.propTypes = {
  children: PropTypes.any
};
