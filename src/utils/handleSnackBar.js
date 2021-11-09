const handleSnackBar = (setIsOpen) => {
    const time = 1500;
    setIsOpen(true);
    setTimeout(() => setIsOpen(false),time);
  };
  export default handleSnackBar;