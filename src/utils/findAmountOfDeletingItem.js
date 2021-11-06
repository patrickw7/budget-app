const findAmountOfDeletingItem = (id, typeOfItemList) => {
    const newSum = typeOfItemList.find((item) => item.id === id);
    return newSum.amount;
  };
  export default findAmountOfDeletingItem;
