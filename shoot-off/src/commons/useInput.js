import { useState } from "react";

const useInput = (defaultValue) => {
  const [state, setState] = useState(defaultValue);

  const handleChange = (event) => {
    setState(event.target.value);
  };
  return {
    state,
    onChange: handleChange,
  };
};

export default useInput;
