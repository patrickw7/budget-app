const handleSnackBar = (setIsOpen) => {
  const time = 1500;
  setIsOpen(true);
  const snackBarTimeOutIndex = setTimeout(() => setIsOpen(false), time);
  return snackBarTimeOutIndex;
};
export default handleSnackBar;
