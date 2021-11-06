const initialBudgetValue = (income, expense) => {
  const incomesAmount = income.reduce(
    (incomeValue, { amount }) => incomeValue + amount,
    0
  );
  const expensesAmount = expense.reduce(
    (expenseValue, { amount }) => expenseValue + amount,
    0
  );
  return incomesAmount + expensesAmount;
};
export default initialBudgetValue;
