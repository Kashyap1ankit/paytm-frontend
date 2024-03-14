import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import HomeImage from "../assets/images/home.png";
import Button from "../components/Button";
import NavBar from "../components/Navbar";
import { motion } from "framer-motion";
import { useAuth } from "../auth";

export default function Index() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <NavBar />
      <div className="xsm:block xsm:mt-36 md:flex md:justify-around lg:flex lg:justify-around md:flex-wrap md:flex-row-reverse md:mt-20 lg:flex-row-reverse xl:mt-4 xl:justify-between  ">
        <motion.div
          animate={{
            y: [-100, 0],
          }}
          transition={{
            duration: 0.5,
          }}
          className="right-side md:w-1/3 md:mt-20 xl:mt-28 xl:mr-12 drop-shadow-5xl"
        >
          <img
            className="xsm:size-48 mx-auto  md:size-56 lg:size-72 xl:size-96 "
            src={HomeImage}
            alt=""
          />
        </motion.div>

        <div className="left-side xsm:mt-8 xsm:ml-4 xsm:text-center md:text-left xl:mt-36 md:mt-32">
          <motion.div
            animate={{
              x: [-100, 0],
            }}
          >
            <Title
              className="text-white font-Noto xsm:text-2xl md:text-3xl  lg:text-4xl xl:text-5xl xl:mb-4  tracking-wide font-extrabold drop-shadow-2xl"
              title={"Paytm"}
            />
          </motion.div>
          <motion.div
            animate={{
              x: [100, 0],
            }}
          >
            <Title
              className="text-white font-Noto xsm:text-2xl md:text-3xl  lg:text-4xl xl:text-5xl xl:mb-4  tracking-wide font-extrabold drop-shadow-2xl"
              title={"India's Most Trusted"}
            />
          </motion.div>
          <motion.div
            animate={{
              x: [-100, 0],
            }}
          >
            {" "}
            <Title
              className="text-white font-Noto xsm:text-2xl md:text-3xl  lg:text-4xl xl:text-5xl xl:mb-4  tracking-wide font-extrabold drop-shadow-2xl"
              title={"Payments App"}
            />
          </motion.div>
        </div>
      </div>
      <Button
        className="bg-button text-center text-white rounded-md cursor-pointer font-Inter mx-auto xsm:max-w-fit xsm:px-4 xsm:py-1 xsm:mt-12 xl:px-6 xl:py-2 xl:mx-0 md:mx-12 xl:mt-0 "
        onClick={handleClick}
        title={"Get Started"}
      />
    </div>
  );
}
