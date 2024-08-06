import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { about1Img, about2Img, about3Img, logoImg } from "../utils";
import Navbar from "./Navbar";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleNavigateToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="relative">
        <div className="absolute top-[-20px] left-[500px] w-[600px] h-[600px] bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob"></div>
        <div className="absolute top-[140px] left-[850px] w-[650px] h-[650px] bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay"></div>
      </div>
      <Navbar />
      <div className="flex w-full items-center justify-between screen-max-width flex-col">
        <div className="relative flex items-center flex-col gap-8 mt-[30px] mb-[30px]">
          <img
            src={logoImg}
            alt="logo-img"
            width={400}
            className="cursor-pointer hover:scale-105 transition-all duration-500 z-10"
          />
          <div className="text-2xl semi-bold w-[800px] text-center bg-opacity-80 bg-gradient-to-r from-white via-gray-100 to-white rounded-lg shadow-lg ">
            <div className="inline text-3xl font-semibold text-[#497EEF]">
              Alertify
            </div>{" "}
            - an integrated application platform that has goals to{" "}
            <div className="inline font-semibold text-[#497EEF]">
              help people
            </div>{" "}
            who would like to be more{" "}
            <div className="inline font-semibold text-[#497EEF]">
              productive
            </div>{" "}
            and have more free time or just to be{" "}
            <div className="inline font-semibold text-[#497EEF]">
              {" "}
              less forgetful
            </div>
            .
          </div>
          <button
            className="px-10 py-5 rounded-full text-white text-4xl bg-sky-500 hover:bg-teal-400 transition-all"
            onClick={handleNavigateToRegister}
          >
            Join us!
          </button>
          <div className="text-2xl">
            What we offer to our{" "}
            <p className="inline font-semibold text-[#497EEF]">users</p>?
          </div>
          <div className="animate-bounce">
            <KeyboardDoubleArrowDownIcon
              sx={{ color: "#497EEF", fontSize: "3rem" }}
            />
          </div>
        </div>
        <div className="flex flex-row relative h-[80vh] mt-[10vh]">
          <img src={about1Img} alt="about_img1" className="absolute" />
          <div className="flex flex-col gap-5 ml-[450px] mt-[170px] text-center">
            <h1 className="text-4xl font-semibold text-[#497EEF] uppercase">
              Add reminders
            </h1>
            <div className="w-[500px] text-xl">
              Create optimized folders and fill them with reminders so you don't
              forget about important things.
            </div>
          </div>
        </div>
        <div className="relative mt-[25px]">
          <div className="absolute bg-sky-200 w-[1920px] h-[850px] left-[-970px] top-[-55px] "></div>
        </div>
        <div className=" h-[100vh] relative flex flex-col gap-5">
          <h1 className="text-4xl font-semibold text-[#497EEF] uppercase text-center">
            Follow reminders
          </h1>
          <div className="text-xl text-center">
            Make notes, add date and time, description and we will remind you of
            them.
          </div>
          <img src={about2Img} alt="about_img2" className="pl-[100px]" />
        </div>
        <div className="flex flex-row relative h-[60vh]">
          <div className="flex flex-col gap-5 mr-[450px] mt-[170px] text-center">
            <h1 className="text-4xl font-semibold text-[#497EEF] uppercase">
              Be productive
            </h1>
            <div className="w-[500px] text-xl">
              Divide your time correctly and be more productive with Alertify.
            </div>
          </div>
          <img src={about3Img} alt="about_img3" className="absolute" />
        </div>
        <footer className="bg-sky-200 w-[1900px] h-[250px] flex justify-center text-xl">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex flex-row mt-4 items-center gap-5">
              <div>
                <img src={logoImg} alt="logo" width={70} />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="uppercase">Contact</div>
                <div>
                  <LinkedInIcon fontSize="large" />
                  <GitHubIcon fontSize="large" />
                  <TelegramIcon fontSize="large" />
                  <InstagramIcon fontSize="large" />
                </div>
                maksym.lavrovskyi@gmail.com
              </div>
            </div>
            <div>
              <Divider
                variant="middle"
                sx={{
                  marginBottom: "10px",
                  width: "250px",
                  borderBottomWidth: 2,
                  borderColor: "black",
                  borderRadius: 400
                }}
              />
              ©2024 Alertify, All right reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;
