import React, { useState } from "react";

interface BorderlessInputProps {
  placeholder: string;
  onChange?: (value: string) => void;
  inputStyle: Object;
}

const BorderlessInput: React.FC<BorderlessInputProps> = ({
  placeholder,
  onChange,
  inputStyle,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      style={inputStyle}
    />
  );
};

export default BorderlessInput;
