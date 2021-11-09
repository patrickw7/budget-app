const findItemToDelete = (id, typeOfItemList) => {
    const newIncomeArr = typeOfItemList.filter((item) => item.id !== id);
    return newIncomeArr;
  };
export default findItemToDelete;
