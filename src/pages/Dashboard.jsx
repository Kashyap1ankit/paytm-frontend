import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../auth";
import Loading from "../loading.json";
import Lottie from "lottie-react";
import Transfer from "../assets/svg/transfer.svg";
import Transaction from "../assets/svg/transaction.svg";
import UpdateProfile from "../assets/svg/update.svg";

export default function Dashboard() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [balance, setBalance] = useState(0);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const user = useAuth();

  useEffect(() => {
    if (user.loading) {
      setLoad(true);
    }

    if (!user.loading) {
      setLoad(false);
      if (user.loggedIn) {
        navigate("/dashboard");
      }
      if (!user.loggedIn) {
        navigate("/signin");
      }
    }
  }, [navigate, user.loggedIn, user.loading]);

  //Get the user balance

  useEffect(() => {
    const call = async () => {
      const result = await axios.get(`${BASE_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setBalance(result.data.balance);
    };

    call();
  }, []);

  //Handle User profile click

  const handleClick = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/api/v1/user/auth`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const firstName = await result.data.firstName;
      const lastName = await result.data.lastName;
      navigate(`/profile?firstName=${firstName}&lastName=${lastName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div>
        <NavBar />
      </div>

      {load ? (
        <Lottie
          className="xl:size-48 xsm:size-36 mx-auto mt-52"
          animationData={Loading}
          loop={true}
        />
      ) : (
        <div>
          {/* Balance section card  */}
          <motion.div
            animate={{
              scale: [1.2, 1],
            }}
            className="xsm:px-4 xsm:py-2 xsm:w-9/12 xsm:mx-auto md:mx-8 md:w-fit md:pr-24 md:py-6 xl:mx-0  bg-white rounded-md shadow-xl font-Liber mt-36"
          >
            <Title className={"xl:text-sm mb-2 text-gray"} title={"INR"} />
            <Title
              className={"xl:text-xl text-darkGray"}
              title={`Current Balance`}
            />
            <Title
              className={"xsm:text-2xl xl:text-3xl font-Mingzant mt-2"}
              title={`₹${balance} `}
            />
          </motion.div>

          {/* Features section  */}

          <Title
            className={
              "xsm:mb-8 xsm:text-2xl xsm:mx-4 xl:mx-0 xl:mb-0 xl:text-4xl   text-white font-Lexend mt-24 "
            }
            title={"SERVICES"}
          />

          <div className="xsm:grid xsm:grid-cols-2 xsm:gap-8 xsm:w-full xsm:mx-4 md:grid md:grid-cols-3 md:gap-8 xl:mx-0 lg:flex lg:justify-start mt-0 lg:w-2/3">
            <motion.div
              onClick={() => {
                navigate("/users");
              }}
              className="cursor-pointer xl:mr-16 xl:text-center "
              animate={{
                x: [-500, 0],
              }}
            >
              <img
                className="xsm:size-12 xl:size-20 xl:mt-20 border-2 rounded-full p-2 bg-white"
                src={Transfer}
                alt=""
              />
              <Title
                title={"Send Money"}
                className={"text-white xl:text-center xl:mt-4 font-Lexend"}
              />
            </motion.div>

            <motion.div
              onClick={() => {
                navigate("/transaction");
              }}
              className="cursor-pointer xl:mr-16"
              animate={{
                x: [500, 0],
              }}
            >
              <img
                className="xsm:size-12 xl:size-20 xl:mt-20 border-2 rounded-full p-2 bg-white"
                src={Transaction}
                alt=""
              />
              <Title
                title={"Transcations"}
                className={"text-white xl:text-center xl:mt-4 font-Lexend"}
              />
            </motion.div>

            <motion.div
              onClick={handleClick}
              className="cursor-pointer xl:mr-16"
              animate={{
                x: [500, 0],
              }}
            >
              <img
                className="xsm:size-12 xl:size-20 xl:mt-20 border-2 rounded-full p-2 bg-white"
                src={UpdateProfile}
                alt=""
              />
              <Title
                title={"Profile"}
                className={"text-white xl:text-center xl:mt-4 font-Lexend"}
              />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
