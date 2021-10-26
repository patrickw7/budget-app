import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };
  const handleClick = (e) => {
    setValue(e.target.value);
  };

  return [value, handleClick, reset];
};
export default useInput;
