import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteReminderAsync,
  toggleReminderCompletedAsync
} from "../store/features/folderSlice";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";

const ReminderItem = ({ reminder, folderId, onDelete, edit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleToggleCompleted = async e => {
    e.stopPropagation();
    dispatch(
      toggleReminderCompletedAsync({
        folderId: folderId,
        reminderId: reminder.id
      })
    );
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className="border border-gray-300 rounded p-4 my-2 cursor-pointer w-[800px] shadow transition-shadow duration-300 hover:shadow-lg"
      onClick={toggleExpand}
    >
      <div className="flex items-center mb-2">
        <button onClick={handleToggleCompleted}>
          {reminder.completed ? (
            <CheckCircleIcon
              className="flex hover:scale-110"
              sx={{ color: "#2CCD0B", stroke: "#ffffff", strokeWidth: 0.5 }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              className="flex hover:scale-110"
              sx={{ color: "grey", stroke: "#ffffff", strokeWidth: 0.5 }}
            />
          )}
        </button>
        <h3 className="ml-2 flex-1 text-lg">{reminder.title}</h3>
        <div className="flex flex-row items-center">
          {edit ? (
            <div>
              <button
                onClick={() =>
                  navigate(`/editReminder/${folderId}/${reminder.id}`)
                }
                className="rounded hover:dark:text-teal-500 text-xl transition-all duration-150"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => {
                  onDelete(folderId, reminder.id);
                }}
                className="rounded hover:dark:text-red-500 text-xl transition-all duration-150"
              >
                <DeleteIcon />
              </button>
            </div>
          ) : (
            ""
          )}
          <p className="ml-2 text-gray-600 mb-2">{reminder.dateAndTimeTo}</p>
        </div>
      </div>
      {expanded && (
        <div className="ml-6 mb-2">
          <p className="text-gray-600">{reminder.description}</p>
        </div>
      )}
    </div>
  );
};

const FoldersDetailedList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const folder = useSelector(state =>
    state.folders.folders.find(folder => folder.id === id)
  );

  const handleDeleteReminder = (folderId, reminderId) => {
    dispatch(deleteReminderAsync({ folderId, reminderId }));
  };

  const handleEditReminder = reminderId => {
    navigate(`/editReminder/${id}/${reminderId}`);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReminders, setFilteredReminders] = useState(
    folder?.reminders || []
  );

  const handleChange = query => {
    setSearchQuery(query);

    if (folder) {
      const newFilteredReminders = folder.reminders.filter(
        reminder =>
          reminder.title.toLowerCase().includes(query.toLowerCase()) ||
          reminder.description.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredReminders(newFilteredReminders);
    }
  };

  const remindersList = searchQuery
    ? { ...folder, reminders: filteredReminders }
    : folder;

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
      <div className="w-full flex items-center justify-center gap-56 mt-3">
        <h2 className="folder-name text-3xl" style={{ color: folder?.color }}>
          {folder?.name}
        </h2>
        <div className="flex gap-5">
          <button
            className="items-center py-1 rounded text-white bg-sky-500 hover:bg-teal-400 transition-al w-[70px] flex gap-1 justify-center"
            onClick={() => {
              navigate(`/addReminder/${id}`);
            }}
          >
            Add
            <AddCircleOutlineIcon />
          </button>
          <button
            className="items-center py-1 rounded text-white bg-sky-500 hover:bg-teal-400 transition-all w-[70px] inline-flex justify-center gap-1"
            onClick={() => {
              setEdit(prev => !prev);
            }}
          >
            Edit
            <EditIcon />
          </button>
        </div>
      </div>

      {remindersList &&
      remindersList.reminders &&
      remindersList.reminders.length > 0 ? (
        <div className="grid pb-4 pt-4 pl-4 overflow-y-auto max-h-[556px] w-[840px] rounded-xl">
          {remindersList.reminders.map(item => (
            <ReminderItem
              key={item.id}
              reminder={item}
              folderId={folder.id}
              onDelete={handleDeleteReminder}
              onEdit={handleEditReminder}
              edit={edit}
            />
          ))}
        </div>
      ) : (
        <p className="text-2xl flex h-[556px] text-center items-center justify-center">
          No reminders found.
        </p>
      )}
    </div>
  );
};

export default FoldersDetailedList;
