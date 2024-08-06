import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../store/features/authSlice";
import InputField from "./InputField";
import Navbar from "./Navbar";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(state => state.auth.loading);

  const signUp = () => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Please enter email, password, and confirm password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    dispatch(signUpUser(email, password));
  };

  const handleNavigateLogin = e => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <form
        onSubmit={signUp}
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
        <InputField
          value={confirmPassword}
          setValue={setConfirmPassword}
          placeholder={"Confirm password"}
          type="password"
          id="confPass"
        >
          <EnhancedEncryptionIcon sx={{ color: "gray" }} />
        </InputField>
        <button className="w-[300px] h-[50px] items-center border border-gray-300 rounded-md text-xl  bg-sky-500 hover:bg-teal-400 transition-all text-white">
          Sign Up
        </button>
        <div
          className="text-sky-500 hover:text-teal-400 transition-all text-lg cursor-pointer"
          onClick={handleNavigateLogin}
        >
          Have an account? Sign In.
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
