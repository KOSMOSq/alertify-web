import CloseIcon from "@mui/icons-material/Close";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ColorPalettePicker from "../shared/ColorPalettePicker";
import { editFolderAsync } from "../store/features/folderSlice";
import InputField from "./InputField";

const EditFolderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const folders = useSelector(state => state.folders.folders);
  const selectedFolder = folders.find(folder => folder.id === id);

  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FF463A");

  useEffect(() => {
    if (selectedFolder && !folderName) {
      setFolderName(selectedFolder.name);
      setSelectedColor(selectedFolder.color);
    }
  }, [selectedFolder, folderName]);

  const handleEditFolder = () => {
    if (!folderName || !selectedColor) {
      alert("Please enter folder name and color");
      return;
    }
    const newFolder = {
      name: folderName,
      color: selectedColor,
      reminderCount: selectedFolder.reminderCount
    };

    dispatch(
      editFolderAsync({
        folderId: selectedFolder.id,
        updatedFolder: newFolder
      })
    );

    navigate("/folders");
  };

  const handleClose = e => {
    e.stopPropagation();
    navigate("/folders");
  };

  return (
    <form
      className="w-full h-[100vh] flex items-center justify-center screen-max-width flex-col gap-3 relative"
      onSubmit={handleEditFolder}
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
        placeholder={"Enter new folder name here"}
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
        Edit Folder
      </button>
    </form>
  );
};

export default EditFolderPage;
