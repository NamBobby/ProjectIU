import React, { useState } from "react";

const NumberInput = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event) => {
    setValue(parseInt(event.target.value));
  };

  return (
    <input
      type="number"
      value={value}
      min={1}
      onChange={handleChange}
    />
  );
};

export default NumberInput;