import { useState } from "react";

const useField = (type, placeholder) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const style = { marginBottom: 10 };

  const size = "small";

  return [
    {
      style,
      size,
      placeholder,
      type,
      value,
      onChange,
    },
    setValue,
  ];
};

export default useField;
