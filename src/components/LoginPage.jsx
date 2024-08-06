import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../store/features/authSlice";
import InputField from "./InputField";
import Navbar from "./Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = async e => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      await dispatch(signInUser(email, password));
      navigate("/folders");
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  const handleNavigateRegister = e => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={signIn}
        className="w-full h-[80vh] flex items-center justify-center screen-max-width flex-col gap-5"
      >
        <InputField
          value={email}
          setValue={setEmail}
          placeholder={"Enter mail here"}
          type="mail"
          id="mail"
        >
          <PersonIcon sx={{ color: "gray" }} />
        </InputField>
        <InputField
          value={password}
          setValue={setPassword}
          placeholder={"Enter password here"}
          type="password"
          id="pass"
        >
          <LockIcon sx={{ color: "gray" }} />
        </InputField>
        <button className="w-[300px] h-[50px] items-center border border-gray-300 rounded-md text-xl bg-sky-500 hover:bg-teal-400 transition-all text-white">
          Sign In
        </button>
        <div
          className="text-sky-500 hover:text-teal-400 transition-all text-lg cursor-pointer"
          onClick={handleNavigateRegister}
        >
          Don't have an account? Create one.
        </div>
      </form>
    </>
  );
};

export default LoginPage;
