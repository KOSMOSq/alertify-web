import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { navLists } from "../constants";
import { clearUser } from "../store/features/authSlice";
import { clearFolders } from "../store/features/folderSlice";
import { logoImg } from "../utils";

const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToAbout = () => {
    navigate("/about");
  };

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      dispatch(clearUser());
      dispatch(clearFolders());
      navigate("/about");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex items-center">
      <nav className="flex w-full items-center justify-between screen-max-width">
        <div className="flex items-center">
          <img
            src={logoImg}
            alt="Alertify"
            className="cursor-pointer hover:scale-105 transition-all"
            width={50}
            onClick={handleNavigateToAbout}
          />
          <div
            className="cursor-pointer text-sky-500  hover:text-sky-500 hover:scale-105 transition-all text-3xl ml-3 px-3"
            onClick={handleNavigateToAbout}
          >
            Alertify
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          {navLists.map((item, index) => (
            <div
              key={index}
              className="px-5 text-xl cursor-pointer hover:text-sky-500 hover:scale-105 transition-all"
              onClick={() => {
                item.toLowerCase() === "folders"
                  ? user != null
                    ? navigate(`/${item.toLowerCase()}`)
                    : navigate("/login")
                  : navigate(`/${item.toLowerCase()}`);
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          {user && user.uid ? (
            <div className="flex items-center">
              <span className="mr-4 text-xl">{user.email}</span>
              <button
                onClick={handleLogout}
                className="items-center px-3 py-2 bg-red-500 text-white rounded text-xl  hover:bg-red-600 transition-all"
              >
                Log Out
                <LogoutIcon className="ml-2" />
              </button>
            </div>
          ) : (
            <button
              className="items-center px-3 py-2 rounded text-white  text-xl bg-sky-500 hover:bg-teal-400 transition-all"
              onClick={() => navigate("/login")}
            >
              Sign In
              <LoginIcon className="ml-2" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
