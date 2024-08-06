import CloseIcon from "@mui/icons-material/Close";
import TitleIcon from "@mui/icons-material/Title";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addReminderAsync } from "../store/features/folderSlice";
import { logoImg } from "../utils";
import InputField from "./InputField";

const AddReminderPage = () => {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateAndTimeTo, setDateAndTimeTo] = useState(null);

  const handleAddReminder = async event => {
    event.preventDefault();
    if (!title || !description || !dateAndTimeTo) {
      alert("Please enter title, description, date & time");
      return;
    }
    const formattedDateAndTime =
      dayjs(dateAndTimeTo).format("YYYY-MM-DD HH:mm");

    const timeDifference = dayjs(formattedDateAndTime).diff(
      dayjs(),
      "milliseconds"
    );

    if (timeDifference < 0) {
      alert("The selected time has already passed!");
      return;
    }

    const timeoutId = setTimeout(() => {
      new Notification("Alertify", {
        body: title,
        icon: logoImg
      });
    }, timeDifference);

    const newReminder = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      dateAndTimeTo: formattedDateAndTime,
      notificationId: timeoutId
    };

    dispatch(addReminderAsync({ folderId, reminder: newReminder }));
    navigate(`/folders/${folderId}`);
  };

  const handleClose = e => {
    e.stopPropagation();
    navigate(`/folders/${folderId}`);
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <form
      className="w-full h-[100vh] flex items-center justify-center screen-max-width flex-col gap-3 relative"
      onSubmit={handleAddReminder}
    >
      <button
        type="button"
        className="absolute right-[40vh] top-[20vh] flex items-center p-2 hover:scale-110 transition-all duration-200"
        onClick={handleClose}
      >
        <CloseIcon />
      </button>
      <InputField
        value={title}
        setValue={setTitle}
        placeholder={"Enter title here"}
        type="text"
        id="title"
      >
        <TitleIcon sx={{ color: "gray" }} />
      </InputField>

      <textarea
        className="h-52 w-[400px] border border-gray-300  mb-3 px-2 rounded text-gray-700 placeholder-gray-500 focus:outline-none text-lg mt-3 resize-none"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Enter description here"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={dateAndTimeTo}
          onChange={newDate => setDateAndTimeTo(newDate)}
          ampm={false}
          disablePast={true}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock
          }}
        />
      </LocalizationProvider>

      <button
        type="submit"
        className="w-[300px] h-[50px] items-center border border-gray-300 rounded-md text-xl  bg-sky-500 hover:bg-teal-400 transition-all text-white mt-3"
      >
        Add Reminder
      </button>
    </form>
  );
};

export default AddReminderPage;
