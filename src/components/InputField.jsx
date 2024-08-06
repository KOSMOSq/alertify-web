import React from "react";

const InputField = ({ value, setValue, placeholder, type, id, children }) => {
  const handleChange = e => {
    setValue(e.target.value);
  };
  return (
    <div className="flex w-[300px] h-[50px] items-center border border-gray-300 rounded-md overflow-hidden bg-white">
      <label
        className="flex items-center justify-center p-3 border-r border-gray-300"
        htmlFor={id}
      >
        {children}
      </label>
      <input
        className="flex-1 p-2 text-gray-700 placeholder-gray-500 focus:outline-none text-lg"
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
