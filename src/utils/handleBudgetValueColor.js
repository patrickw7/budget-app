import { budgetStateColor } from './constants';

const handleBudgetValueColor = (sumOfBudget, budgetRef) => {
  if (sumOfBudget > 0) {
    budgetRef.current.style.color = budgetStateColor.plus;
  } else if (sumOfBudget < 0) {
    budgetRef.current.style.color = budgetStateColor.minus;
  } else {
    budgetRef.current.style.color = budgetStateColor.neutral;
  }
};
export default handleBudgetValueColor;
