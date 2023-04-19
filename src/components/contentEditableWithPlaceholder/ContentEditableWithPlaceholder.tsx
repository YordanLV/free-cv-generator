import React, { useState } from "react";

interface BorderlessInputProps {
  placeholder: string;
  onChange?: (value: string) => void;
  className: any;
}

const BorderlessInput: React.FC<BorderlessInputProps> = ({
  placeholder,
  onChange,
  className,
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
      className={className}
    />
  );
};

export default BorderlessInput;
