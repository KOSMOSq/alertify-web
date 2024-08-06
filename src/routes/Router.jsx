import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../components/AboutPage";
import AddFolderPage from "../components/AddFolderPage";
import AddReminderPage from "../components/AddReminderPage";
import EditFolderPage from "../components/EditFolderPage";
import EditReminderPage from "../components/EditReminderPage";
import FoldersDetailedPage from "../components/FoldersDetailedPage";
import FoldersPage from "../components/FoldersPage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },
  {
    path: "/folders",
    element: <FoldersPage />
  },
  {
    path: "/folders/:id",
    element: <FoldersDetailedPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/addFolder",
    element: <AddFolderPage />
  },
  {
    path: "/editFolder/:id",
    element: <EditFolderPage />
  },
  {
    path: "/addReminder/:folderId",
    element: <AddReminderPage />
  },
  {
    path: "/editReminder/:folderId/:reminderId",
    element: <EditReminderPage />
  }
]);
