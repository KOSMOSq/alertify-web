import CloseIcon from "@mui/icons-material/Close";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ColorPalettePicker from "../shared/ColorPalettePicker";
import { createFolderAsync } from "../store/features/folderSlice";
import InputField from "./InputField";

const AddFolderPage = () => {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FF463A");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddFolder = e => {
    e.preventDefault();
    if (!folderName || !selectedColor) {
      alert("Please enter folder name and color");
      return;
    }

    const newFolder = {
      name: folderName,
      color: selectedColor,
      reminderCount: 0,
      reminders: []
    };

    try {
      dispatch(createFolderAsync(newFolder));
    } catch (error) {
      console.log(error);
    }

    navigate("/folders");
  };

  const handleClose = e => {
    e.stopPropagation();
    navigate("/folders");
  };

  return (
    <form
      className="w-full h-[100vh] flex items-center justify-center screen-max-width flex-col gap-3 relative"
      onSubmit={handleAddFolder}
    >
      <button
        className="absolute right-[44vh] top-[27vh] flex items-center p-2 hover:scale-110 transition-all duration-200"
        onClick={handleClose}
      >
        <CloseIcon />
      </button>
      <InputField
        value={folderName}
        setValue={setFolderName}
        placeholder={"Enter folder name here"}
        type="text"
        id="name"
      >
        <CreateNewFolderIcon sx={{ color: "gray" }} />
      </InputField>
      <ColorPalettePicker
        onSelectColor={color => setSelectedColor(color)}
        initialColor={selectedColor}
      />
      <button className="w-[300px] h-[50px] items-center border border-gray-300 rounded-md text-xl  bg-sky-500 hover:bg-teal-400 transition-all text-white">
        Add Folder
      </button>
    </form>
  );
};

export default AddFolderPage;
