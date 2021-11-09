import { v4 as uuidv4 } from 'uuid';

const addNewItem = (data) => {
    const { budgetItemType, name, amount, category } = data;
    const itemID = uuidv4();
    const amountValue = budgetItemType === 'income' ? amount : -amount;
    const newItem = {
      id: itemID,
      type: budgetItemType,
      name: name,
      amount: amountValue,
      category: category,
    };
    return newItem;
  };

export default addNewItem;