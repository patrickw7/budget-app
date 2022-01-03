import { v4 as uuidv4 } from 'uuid';

const addNewItem = ({ budgetItemType, name, amount, category }) => {
  const itemID = uuidv4();
  const amountValue = budgetItemType === 'income' ? amount : -amount;
  const newItem = {
    id: itemID,
    type: budgetItemType,
    name,
    amount: amountValue,
    category
  };
  return newItem;
};
export default addNewItem;
