import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFolderAsync } from "../store/features/folderSlice";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";

const FakeImage = ({ name, backgroundColor }) => {
  const icon = name.charAt(0).toUpperCase();

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4`}
      style={{ backgroundColor }}
    >
      <span className="text-white text-xl">{icon}</span>
    </div>
  );
};

const FolderItem = ({ item, onDelete, onPress, edit }) => {
  const navigate = useNavigate();
  const { name, color, reminderCount, id } = item;

  const handleEdit = e => {
    e.stopPropagation();
    navigate(`/editFolder/${id}`);
  };

  const handleDelete = e => {
    e.stopPropagation();
    onDelete(e, id);
  };

  return (
    <div
      className="flex items-center p-4 bg-white rounded-lg cursor-pointer w-[250px] shadow transition-shadow duration-300 hover:shadow-lg"
      onClick={() => onPress(item.id)}
    >
      <FakeImage name={name} backgroundColor={color.toLowerCase()} />
      <div className="flex flex-col flex-1">
        <p className="text-lg font-bold">{name}</p>
        <div className="flex mt-2">
          <div className="flex items-center">
            <DescriptionOutlinedIcon
              sx={{ color: "black", stroke: "#ffffff", strokeWidth: 0.5 }}
            />
            <span className="reminder-count">{reminderCount}</span>
          </div>
          {edit ? (
            <div className="flex ml-[70px] items-center">
              <button
                onClick={handleEdit}
                className="rounded hover:dark:text-teal-500 text-xl transition-all duration-150"
              >
                <EditIcon />
              </button>
              <button
                className="rounded hover:dark:text-red-500 text-xl transition-all duration-150"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

const FoldersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const foldersData = useSelector(state => state.folders.folders);

  const handleFolderPress = id => {
    navigate(`/folders/${id}`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteFolderAsync(id));
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFolders, setFilteredFolders] = useState(foldersData);

  const handleChange = query => {
    setSearchQuery(query);

    const newFilteredFolders = foldersData.filter(folder =>
      folder.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredFolders(newFilteredFolders);
  };

  const data = searchQuery ? filteredFolders : foldersData;

  return (
    <div className="flex w-full items-center justify-between screen-max-width flex-col mt-[40px]">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
          <SearchIcon />
        </span>
        <input
          className="placeholder:text-slate-400 block bg-white w-[30rem] mb-2 py-2 pl-9 pr-3 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 border border-gray-300 rounded-md"
          placeholder="Search for something..."
          type="text"
          value={searchQuery}
          onChange={e => handleChange(e.target.value)}
        />
      </label>
      <div className="flex gap-5 mt-5">
        <button
          className="items-center py-1 rounded text-white bg-sky-500 hover:bg-teal-400 transition-al w-[70px]"
          onClick={() => {
            navigate("/addFolder");
          }}
        >
          Add <AddCircleOutlineIcon />
        </button>
        <button
          className="items-center py-1 rounded text-white bg-sky-500 hover:bg-teal-400 transition-all w-[70px] inline-flex justify-center gap-1"
          onClick={() => {
            setEdit(prev => !prev);
          }}
        >
          Edit <EditIcon />
        </button>
      </div>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 pb-4 pt-4 mt-4 pl-4 overflow-y-auto max-h-[556px] w-[840px] rounded-xl">
          {data.map(item => (
            <FolderItem
              edit={edit}
              key={item.id}
              item={item}
              onPress={handleFolderPress}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-2xl flex h-[556px] text-center items-center justify-center">
          No folders found.
        </div>
      )}
    </div>
  );
};

export default FoldersList;
