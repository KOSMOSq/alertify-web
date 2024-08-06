import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";

const ColorPalettePicker = ({ onSelectColor, initialColor }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);

  useEffect(() => {
    if (initialColor) {
      setSelectedColor(initialColor);
      onSelectColor(initialColor);
    }
  }, [initialColor, onSelectColor]);

  return (
    <>
      <label className="text-xl pt-2">Choose Color</label>
      <div className="flex flex-wrap justify-center w-[350px]">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-10 h-10 m-2 rounded-full hover:scale-105 hover:shadow-lg cursor-pointer transition-all duration-300 ${
              selectedColor === color ? "border-2 border-gray-600" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => {
              setSelectedColor(color);
              onSelectColor(color);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ColorPalettePicker;
